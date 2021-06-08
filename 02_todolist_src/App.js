import React, {Component} from 'react'
import Header from './component/Header'
import List from './component/List'
import Footer from './component/Footer'
import './App.css'

class App extends Component {
    // 那里有状态，就在哪里操作状态
    state = {
        todos: [
            {id: 1, name: '吃饭', status: true},
            {id: 2, name: '睡觉', status: true},
            {id: 3, name: '写代码', status: false}
        ]
    }
    //接受一个todo对象
    addTodo = (todoObject) => {
        // 获取源状态
        const {todos} = this.state
        // 追加对象
        const newTodos = [todoObject, ...todos]
        // 更新状态
        this.setState({todos: newTodos})
    }
    //传入要更新对象的id和状态
    updateTodo = (id,status) => {
        const {todos} = this.state
        const newTodos = todos.map(todo =>{
            if(todo.id === id) return {...todo,status}
            else return todo
        })
        this.setState({todos:newTodos})
    }
    // 删除一个对象
    deleteTodo=(id)=>{
        const {todos} = this.state
        const newTodos =todos.filter(todo=>{
            return todo.id !== id
        })
        this.setState({todos: newTodos})
    }
    checkAll=(status)=>{
        const {todos} = this.state
        const newTodos = todos.map(todo=>{
            return {...todo,status}
        })
        this.setState({todos: newTodos})
    }
    clearTodo=()=>{
        const {todos} = this.state
        const newTodos = todos.filter(todo=>{
            return !todo.status
        })
        this.setState({todos: newTodos})
    }
    render() {
        const {todos} = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo}/>
                    <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                    <Footer todos={todos} checkAll={this.checkAll} clearTodo={this.clearTodo}/>
                </div>
            </div>
        )
    }
}

export default App
