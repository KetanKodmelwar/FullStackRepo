import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            authFlag:false,
            userid:"",
            isOwner:"no"
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
       // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password,
            isOwner : this.state.isOwner
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true,
                        userid : response.data[0].userid
                        
                    })
                    console.log('Logged in with Userid: ',response.data[0].userid);
                    
                }})
            .catch(response =>{
                console.log("Status code: ",response.status);

                this.setState({
                    authFlag : false
                })
                console.log('Wrong username and password');
            })    
                    
                
            
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag==true){
            return  <Redirect to="/"/>
            console.log('Nice');
        }
        return(
            <div>
                {/* {redirectVar} */}
                <div className="row" style={{ 'height': '25px' ,'margin':'50px'}}>
                    <div style={{'padding-right':'700px'}}>
                        <img src="img/HomeAwayLogo.png" alt="HomeAway" ></img>
                    </div>

                    <div style={{'float':'right','padding-left':'1200px','position':'absolute'}}>
                        <img src="img/HomeAwayHouseLogo.png" alt="HomeAway" ></img>
                    </div>
                </div>
            <form>
                <div>
                    <div className="row" style={{ 'height': '900px','width':'100%','background-color':'#eaece5' }}>
                        <div className="row" style={{ 'height': '180px','width':'100%' }}>
                            <div className="row" style={{ 'height': '100px','width':'100%' }}>
                            <h1 style={{'text-align':'center','margin-top':'80px','margin-left':'150px','font-size':'40px','font-weight':'300','font-family':'"Roboto",Arial,sans-serif','width':'100%'}}>
                                Log in to HomeAway
                            </h1>

                            <div style={{'text-align':'center','width':'100%','margin-left':'150px'}}>
                                <span style={{'box-sizing':'border-box','margin-right': '3px','color': '#666','font-size': '18px','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif'}}>
                                Need An Account?
                                </span>
                                <span style={{'box-sizing':'border-box','margin-right': '3px','color': '#2a6ebb','font-size': '18px','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif'}}>
                                <Link to="/signup" style={{ textDecoration: 'none' }}>Sign up</Link>
                                </span>
                            </div>
                            </div>
                        </div>
                        <div className="row" style={{ 'height': '650px','width':'100%' }}>
                        
                        <div className='col-md-5' ></div>
                            <div className='col-md-3' style={{'height':'95%','border':'solid black 1px' ,'padding':'20px','background-color':'#fff'}}>
                                <div className="row" style={{'height':'60px','width':'100%','text-align':'left','margin':'4px','border-bottom': '1px solid #dbdbdb'}}>
                                    <div style={{'width':'100%','padding':'10px'}}>
                                        <p style={{'width':'100%','text-align':'','box-sizing':'border-box','font-family': '"Roboto",Arial,sans-serif','color': '#666','font-size': '22px','font-weight': '300'}}>
                                               Traveller's Login
                                        </p>
                                    </div>
                                </div>
                                <div className="row" style={{'height':'660px','width':'100%'}}>
                                    <div className='row' style={{'height':'125px','width':'100%','margin-left':'15px'}}>
                                        <input type="text" onChange = {this.usernameChangeHandler} placeholder="Email address" style={{'width': '100%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input type="password" onChange = {this.passwordChangeHandler} placeholder="Password" style={{'width': '100%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <br/><a href="" style={{'margin-top':'10px', 'color':'#2a6ebb', 'width':'100%','padding':'9px 14px'}}>Forgot Password?</a>
                                        <br/>
                                        <input onClick = {this.submitLogin} type="submit" value="Log in" style={{'vertical-align':'middle','width':'100%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/>
                                        <span style={{'padding':'15px 14px','height':'50px','width':'100%'}}>
                                            <input  type="checkbox" value="true" style={{'transform':'scale(1.5)'}}/>
                                            <label style={{'padding-left':'10px'}}>Keep me signed in </label>
                                        </span>
                                 
                                        <hr style={{'width':'50px','margin-top':'-50px','position':'relative','color':'grey' }}/>or<hr style={{'width':'50px','margin-top':'-50px','position':'relative'}}/>

                                    </div>
                                 
                                    <div className="row" style={{'height':'125px','width':'100%','margin-left':'15px'}}>
                                    <input type="Submit"  value="Log in with Facebook" style={{'vertical-align':'middle','width':'100%','height':'44px','background-color':'#2f4f88','border-color':'1px solid #2f4f88','font-size':'18px','color':'#FFE','text-align':'center','padding':'7px 31px'}}/>
                                    <input type="Submit"  value="Log in with Google" style={{'vertical-align':'middle','width':'100%','height':'44px','background-color':'#f3f3f3','border-color':'1px solid #f3f3f3','font-size':'18px','color':'#787878','text-align':'center','padding':'7px 31px'}}/>
                                    
                                    <small style={{'font-size':'10px'}}>We don't post anything without your permission</small>
                                    
                                    </div>
                                    

                                </div>
                            </div>
                            <div className='col-md-4'></div> 
                             </div>
                        </div>
                        <div className="row" style={{ 'height': '140px','background-color':'#eaece5'}}></div> 


                    </div>
                    </form>      
                
            
            
            
            
            
            
            
            
            </div>
        )
    }
}

export default Login;