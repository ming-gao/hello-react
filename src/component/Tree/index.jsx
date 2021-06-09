import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import { TreeSelect } from 'antd';

class Tree extends Component {

    state = {
        values: []
    };


    onChange = (key) => {
        console.log('onChange ', key);
        this.setState({values: key});
        PubSub.publish('checkData',key)  //消息发布
    };
    // onSelect=(value, node)=>{
    //     console.log(' node',node);
    //     const {values} = this.state;
    //     const newValues=[node,...values]
    //     this.setState({ values:newValues });
    //
    // }
    render() {
        const { SHOW_CHILD } = TreeSelect;
        const treeData = [
            {
                title: 'Node1',
                value: '0-0',
                key: '0-0',
                children: [
                    {
                        title: 'Child Node1',
                        value: '0-0-0',
                        key: '0-0-0',
                    },
                ],
            },
            {
                title: 'Node2',
                value: '0-1',
                key: '0-1',
                children: [
                    {
                        title: 'Child Node3',
                        value: '0-1-0',
                        key: '0-1-0',
                    },
                    {
                        title: 'Child Node4',
                        value: '0-1-1',
                        key: '0-1-1',
                    },
                    {
                        title: 'Child Node5',
                        value: '0-1-2',
                        key: '0-1-2',
                    },
                ],
            },
        ];
        // array[{value, title, children, [disabled, disableCheckbox, selectable, checkable]}]
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            onSelect:this.onSelect,
            treeCheckable: true,
            showCheckedStrategy: SHOW_CHILD,
            placeholder: 'Please select',
            labelInValue:false,
            style: {
                width: '100%',
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

export default Tree;
