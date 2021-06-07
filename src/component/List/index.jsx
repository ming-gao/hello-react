import React, { Component } from 'react'
import propTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {
  // 对接受的props进行限制
  static propTypes = {
    todos:propTypes.array.isRequired,
    updateTodo:propTypes.func.isRequired
  }
  render() {
    const {todos,updateTodo}=this.props
    return (
      <ul className="todo-main">
        {
          todos.map((todo)=>{
            return (<Item key={todo.id} {...todo} updateTodo={updateTodo}/>)
          })
        }
      </ul>
    )
  }
}
