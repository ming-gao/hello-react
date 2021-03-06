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
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        for (let k = 0; k < 10; k++){
            tableData.push({
                key: `0-${i}-${j}-${k}`,
                label: `Edward King ${i} - ${j}`,
                value: i + j,
            });
        }
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
                        <Popconfirm title="确认删除?" okText="是" cancelText="否"
                                    onConfirm={() => this.handleDelete(record.key)}>
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

    componentDidMount() {
        //消息订阅,添加数据到表格
        PubSub.subscribe('checkData', (_, data) => {
            console.log('接收key', data)
            const tempData = tableData.filter(list => {
                return list.key === data.key
            })
            let treeData = [...this.state.treeData]
            treeData.push(tempData[0])
            this.setState({treeData: treeData});
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
    bantchDelete(taskList, deleteTaskIds) {
        for (let i = 0; i < taskList.length;) {
            let task = taskList[i];
            //根据key删除
            if (deleteTaskIds.indexOf(task.key) !== -1) {
                taskList.splice(i, 1);
                continue;
            }
            i++;
        }
        return taskList
    };

    // 删除单个
    handleDelete = (key) => {
        console.log(key)
        PubSub.publish('deleteByKey', key)
        const {treeData} = this.state;
        this.setState({
            treeData: treeData.filter((item) => item.key !== key),
        });
    };
    //删除多选
    handleDeleteAll = async () => {
        const {selectedRowKeys} = this.state
        let treeData = [...this.state.treeData]
        await this.setState(() => {
            return {treeData: this.bantchDelete(treeData, selectedRowKeys)}
        })
        let selectedKeys = treeData.map(item => {
            return item.key;
        })
        // console.log(selectedKeys)
        PubSub.publish('deleteByRowKeys', selectedKeys)
        this.setState({selectedRowKeys: []})
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
                    <Button type="dashed" danger onClick={this.handleDeleteAll} disabled={!hasSelected}
                            loading={loading}>
                        删除
                    </Button>
                    <span style={{marginLeft: 8}}>
                        {hasSelected ? `选择了 ${selectedRowKeys.length} 项` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={this.columns} showLine={true} dataSource={treeData}/>
            </div>
        );
    }
}
