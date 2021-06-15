import React, {Component} from 'react';
import {Tree} from 'antd';
import {CloseOutlined, CheckOutlined, EditOutlined, PlusOutlined, MinusOutlined} from '@ant-design/icons'
import styles from './index.css';
import PubSub from "pubsub-js";
const {TreeNode} = Tree;

class EditableTree extends Component {

    data = [
        {
            value: 'Root',
            defaultValue: 'Root',
            key: '0-1',
            parentKey: '0',
            isEditable: false
        }
    ];
    expandedKeys = [];

    state = {
        expandedKeys: [],
        data: this.data
    };

    componentDidMount() {
        this.onExpand([]); // 手动触发
    }

    onCheck = (checkedKeysValue, event) => {
        console.log('onCheck', checkedKeysValue);
        this.setState({checkedKeys: checkedKeysValue.checked})
        if (event.checked){
            PubSub.publish('checkData',event.node)
        } else {
            PubSub.publish('cancelCheckData',event.node)
        }
    }
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys})
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.isEditable) {
            item.title = (
                <div>
                    <input
                        className={styles.inputField}
                        value={item.value}
                        onChange={(e) => this.onChange(e, item.key)}/>
                    <CloseOutlined style={{marginLeft: 10}} onClick={() => this.onClose(item.key, item.defaultValue)}/>
                    <CheckOutlined style={{marginLeft: 10}} onClick={() => this.onSave(item.key)}/>
                </div>
            );
        } else {
            item.title = (
                <div className={styles.titleContainer}>
                    <span>
                        {item.value}
                    </span>
                    <span className={styles.operationField}>
                        <EditOutlined style={{marginLeft: 10}} onClick={() => this.onEdit(item.key)}/>
                        <PlusOutlined style={{marginLeft: 10}} onClick={() => this.onAdd(item.key)}/>
                        {item.parentKey === '0' ? null : (
                            <MinusOutlined style={{marginLeft: 10}} onClick={() => this.onDelete(item.key)}/>)}
                    </span>
                </div>
            )
        }

        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }

        return <TreeNode {...item} />;
    })


    onAdd = (e) => {
        console.log('add');
        // 防止expandedKeys重复
        if (this.state.expandedKeys.indexOf(e) === -1) {
            this.expandedKeys.push(e);
        }
        this.addNode(e, this.data);
        console.log('data中的数据',this.data)
        this.setState({
            expandedKeys: this.expandedKeys,
            data: this.data
        });
    }
    setKeyValue(key,data) {
        console.log(key,data)
        if (data){
            let number = data.charAt(data.length-1)
            return ++number
        }else{
            return 1
        }

    }
    addNode = (key, data) => data.map((item) => {
        console.log('点击的节点key值：'+key,'data中的key值：'+item.key)
        if (item.key === key) {  //在当前选中节点下继续添加子节点，而不是根节点
            console.log('key值相等，可以在当前选中的节点下添加子节点-->')
            if (item.children) {  //有子节点时直接push进children里
                console.log('有子节点时添加-->')
                item.children.push({
                        value: 'default',
                        defaultValue: 'default',
                        key: `${key}-${this.setKeyValue(key,item.children[item.children.length - 1].key)}`,
                        parentKey: key,
                        isEditable: false
                    });
            } else {
                console.log('无子节点时添加-->')
                item.children = [];  //创建一个子节点数组
                item.children.push({
                        value: 'default',
                        defaultValue: 'default',
                        key: `${key}-${this.setKeyValue(key)}`,
                        parentKey: key,
                        isEditable: false
                    });
            }
            return;
        }
        if (item.children) {
            console.log('key值不相等，需要切换到正确的节点上再进行添加-->',key)
            this.addNode(key, item.children)
        }
    })

    onDelete = (key) => {
        console.log('delete');
        this.deleteNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    deleteNode = (key, data) => data.map((item, index) => {
        if (item.key === key) {
            data.splice(index, 1);
            return;
        } else {
            if (item.children) {
                this.deleteNode(key, item.children)
            }
        }
    })

    onEdit = (key) => {
        console.log('edit');
        this.editNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    editNode = (key, data) => data.map((item) => {
        if (item.key === key) {
            item.isEditable = true;
        } else {
            item.isEditable = false;
        }
        item.value = item.defaultValue;
        if (item.children) {
            this.editNode(key, item.children)
        }
    })

    onClose = (key, defaultValue) => {
        console.log('close');
        this.closeNode(key, defaultValue, this.data);
        this.setState({
            data: this.data
        });
    }

    closeNode = (key, defaultValue, data) => data.map((item) => {
        item.isEditable = false;
        if (item.key === key) {
            item.value = defaultValue;
        }
        if (item.children) {
            this.closeNode(key, defaultValue, item.children)
        }
    })

    onSave = (key) => {
        console.log('save')
        this.saveNode(key, this.data);
        this.setState({
            data: this.data
        });
    }

    saveNode = (key, data) => data.map((item) => {
        if (item.key === key) {
            item.defaultValue = item.value;
        }
        if (item.children) {
            this.saveNode(key, item.children)
        }
        item.isEditable = false;
    })

    onChange = (e, key) => {
        console.log('onchange')
        this.changeNode(key, e.target.value, this.data);
        this.setState({
            data: this.data
        });
    }

    changeNode = (key, value, data) => data.map((item) => {
        if (item.key === key) {
            item.value = value;
        }
        if (item.children) {
            this.changeNode(key, value, item.children)
        }
    })

    render() {
        return (
            <div>
                <Tree showLine expandedKeys={this.state.expandedKeys} checkStrictly={true} checkable onCheck={this.onCheck}
                      selectedKeys={[]} onExpand={this.onExpand}>
                    {this.renderTreeNodes(this.state.data)}
                </Tree>
            </div>
        )
    }
}

export default EditableTree;
