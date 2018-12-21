import React,{Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            emailID:"",
            password:"",
            isOwner:"no"
        }
        this.firstNameHandler=this.firstNameHandler.bind(this);
        this.lastNameHandler=this.lastNameHandler.bind(this);
        this.emailIDHandler=this.emailIDHandler.bind(this);
        this.passwordHandler=this.passwordHandler.bind(this);
        this.submitSignup=this.submitSignup.bind(this);


    }

    firstNameHandler=(e)=>{
        this.setState({
            firstName:e.target.value
        })
    }

    lastNameHandler=(e)=>{
        this.setState({
            lastName:e.target.value
        })
    }

    emailIDHandler=(e)=>{
        this.setState({
            emailID:e.target.value
        })
    }

    passwordHandler=(e)=>{
        this.setState({
            password:e.target.value
        })
    }

   

    submitSignup=(e)=>{
        e.preventDefault();
          const data={
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                emailID:this.state.emailID,
                password:this.state.password,
                isOwner:this.state.isOwner
            }

            axios.post('http://localhost:3001/signup',data)
                .then(response =>{
                    console.log("Status Code: ",response.status);
                    if(response.status===200)
                    {
                        console.log("Signed up successfully");
                        alert("Signed up successfully. Please Log in");
                        <Redirect to="/login" />
                    }else{
                        console.log("Error Somewhere");
                    }
                })
        
       
    }






    render(){
        return(
            <div>
                 <div className="row" style={{ 'height': '5px' ,'margin':'50px'}}>
                    <div style={{'padding-right':'700px'}}>
                        <img src="img/HomeAwayLogo.png" alt="HomeAway" />
                    </div>

                    <div style={{'float':'right','padding-left':'1200px','position':'absolute'}}>
                        <img src="img/HomeAwayHouseLogo.png" alt="HomeAway" ></img>
                    </div>
                </div>

                <div>
                    <div className="row" style={{ 'height': '900px','width':'100%','background-color':'#eaece5' }}>
                        <div className="row" style={{ 'height': '180px','width':'100%' }}>
                            <div className="row" style={{ 'height': '100px','width':'100%' }}>
                            <h1 style={{'text-align':'center','margin-top':'150px','margin-left':'150px','font-size':'40px','font-weight':'300','font-family':'"Roboto",Arial,sans-serif','width':'100%'}}>
                                Sign up as a traveller for Home Away
                            </h1>

                            <div style={{'text-align':'center','width':'100%','margin-left':'150px'}}>
                                <span style={{'box-sizing':'border-box','margin-right': '3px','color': '#666','font-size': '18px','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif'}}>
                                Already have an account?
                                </span>
                                <span style={{'box-sizing':'border-box','margin-right': '3px','color': '#2a6ebb','font-size': '18px','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif'}}>
                                <Link to="/login" style={{ textDecoration: 'none' }}>Log in</Link>
                                </span>
                            </div>
                            </div>
                        </div>
                        <div className="row" style={{ 'height': '550px','width':'100%' }}>
                        
                        <div className='col-md-4' style={{'margin':'25px'}} ></div>
                            <div className='col-md-4' style={{'height':'95%','border':'solid black 1px' ,'padding':'20px','background-color':'#fff'}}>
                                
                                <div className="row" style={{'height':'660px','width':'100%'}}>
                                    <div className='row' style={{'height':'270px','width':'100%','margin-left':'15px'}}>
                                        <input type="text" onChange = {this.firstNameHandler} placeholder="First Name" style={{'width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input type="text" onChange = {this.lastNameHandler} placeholder="Last Name" style={{'width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input type="text" onChange = {this.emailIDHandler} placeholder="Email address" style={{'width': '100%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input type="password" onChange = {this.passwordHandler} placeholder="Password" style={{'width': '100%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <br/>
                                        <br/>
                                        <input onClick = {this.submitSignup} type="submit" value="Sign me up" style={{'vertical-align':'middle','width':'70%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center','margin-left':'60px'}}/>
                                    </div>
                                    <hr style={{'width':'190px','margin-top':'-50px','position':'relative','color':'grey' }}/><hr style={{'width':'190px','margin-top':'-50px','position':'relative'}}/>
                                    <div className="row" style={{'height':'200px','width':'100%','margin-left':'15px'}}>
                                    <input type="Submit"  value="Log in with Facebook" style={{'margin-top':'-80px','vertical-align':'middle','width':'70%','height':'44px','background-color':'#2f4f88','border-color':'1px solid #2f4f88','font-size':'18px','color':'#FFE','text-align':'center','padding':'7px 31px','margin-left':'60px'}}/>
                                    <input type="Submit"  value="Log in with Google" style={{'margin-top':'-90px','position':'relative','vertical-align':'middle','width':'70%','height':'44px','background-color':'#f3f3f3','border-color':'1px solid #f3f3f3','font-size':'18px','color':'#787878','text-align':'center','padding':'7px 31px','margin-left':'60px'}}/>
                                    
                                    <small style={{'font-size':'10px','margin-top':'-110px','margin-left':'60px'}}>We don't post anything without your permission</small>
                                    
                                    </div>
                                    

                                </div>
                            </div>
                            <div className='col-md-4'></div> 
                             </div>
                        </div>
                        <div className="row" style={{ 'height': '140px','background-color':'#eaece5' }}></div> 


                    </div>
                    
                </div>
        )
    }
}

export default Signup;