import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Signup from './Signup/Signup';
import ListMyproperty from './ListMyProperty/ListMyProperty';
import SearchResult from './SearchResult/SearchResult';
import DisplayProperty from './DisplayProperty/DisplayProperty';
import MyIndex from './MyIndex';
import Logout from './Logout/Logout';
import Ownerlogin from './Ownerlogin/Ownerlogin';
import Ownersignup from './Ownersignup/Ownersignup';
import Messages from './Messages/Messages';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from 'react-apollo';

const client=new ApolloClient({uri:"http://localhost:3001/graphql"});

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <ApolloProvider client={client}>
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/listMyproperty" exact component={ListMyproperty}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/searchResult" exact component={SearchResult}/>
                <Route path="/displayProperty" exact component={DisplayProperty}/>
                <Route path="/myIndex" exact component={MyIndex}/>
                <Route path="/logout" exact component={Logout}/>
                <Route path="/ownerlogin" exact component={Ownerlogin}/>
                <Route path="/ownersignup" exact component={Ownersignup}/>
                <Route path="/messages" exact component={Messages} />
                              
            </div>
            </ApolloProvider>
        )
    }
}
//Export The Main Component
export default Main;