import React, {Component} from 'react'
import Search from "./component/Search";
import List from "./component/List";
class App extends Component {
    // 那里有状态，就在哪里操作状态
    state={user:[]}
    setUsers=(user)=>{
        this.setState({user})
    }
    render() {

        return (
            <div className="container">
                <Search setUsers={this.setUsers}/>
                <List users={this.state.user}/>
            </div>
        )
    }
}

export default App
