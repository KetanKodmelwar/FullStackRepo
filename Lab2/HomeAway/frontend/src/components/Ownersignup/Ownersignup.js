import React,{Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ownersignupUser} from '../../actions/ownersignupActions';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';


class Ownersignup extends Component{

    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            emailID:"",
            password:"",
            isOwner:"yes",
            errors:{}
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

            this.props.ownersignupUser(data,this.props.history);
        
       
    }


    componentDidMount(){
        if(this.props.log.isAuth){
            this.props.history.push('/');
        }
    }

  componentWillReceiveProps(newChangedProps){
      if(newChangedProps.errors){
            this.setState({
                errors:newChangedProps.errors
            });
      }
  }




    render(){
        const {errors}=this.state;
        console.log("Erorrs in signup", errors);

        return(
            <div>
                 <div className="row" style={{ 'height': '5px' ,'margin':'50px'}}>
                    <div style={{'padding-right':'700px'}}>
                        <img src="img/HomeAwayLogo.png" alt="HomeAway" />
                    </div>
                    <Link to="/" style={{'textAlign':'right','marginLeft':'1100px','marginTop':'50px'}}>Go Home Page</Link>
                    <div style={{'float':'right','padding-left':'1200px','position':'absolute'}}>
                        <img src="img/HomeAwayHouseLogo.png" alt="HomeAway" ></img>
                    </div>
                </div>

                <div>
                    <div className="row" style={{ 'height': '900px','width':'100%','background-color':'#eaece5' }}>
                        <div className="row" style={{ 'height': '180px','width':'100%' }}>
                            <div className="row" style={{ 'height': '100px','width':'100%' }}>
                            <h1 style={{'text-align':'center','marginTop':'100px','margin-left':'150px','font-size':'40px','font-weight':'300','font-family':'"Roboto",Arial,sans-serif','width':'100%'}}>
                                Sign up as a Owner for Home Away
                            </h1>

                            <div style={{'text-align':'center','width':'100%','margin-left':'150px'}}>
                                <span style={{'box-sizing':'border-box','margin-right': '3px','color': '#666','font-size': '18px','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif'}}>
                                Already have an account?
                                </span>
                                <span style={{'box-sizing':'border-box','margin-right': '3px','color': '#2a6ebb','font-size': '18px','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif'}}>
                                <Link to="/ownerlogin" style={{ textDecoration: 'none' }}>Log in</Link>
                                </span>
                            </div>
                            </div>
                        </div>
                        <div className="row" style={{ 'height': '660px','width':'100%' }}>
                        
                        <div className='col-md-4' style={{'margin':'25px'}} ></div>
                            <div className='col-md-4' style={{'height':'95%','border':'solid black 1px' ,'padding':'20px','background-color':'#fff'}}>
                                
                                <div className="row" style={{'height':'660px','width':'100%'}}>
                                    <div className='row' style={{'height':'270px','width':'100%','margin-left':'15px'}}>
                                        <input type="text" className={classnames('form-control form-control-lg',{'is-invalid':errors.firstName})} onChange = {this.firstNameHandler} placeholder="First Name" />
                                        {errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
                                        <input type="text" className={classnames('form-control form-control-lg',{'is-invalid':errors.lastName})} onChange = {this.lastNameHandler} placeholder="Last Name" style={{'marginTop':'25px'}}/>
                                        {errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
                                        
                                        <input type="text" className={classnames('form-control form-control-lg',{'is-invalid':errors.emailID})} onChange = {this.emailIDHandler} placeholder="Email address" style={{'marginTop':'25px'}}/>
                                        {errors.emailID && (<div className="invalid-feedback">{errors.emailID}</div>)}
                                        <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password})} onChange = {this.passwordHandler} placeholder="Password" style={{'marginTop':'25px'}}/>
                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                        <br/>
                                        <br/>
                                        <input onClick = {this.submitSignup} type="submit" value="Sign me up" style={{'vertical-align':'middle','width':'70%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center','margin-left':'60px','marginTop':'25px'}}/>
                                    </div>
                                    {/* <hr style={{'width':'190px','margin-top':'-50px','position':'relative','color':'grey' }}/><hr style={{'width':'190px','margin-top':'-50px','position':'relative'}}/> */}
                                    <div className="row" style={{'height':'200px','width':'100%','margin-left':'15px'}}>
                                    <input type="Submit"  value="Log in with Facebook" style={{'margin-top':'-80px','vertical-align':'middle','width':'70%','height':'44px','background-color':'#2f4f88','border-color':'1px solid #2f4f88','font-size':'18px','color':'#FFE','text-align':'center','padding':'7px 31px','margin-left':'60px','marginTop':'100px'}}/>
                                    <input type="Submit"  value="Log in with Google" style={{'margin-top':'-90px','position':'relative','vertical-align':'middle','width':'70%','height':'44px','background-color':'#f3f3f3','border-color':'1px solid #f3f3f3','font-size':'18px','color':'#787878','text-align':'center','padding':'7px 31px','margin-left':'60px','marginTop':'20px'}}/>
                                    
                                    <small style={{'font-size':'10px','margin-left':'60px'}}>We don't post anything without your permission</small>
                                    
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




const mapStatetoProps=(state)=>({
     ownersignup:state.ownersignup,
     log:state.log,
     errors:state.errors
     
});

export default connect(mapStatetoProps,{ownersignupUser})(withRouter(Ownersignup));