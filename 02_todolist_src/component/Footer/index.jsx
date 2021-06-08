import React, { Component } from 'react';
import './Footer.css'

export default class Footer extends Component {
    handleCheckAll=(event)=>{
        this.props.checkAll(event.target.checked);
    }
    handleClear=(event)=>{
        this.props.clearTodo(event.target.checked)
    }
  render() {
      const {todos} = this.props
      const doneCount= todos.reduce((pre,todo)=> pre+(todo.status?1:0),0)
      console.log(doneCount)
    return (
      <div className="todo-footer">
        <label>
          <input onChange={this.handleCheckAll} checked={doneCount === todos.length} type="checkbox"/>
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{todos.length}
        </span>
        <button onClick={this.handleClear} className="btn btn-danger" >清除已完成任务</button>
      </div>
    );
  }
}
