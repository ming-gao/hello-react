import React, { Component } from 'react';
import propTypes from 'prop-types'
import {nanoid} from 'nanoid';
import './Header.css'

export default class Header extends Component {
  static propTypes = {
    addTodo:propTypes.func.isRequired
  }
  handleKeyUp=(event)=>{
    //解构赋值获取
    const {target,keyCode} = event
    //判断是否回车键抬起
    if (keyCode!==13) return
    if (target.value.trim()===''){
      alert('不能为空')
      return
    }
    //准备todo对象
    const todoObject = {id:nanoid(),name:target.value,status:false}
    // 将todo传给App
    this.props.addTodo(todoObject)
    target.value = ''
  }
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handleKeyUp}  type="text" placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    );
  }
}
