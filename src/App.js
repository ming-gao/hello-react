import React,{Component} from 'react'
import Header from './component/Header'
import List from './component/List'
import Footer from './component/Footer'
import './App.css'

class App extends Component{
  render(){
    return(
      <div className="todo-container">
        <div className="todo-wrap">
          <Header/>
          <List/>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App
