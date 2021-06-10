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
                title: 'Name',
                dataIndex: 'label',
            },
            {
                title: 'Value',
                dataIndex: 'value',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) =>
                    this.state.treeData.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            treeData: []
        };
    }

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
            console.log('接收数据key', data)
            const tempData = tableData.filter(list => {
                return list.key === data.key
            })
            const newTableData = [tempData[0], ...this.state.treeData]
            console.log(newTableData, tempData)
            this.setState({treeData: newTableData});
        })
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

    handleDeleteAll = () => {

        const {selectedRowKeys, treeData} = this.state
        console.log(selectedRowKeys)
        const temp = this.bantchDelete(treeData,selectedRowKeys)
        this.setState({treeData:temp})
        const q=  temp.filter(item => {
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
