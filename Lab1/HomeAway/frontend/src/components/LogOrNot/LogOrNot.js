import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';




class LogOrNot extends Component{
        constructor(props){
            super(props);

            this.state={
                isAuth:"",
                userid:null,
                username:""
            }

        }

  componentWillMount(){

    this.setState({
        isAuth:false,
        userid:this.state.userid,
        username:this.state.username
    })
  }
        
  componentDidMount(){
    axios.post('http://localhost:3001/isauth')
       .then(response => {
           console.log("Status Code : ",response.status);
           if(response.status === 200){
               console.log("Logs transferred for authorization",response.data);
            //     let x=response.data;
            //     this.setState({
            //         data:response.data
            //     })
            //    console.log("After",this.state.data);
             
            //    console.log("Data from state: ",this.state.mydata);
              //  this.props.callbackFromParent(this.state.data);
              if(response.data[0].userid===null){
                  this.setState({
                    isAuth:false                     
                  })
              }else{
                  this.setState({
                    
                    
                    isAuth:true,
                    userid:response.data[0].userid,
                    username:response.data[0].username

                  })
              }
               
               
           }})
       .catch(response =>{
           console.log("Status code: ",response.status);

           console.log('Authorization not done');
       })    

  }    
  
  handleLogout = (e)=>{
    // cookie.remove('cookie', { path: '/' });
    e.preventDefault();
   axios.post('http://localhost:3001/logout')
      .then(response => {
          console.log("Status Code : ",response.status);
          if(response.status === 200){
              
              console.log("User successfully logged out",response);
              window.location.reload();
  
          }})
      .catch(response =>{
          console.log("Status code: ",response.status);
  
          console.log('Error while logging out');
      })    
  
   }   
  

render(){

    if(this.state.isAuth===false)
{
    return(
        
        <div>
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{'background-color':'transparent','font-size':'1rem','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif','font-weight':'400','text-transform':'none','display':'block','padding':'unset'}}>
    Login
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link to="/login" style={{'text-decoration':'none'}}><a class="dropdown-item" style={{'font-size':'15px','text-transform':'none'}}>Traveller Login</a></Link>
    <Link to="/ownerlogin" style={{'text-decoration':'none'}}><a class="dropdown-item" style={{'font-size':'15px','text-transform':'none'}}>Owner Login</a></Link>
    
  </div>
</div>
            </div>
    )
}

else{
    return(
        <div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{'background-color':'transparent','font-size':'1rem','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif','font-weight':'400','text-transform':'none','display':'block','padding':'unset'}}>
            {this.state.username}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link to="/profile" style={{'text-decoration':'none'}}><a class="dropdown-item" style={{'font-size':'15px','text-transform':'none'}}>My Profile</a></Link>
            <Link to="/" onClick={this.handleLogout} style={{'text-decoration':'none'}}><a class="dropdown-item" style={{'font-size':'15px','text-transform':'none'}}>Logout</a></Link>
            
          </div>
        </div>
                    </div>
    )
}
}        


}

export default LogOrNot;