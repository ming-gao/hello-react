import React, {Component} from 'react';
// import {Link,Route} from 'react-router-dom'
import {NavLink,Route} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Header from './component/Header'
class Index extends Component {
    // 四、路由组件与一般组件
    // 1.写法不同:
    //     一般组件: <Demo/>
    // 路由组件: <Route path="/ demo" component={Demo}/>
    // 2.存放位置不同:
    //     一般组件: components
    //     路由组件: pages
    // 3.接收到的props不同:
    //     一般组件: 写组件标签时传递了什么，就能收到什么
    //     路由组件:接收到三个固定的属性

    // history:
    //     go: f go(n)
    //     goBack: f goBack()
    //     goForward: f goForward()
    //     push: f push(path, state)
    //     replace: f replace(path, state)
    // location :
    //     pathname : "/about"
    //     search:''
    //     state:undefined
    // match :
    //     params: {}
    //     path: " /about"
    //     url: "/about"

render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <Header className="page-header"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            {/*/!*<a className="list-group-item" href="./about.html">About</a>*/}
                            {/*<a className="list-group-item active" href="./home.html">Home</a>*!/*/}
                            {/*在React中靠路由链接实现切换组件--编写路由链接*/}

                            {/*<Link className="list-group-item" to="/about">About</Link>*/}
                            {/*<Link className="list-group-item active" to="/home">Home</Link>*/}

                            {/*如果是active则不用加 activeClassName*/}
                            <NavLink activeClassName="custom" className="list-group-item" to="/about">About</NavLink>
                            <NavLink activeClassName="custom" className="list-group-item" to="/home">Home</NavLink>

                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Route path="/about" component={About}/>
                                <Route path="/home" component={Home}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
