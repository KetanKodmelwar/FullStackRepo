import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class Logout extends Component{


 componentDidMount(){

    axios.post('http://localhost:3001/logout')
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            <Redirect to="/" />
            console.log("User successfully logged out",response);

        }})
    .catch(response =>{
        console.log("Status code: ",response.status);

        console.log('Error while logging out');
    })    

 }   

}

export default Logout