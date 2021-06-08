import React, {Component} from 'react';
import axios from 'axios';
class Search extends Component {
    search=()=>{
        const {keyWordElement:{value:keyWord}}=this
        axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
            response=>{
                this.props.setUsers(response.data.items)
            },
            err=>{
                console.log(err)
            }
        )
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={c=>(this.keyWordElement)=c} type="text" placeholder="enter the name you search"/>&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        );
    }
}

export default Search;
