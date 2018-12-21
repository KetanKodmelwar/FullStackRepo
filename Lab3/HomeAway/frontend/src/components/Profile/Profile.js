import React,{Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {currentProfile} from '../../actions/profileActions';
import {updateProfile} from '../../actions/profileActions';
import { graphql } from 'react-apollo';
import {gql} from "apollo-boost";


class Profile extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            aboutMe:"",
            city:"",
            company:"",
            school:"",
            hometown:"",
            gender:"",
            languages:"",
            phone:"",
            errors:{}
        }

        this.firstNameChangeHandler=this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler=this.lastNameChangeHandler.bind(this);
        this.aboutMeChangeHandler=this.aboutMeChangeHandler.bind(this);
        this.cityChangeHandler=this.cityChangeHandler.bind(this);
        this.companyChangeHandler=this.companyChangeHandler.bind(this);
        this.schoolChangeHandler=this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler=this.hometownChangeHandler.bind(this);
        this.genderChangeHandler=this.genderChangeHandler.bind(this);
        this.languagesChangeHandler=this.languagesChangeHandler.bind(this);
        this.phoneChangeHandler=this.phoneChangeHandler.bind(this);
        this.submitProfile=this.submitProfile.bind(this);

        
    }

    firstNameChangeHandler=(e)=>{
        this.setState({
            firstName:e.target.value
        })
    }

    lastNameChangeHandler=(e)=>{
        this.setState({
            lastName:e.target.value
        })
    }

    aboutMeChangeHandler=(e)=>{
        this.setState({
            aboutMe:e.target.value
        })
    }

    cityChangeHandler=(e)=>{
        this.setState({
            city:e.target.value
        })
    }

    companyChangeHandler=(e)=>{
        this.setState({
            company:e.target.value
        })
    }

    schoolChangeHandler=(e)=>{
        this.setState({
            school:e.target.value
        })
    }

    hometownChangeHandler=(e)=>{
        this.setState({
            hometown:e.target.value
        })
    }

    genderChangeHandler=(e)=>{
        this.setState({
            gender:e.target.value
        })
    }

    languagesChangeHandler=(e)=>{
        this.setState({
            languages:e.target.value
        })
    }

    phoneChangeHandler=(e)=>{
        this.setState({
            phone:e.target.value
        })
    }

    submitProfile = (e) => {
       
     const data = {
         
         firstName : this.props.log.user.firstName,
         lastName : this.props.log.user.lastName,
         aboutMe : this.state.aboutMe,
         city : this.state.city,
         company : this.state.company,
         school : this.state.school,
         hometown : this.state.hometown,
         gender : this.state.gender,
         languages : this.state.languages,
         phone : this.state.phone,
         user_id:this.props.log.user.id,
         errors:{} 
     }
     
     //set the with credentials to true
     axios.defaults.withCredentials = true;
     //make a post request with the user data
     this.props.updateProfile(data,this.props.history)
 
 }

 componentWillReceiveProps(newChangedProps){
    if(newChangedProps.errors){
          this.setState({
              errors:newChangedProps.errors
          });
    }

    if(newChangedProps.profile){
        console.log("Checking previosuly enterd",newChangedProps.profile)
        this.setState({
        firstName : newChangedProps.profile.profile.firstName,
         lastName : newChangedProps.profile.profile.lastName,
         aboutMe :  newChangedProps.profile.profile.aboutMe,
         city :     newChangedProps.profile.profile.city,
         company :  newChangedProps.profile.profile.company,
         school :   newChangedProps.profile.profile.school,
         hometown : newChangedProps.profile.profile.hometown,
         gender :   newChangedProps.profile.profile.gender,
         languages: newChangedProps.profile.profile.languages,
         phone :    newChangedProps.profile.profile.phone,
        })
    }
}
componentDidMount=(e)=>{
  
    // axios.post('http://localhost:3001/loadprofile')
    //    .then(response => {
    //        console.log("Status Code : ",response.status);
    //        if(response.status === 200){
    //            console.log("Profile loaded sucessfully",response.data);
    //         //     let x=response.data;
    //         //     this.setState({
    //         //         data:response.data
    //         //     })
    //         //    console.log("After",this.state.data);
             
    //         //    console.log("Data from state: ",this.state.mydata);
    //           //  this.props.callbackFromParent(this.state.data);
    //           this.setState({
    //             firstName : response.data[0].firstName,
    //             lastName : response.data[0].lastName,
    //             aboutMe : response.data[0].aboutMe,
    //             city : response.data[0].city,
    //             company : response.data[0].company,
    //             school : response.data[0].school,
    //             hometown : response.data[0].hometown,
    //             gender : response.data[0].gender,
    //             languages : response.data[0].languages,
    //             phone : response.data[0].phone 
    //           }) 
               
    //        }})
    //    .catch(response =>{
    //        console.log("Status code: ",response.status);

    //        console.log('Profile not loaded');
    //    }) 
    
        const data={
            user_id:this.props.log.user.id,
            firstName:this.props.log.user.firstName,
            lastName:this.props.log.user.lastName
        }
        console.log("User id sending",data)
        this.props.currentProfile(data)
        


}

