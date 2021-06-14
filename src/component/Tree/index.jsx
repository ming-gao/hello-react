import React, {Component } from 'react';
import PubSub from 'pubsub-js'
import { Tree  } from 'antd';

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
            },
            {
                title: '0-0-1',
                key: '0-0-1',
            },
            {
                title: '0-0-2',
                key: '0-0-2',
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
            },
            {
                title: '0-1-1',
                key: '0-1-1',
            },
            {
                title: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

class Demo extends Component {
    state = {
        checkedKeys:[]
    }
    componentDidMount(){
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
                checkable
                checkStrictly={true}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                treeData={treeData}
            />
        );
    }
}

export default Demo

