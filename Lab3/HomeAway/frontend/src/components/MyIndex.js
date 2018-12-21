import React, {Component} from 'react';
import Login from './Login/Login';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Signup from './Signup/Signup';
import ListMyproperty from './ListMyProperty/ListMyProperty';
import SearchResult from './SearchResult/SearchResult';
import DisplayProperty from './DisplayProperty/DisplayProperty';
import {Link} from 'react-router-dom';

class MyIndex extends Component{
        constructor(props){
            super(props);
            this.state={
                data:[]
            }
        }

        myCallback=(dataFromChild)=>{
            this.setState({
                data:dataFromChild
            })
            console.log(this.state.data,"data from myIndex.js");
        }


    render(){
        return(
            <div>
                <Home callbackFromParent={this.myCallback}/>
                <SearchResult dataFromParent={this.state.data}/>
                Hi from Myindex
              </div>
        )
    }


}

export default MyIndex;