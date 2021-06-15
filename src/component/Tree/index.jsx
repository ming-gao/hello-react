import React, {Component } from 'react';
import PubSub from 'pubsub-js'
import { Tree } from 'antd';

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                isEditable: false
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                isEditable: false
            },
            {
                title: '0-0-2',
                key: '0-0-2',
                isEditable: false
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0',
                key: '0-1-0',
                isEditable: false
            },
            {
                title: '0-1-1',
                key: '0-1-1',
                isEditable: false
            },
            {
                title: '0-1-2',
                key: '0-1-2',
                isEditable: false
            },
        ],
    }
];

class Demo extends Component {
    state = {
        checkedKeys:[]
    }
    componentDidMount(){
        console.log('treeInfo',this.treeInfo)
        PubSub.subscribe('deleteByKey',(_,key) =>{
            const {checkedKeys} = this.state
            this.setState({
                checkedKeys: checkedKeys.filter((item) => item !== key),
            });
        })
        PubSub.subscribe('deleteByRowKeys',(_,keys)=>{
            console.log(keys)
            this.setState({checkedKeys:keys})
        })
    }

    render() {
        this.onCheck=(checkedKeysValue,event)=>{
            console.log('onCheck', checkedKeysValue);
            this.setState({checkedKeys: checkedKeysValue.checked})
            if (event.checked){
                PubSub.publish('checkData',event.node)
            } else {
                PubSub.publish('cancelCheckData',event.node)
            }
        }
        return (
            <Tree
                ref={c=>this.treeInfo=c}
                checkable
                showLine
                checkStrictly={true}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                treeData={treeData}
            >
            </Tree>
        );
    }
}

export default Demo

