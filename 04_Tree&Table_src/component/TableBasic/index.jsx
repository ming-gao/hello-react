import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import {Button, Popconfirm, Table} from 'antd';
import 'antd/dist/antd.css'


const tableData = [];
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        tableData.push({
            key: `0-${i}-${j}`,
            label: `Edward King ${i} - ${j}`,
            value: i + j,
        });
    }
}

export default class TableBasic extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '名称',
                dataIndex: 'label',
            },
            {
                title: '数值',
                dataIndex: 'value',
            },
            {
                title: '动作',
                key: 'action',
                render: (_, record) =>
                    this.state.treeData.length >= 1 ? (
                        <Popconfirm title="确认删除?" okText="是" cancelText="否" onConfirm={() => this.handleDelete(record.key)}>
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            selectedRowKeys: [],
            loading: false,
            treeData: []
        };
    }
    // 删除按钮功能
    handleDelete = (key) => {
        console.log(key)
        PubSub.publish('deleteByKey',key)
        const {treeData} = this.state;
        this.setState({
            treeData: treeData.filter((item) => item.key !== key),
        });
    };
    componentDidMount() {
        //消息订阅,添加数据到表格
        PubSub.subscribe('checkData', (_, data) => {
            console.log('接收key', data)
            const tempData = tableData.filter(list => {
                return list.key === data.key
            })
            const newTableData = [tempData[0], ...this.state.treeData]
            console.log(newTableData, tempData)
            this.setState({treeData: newTableData});
        })
        // 取消勾选的key值
        PubSub.subscribe('cancelCheckData', (_, data) => {
            console.log(data)
            const {treeData} = this.state
            const newTrees = treeData.filter(tree => {
                return tree.key !== data.key
            })
            this.setState({treeData: newTrees})
        })
    }

    componentWillUnmount() {
        // 解除订阅
        PubSub.unsubscribe('checkData')
    }
    //批量删除
    bantchDelete (taskList,deleteTaskIds){
        for (let i=0; i<taskList.length;){
            let task = taskList[i];
            //根据key删除
            if (deleteTaskIds.indexOf(task.key)!==-1) {
                taskList.splice(i,1);
                continue;
            }
            i++;
        }
        return taskList
    };
    //删除多选
    handleDeleteAll = () => {
        const {selectedRowKeys, treeData} = this.state
        console.log(selectedRowKeys)
        const temp = this.bantchDelete(treeData,selectedRowKeys)
        this.setState((prevState)=>{
            delete prevState.treeData
            return prevState
        })
        this.setState({treeData:temp})
        //拿出key传给Tree组件
        const q =  temp.filter(item => {
            return item.key
        })
        console.log(q)
        PubSub.publish('')
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    render() {
        const {loading, selectedRowKeys, treeData} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button type="dashed" danger onClick={this.handleDeleteAll} disabled={!hasSelected} loading={loading}>
                        删除
                    </Button>
                    <span style={{marginLeft: 8}}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={this.columns} dataSource={treeData}/>
            </div>
        );
    }
}
