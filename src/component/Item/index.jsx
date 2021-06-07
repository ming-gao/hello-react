import React, {Component} from 'react'
import './Item.css'

export default class Item extends Component {
    state = {mouse: false}
    handleMouse = (flag) => {
        return () => {
            this.setState({mouse: flag});
        }
    }
    handleCheck=(id)=> {
        return (event) =>{
            this.props.updateTodo(id,event.target.checked)
        };
    }
    handleDelete=(id)=>{
        if (window.confirm('确定删除？')){
            this.props.deleteTodo(id)
        }

    }
    render() {
        const {name, id, status} = this.props

        return (
            <li style={{backgroundColor: this.state.mouse ? '#ddd' : 'white'}} onMouseEnter={this.handleMouse(true)}
                onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type="checkbox" defaultChecked={status} onChange={this.handleCheck(id)}/>
                    <span>{name}</span>
                </label>
                <button className="btn btn-danger" onClick={()=>this.handleDelete(id)} style={{display: this.state.mouse ? 'block' : 'none'}}>删除</button>
            </li>
        )
    }


}
