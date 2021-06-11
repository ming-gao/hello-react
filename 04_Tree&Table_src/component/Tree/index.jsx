import React, {Component,useState,useEffect } from 'react';
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

// const Demo = () => {
//     const onCheck = (checkedKeysValue,event) => {
//         console.log('onCheck', event);
//         setCheckedKeys(checkedKeysValue);
//         if (event.checked){
//             PubSub.publish('checkData',event.node)
//         } else {
//             PubSub.publish('cancelCheckData',event.node)
//         }
//     };
//
//     // const onSelect = (selectedKeysValue, info) => {
//     //     console.log('onSelect', info);
//     //     setSelectedKeys(selectedKeysValue);
//     // };
// };

export default Demo

// class demoTree extends Component {
//
//     state = {
//         values: []
//     };
//
//
//     // onChange = (key) => {
//     //     console.log('onChange ', key);
//     //     this.setState({values: key});
//     //     PubSub.publish('checkData',key)  //消息发布
//     // };
//     onSelect=(value, node)=>{
//         console.log(' node',node);
//         const {values} = this.state;
//         const newValues=[node,...values]
//         this.setState({ values:newValues });
//         PubSub.publish('checkData',node)  //消息发布
//
//     }
//     render() {
//         return (
//             <div>
//
//             </div>
//         )
//
//     }
// }

