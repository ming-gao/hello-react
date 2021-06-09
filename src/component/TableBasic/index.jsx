import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import {Table, Button,Space } from 'antd';
import 'antd/dist/antd.css'

const columns = [
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
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a onClick={(c)=>this.delete}>Delete</a>
            </Space>
        ),
    },
];

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
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        treeData: []
    };

    componentDidMount() {
        //消息订阅
        PubSub.subscribe('checkData', (_, data) => {
            console.log('接收数据key', data)

            // console.log(this.state.tableData.value)
            const newTableData = tableData.filter(list => {
                return list.key === data[data.length - 1]
            })
            this.setState({treeData: newTableData});
            console.log('过滤后', newTableData)
        })

    }

    componentWillUnmount() {
        PubSub.unsubscribe('checkData')
    }

    start = () => {
        this.setState({loading: true});
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
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
                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    <span style={{marginLeft: 8}}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={treeData}/>
            </div>
        );
    }
}
