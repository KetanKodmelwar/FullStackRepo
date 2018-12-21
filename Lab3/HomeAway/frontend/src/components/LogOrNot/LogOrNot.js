import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logOut} from '../../actions/loginActions';





class LogOrNot extends Component{
        constructor(props){
            super(props);

            

        }

  
        
     
  
  handleLogout = (e)=>{
    // cookie.remove('cookie', { path: '/' });
    e.preventDefault(); 
    this.props.logOut();
   }   
  

render(){
    const {isAuth,user}=this.props.log;



    if(isAuth===false)
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
            {user.firstName}
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



const mapStateToProps=state=>({
    log:state.log
});


export default connect(mapStateToProps,{logOut})(LogOrNot);