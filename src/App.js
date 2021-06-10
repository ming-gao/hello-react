import React, {Component} from 'react'
import TableBasic from './component/TableBasic'
import Demo from './component/Tree'
class App extends Component {
    // 那里有状态，就在哪里操作状态
    state = {column:[]}
    addColumn=(column)=>{
        this.setState({column})
    }
    render() {

        return (
            <div className="container">
                <TableBasic column={this.state.column}/>
                <Demo addColumn={this.addColumn}/>
            </div>
        )
    }
}

export default App
