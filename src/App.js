import React, {Component} from 'react'
import { Layout  } from 'antd';
import './App.css'

import TableBasic from './component/TableBasic'
import Demo from './component/Tree'
import EditableTree from './component/Tree/EditableTree'
const { Sider, Content ,Footer} = Layout;
class App extends Component {
    // 那里有状态，就在哪里操作状态
    state = {column:[]}
    addColumn=(column)=>{
        this.setState({column})
    }

    render() {

        return (
            <Layout>
                <Layout>
                    <Sider><Demo addColumn={this.addColumn}/></Sider>
                    <Content><TableBasic column={this.state.column}/></Content>
                </Layout>
                <Footer><EditableTree/></Footer>
            </Layout>
        )
    }
}

export default App