submitProfilegraphQl(){
    const myProfile=this.props.data
    console.log(myProfile);

    if(myProfile.loading){
        return <div>Loading
            </div>
    }else{
        return <div>Profile updated Successfully
            </div>
    }
}





    
 


    render(){
        return(
         <div>
             <div className="row" style={{ 'height': '25px' ,'margin':'50px'}}>
                    <div style={{'padding-right':'700px'}}>
                        <img src="img/HomeAwayLogo.png" alt="HomeAway" ></img>
                    </div>

                    <div style={{'float':'right','padding-left':'1200px','position':'absolute'}}>
                        <img src="img/HomeAwayHouseLogo.png" alt="HomeAway" ></img>
                    </div>
                </div>

                <div className="row" style={{'height': '25px' ,'margin':'50px'}}>
                    <div style={{'display':'block','margin-left':'auto','margin-right':'auto'}}>
                        <img src="img/profilepic.gif" alt="Profile picture" width="100px" height="100px" style={{'display':'block','margin':'0 auto'}}></img>
                        <h2 style={{'font-size': '2rem','line-height': '2.5rem','font-family':"'Lato','Roboto','Arial','Helvetica Neue',Helvetica,sans-serif",'font-weight': '700','text-align': 'center'}}>{this.state.firstName + " " + this.state.lastName}</h2>
                    </div>
                </div>

               


               <div>
                    <div className="row" style={{ 'height': '900px','width':'100%','background-color':'#eaece5','margin-top':'150px' }}>
                        <div className="row" style={{ 'height': '990px','width':'100%' }}>
                            <div className='col-md-1' ></div>
                                <div className='col-md-7' style={{'margin-top':'65px','height':'95%','border':'light grey 1px' ,'padding':'20px','background-color':'#fff'}}>
                                    <div className="row" style={{'height':'60px','width':'100%','text-align':'left','margin':'4px','border-bottom': '1px solid #dbdbdb'}}>
                                        <div style={{'width':'100%','padding':'10px'}}>
                                            <p style={{'width':'100%','text-align':'','box-sizing':'border-box','font-family': '"Roboto",Arial,sans-serif','color': '#FF','font-size': '22px','font-weight': '300'}}>
                                                Profile Information
                                            </p>
                                    </div>
                                </div>
                                <div className="row" style={{'height':'660px','width':'100%'}}>
                                    <div className='row' style={{'height':'125px','width':'100%','margin-left':'15px'}}>
                                        <input type="text" value={this.state.firstName} onChange = {this.firstNameChangeHandler} placeholder="First Name" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input type="text" value={this.state.lastName} onChange = {this.lastNameChangeHandler} placeholder="Last Name" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <textarea value={this.state.aboutMe} onChange={this.aboutMeChangeHandler} name="AboutMe" placeholder="About Me" rows="5" cols="20" style={{'margin-left':'1px','width': '100%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}>{this.state.aboutMe}</textarea>
                                        <input type="text" value={this.state.city} onChange={this.cityChangeHandler} placeholder="My city,country" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input value={this.state.company} onChange={this.companyChangeHandler} type="text" name="Company" placeholder="Company" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input value={this.state.school} onChange={this.schoolChangeHandler} type="text" name="School" placeholder="School" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input value={this.state.hometown} onChange={this.hometownChangeHandler} placeholder="Home Town" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        <input value={this.state.languages} onChange={this.languagesChangeHandler} type="text" name="Languages" placeholder="Languages" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                        
                                        <select name="Gender" onChange={this.genderChangeHandler} value={this.state.gender} style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}>
                                            <option value="" disabled selected hidden>Gender</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Other">Others</option>

                                        </select>
                                        <small style={{'font-size':'10px','margin-left':'1px','width': '50%','height': '1px','padding':  '9px 14px','border-radius':  '0px','line-height':  '1.33',}}>This is never shared</small>
                                        <input value={this.state.phone} onChange={this.phoneChangeHandler}  type="telno" name="Telephone" placeholder="Telephone" style={{'margin-left':'1px','width': '50%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                                       
                                        
                                       
                                        <br/>
                                        <br/>
                                                                          
                                        <span style={{'padding':'15px 14px','height':'50px','width':'100%'}}>
                                        <input onClick={this.submitProfile} type="submit" value="Save Changes" style={{'display':'block','color': 'white','border-color': '#2f4f88','background-color': '#2f4f88','min-height': '48px','position': 'relative','border-radius': '100px','box-shadow': 'none','font-weight': '400','text-align': 'center','vertical-align': 'middle','padding': '11px 32px','width':'200px'}}/>
                                        <Link to="/" style={{'text-decoration':'none'}}><input  type="submit" value="Back" style={{'margin-top':'10px','display':'block','color': 'white','border-color': '#2f4f88','background-color': '#2f4f88','min-height': '48px','position': 'relative','border-radius': '100px','box-shadow': 'none','font-weight': '400','text-align': 'center','vertical-align': 'middle','padding': '11px 32px','width':'200px'}}/></Link>
                                        </span>


                                    </div>
    
                                    
                                    

                                </div>

                                
                            </div>
                            <div className='col-md-4'></div> 
                             </div>
                        </div>
                        <div className="row" style={{ 'height': '140px','background-color':'#eaece5'}}></div> 


                    </div>
                
            
        </div>   

        )
    }
}


const mapStatetoProps=(state)=>({
    log:state.log,
    errors:state.errors,
    profile:state.profile
    
});

const updateProfileQuery=gql`
    mutation updateProps(
            $id:String
            $firstName:String
            $lastName:String
            $aboutMe:String
            $city:String
            $company:String
            $school:String
            $hometown:String
            $gender:String
            $languages:String
            $phone:String
    ){
        profile(_id:$id){
            firstName,
            lastName,
            aboutMe,
            city,
            company,
            school,
            hometown,
            gender,
            languages,
            phone
        }
    }
`

//export default connect(mapStatetoProps,{currentProfile,updateProfile})(withRouter(Profile));
export default graphql(updateProfileQuery,{
    options:props=>{
        return {
            variables:{
                id:localStorage.getItem("localUserID")
            }
        }
    }
})