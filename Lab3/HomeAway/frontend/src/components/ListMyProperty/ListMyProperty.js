import React, {Component,PropTypes} from 'react';
import axios from 'axios';
import {Tabs,Tab,TabPanel,TabList} from 'react-web-tabs';
import cookie from 'react-cookies';
import Redirect from 'react-router';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addProperty} from '../../actions/listPropertyActions';
import {logOut} from '../../actions/loginActions';

class ListMyProperty extends Component{

    constructor(props){
        super(props);
        this.state={
            myprop_location:"",
            myprop_headline:"",
            myprop_description:"",
            myprop_type:"",
            myprop_bedrooms:"",
            myprop_accomodates:"",
            myprop_bathrooms:"",
            myprop_pricing:"",
            cleanFee:"",
            available_startDate:"",
            available_endDate:"",
            // myprop_photos:"",
            key:1,
            selectedFile:"",
            imageView:"",
            isAuth:false,
            imagename:" ",

            errors:{}
            
            
           
            
        }

        this.mylocationHandler=this.mylocationHandler.bind(this);
        this.headlineHandler=this.headlineHandler.bind(this);
        this.mypropDescriptionHandler=this.mypropDescriptionHandler.bind(this);
        this.mypropTypeHandler=this.mypropTypeHandler.bind(this);
        this.BedroomsHandler=this.BedroomsHandler.bind(this);
        this.AccomodatesHandler=this.AccomodatesHandler.bind(this);
        this.BathroomsHandler=this.BathroomsHandler.bind(this);
        this.addPics=this.addPics.bind(this);
        this.priceHandler=this.priceHandler.bind(this);
        this.cleanFeeHandler=this.cleanFeeHandler.bind(this);
        this.arriveDateHandler=this.arriveDateHandler.bind(this);
        this.checkoutDateHandler=this.checkoutDateHandler.bind(this);
        this.submitProp=this.submitProp.bind(this);
        this.picsSubmit=this.picsSubmit.bind(this);
        
    }

    componentWillMount(){
        this.setState({
            isAuth:true
        })
    }

    // componentDidMount(){
    //     axios.post('http://localhost:3001/isauth')
    //     .then(response =>{
    //         //console.log("Status of user id from in auth",response.data[0].userid);
    //         console.log("Res",response);
    //         if(response.status ===200 && response.data==""){
    //             this.setState({
    //                 isAuth:false
    //             })
    //             console.log("State auth: ",this.state.isAuth)
    //         }
    //         else{
    //             this.setState({
    //                 isAuth:true
    //             })
    //             console.log("State auth: ",this.state.isAuth)
    //         }
    //     });
    // }

    mylocationHandler=(e)=>{
        this.setState({
            myprop_location:e.target.value
        })
    }

    headlineHandler=(e)=>{
        this.setState({
            myprop_headline:e.target.value
        })
    }

    mypropDescriptionHandler=(e)=>{
        this.setState({
            myprop_description:e.target.value
        })
    }

    mypropTypeHandler=(e)=>{
        this.setState({
            myprop_type:e.target.value
        })
    }

    BedroomsHandler=(e)=>{
        this.setState({
            myprop_bedrooms:e.target.value
        })
    }
    
    AccomodatesHandler=(e)=>{
        this.setState({
            myprop_accomodates:e.target.value
        })
    }

    BathroomsHandler=(e)=>{
        this.setState({
            myprop_bathrooms:e.target.value
        })
    }

    addPics=(e)=>{
        if(e.target.name == 'selectedFile'){
            this.setState({
                selectedFile:e.target.files[0]
            })
            
        }else{
            this.setState({
                [e.target.name]:e.target.value
            });
        }

        // this.setState({
        //     myprop_photos:e.target.value
        // })
    }

    arriveDateHandler=(e)=>{
        this.setState({
            available_startDate:e.target.value
        })
    }
    checkoutDateHandler=(e)=>{
        this.setState({
            available_endDate:e.target.value
        })
    }

    priceHandler=(e)=>{
        this.setState({
            myprop_pricing:e.target.value
        })
    }
    
    cleanFeeHandler=(e)=>{
        this.setState({
            cleanFee:e.target.value
        })
    }

     
    submitProp=(e)=>{

        e.preventDefault();
        const{selectedFile}=this.state;
        let formData=new FormData();

        formData.append('selectedFile',selectedFile);

        const data={
            myprop_location:this.state.myprop_location,
            myprop_headline:this.state.myprop_headline,
            myprop_description:this.state.myprop_description,
            myprop_type:this.state.myprop_type,
            myprop_bedrooms:this.state.myprop_bedrooms,
            myprop_accomodates:this.state.myprop_accomodates,
            myprop_bathrooms:this.state.myprop_bathrooms,
            myprop_pricing:this.state.myprop_pricing,
            cleanFee:this.state.cleanFee,
            available_startDate:this.state.available_startDate,
            available_endDate:this.state.available_endDate,
            owner_id:this.props.log.user.id,
            imagename:this.state.imagename
            // myprop_photos:this.state.myprop_photos,
         
        }

        this.props.addProperty(data,this.props.history);
        
        // axios.post('http://localhost:3001/listproperty',data)
        //     .then(response =>{
        //         console.log("Status code: "+response.status)
        //         if(response.status ===200){
        //             console.log("Data listed properly");
        //             alert("Your property has been listed");
        //             console.log(response);
        //         }
        //         else{
        //             console.log("Data not listed");
        //         }
        //     });
    }

    // componentWillReceiveProps(newChangedProps){

    //     if(newChangedProps.log.isAuth){
            
    //         //console.log("Login details: ",newChangedProps.log );
    //         this.props.history.push('/');
    //         alert("Posted the property successfully. Please press ok to go to the home page");
    //     }

    //     if(newChangedProps.errors){
    //           this.setState({
    //               errors:newChangedProps.errors
    //           });
    //     }
    // }
    

    onChange = (e) => {
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files[0]
          })
        }else{
          this.setState({ [e.target.name]: e.target.value });
        }
    }


    // picsSubmit =(e) =>{
    //     e.preventDefault();
    // const { selectedFile } = this.state;
    // let formData = new FormData();

    
    // formData.append('selectedFile', selectedFile);

    //   axios.post('http://localhost:3001/pics', formData)
    //     .then((response) => {
    //       // access results...
    //         console.log("Status code:",response.status)
    //         if(response.status === 200){
    //             console.log("Pic uploaded");
    //         }else{
    //             console.log("Pic not uploaded");
    //         }
    //     })
    //     .catch((response)=>{
    //         console.log(response.status);

    //     })
    // }
   

    picsSubmit = (e) => {
        e.preventDefault();
        const { selectedFile } = this.state;
        let formData = new FormData();
    
        
        formData.append('selectedFile', selectedFile);
    
        axios.post('http://localhost:3001/addPics',formData)
            .then(response=>{
                console.log(response);
                this.setState({
                    imagename:response.data
                })
                alert("Pics added successfully");
            })
            .catch(err=>{
                console.log("Error while adding pics");
            })

        //   axios.post('http://localhost:3001/imageupload', formData)
        //     .then((result) => {
        //     this.setState( {imageinsert:true});
        //     });
    
      }





    handleLogout = (e)=>{
        // cookie.remove('cookie', { path: '/' });
        e.preventDefault(); 
        this.props.logOut();
       }  


    render(){
        const {selectedFile}=this.state;
        // if(this.state.isAuth==false){
        //     return <Redirect to="/ownerlogin" />
        // }

        return(
            <div>
               {/* {redirectVar} */}
               <div className="row" style={{ 'height': '60px' ,'margin':'50px'}}>
                    <div style={{'top':'20px','left':'0','position':'absolute'}}>
                        <img src="img/HomeAwayLogo.png" alt="HomeAway" ></img>
                    </div>

                    {/* <div style={{'top':'20px','right':'150px','position':'absolute'}}>
                       <select style={{'cursor': 'pointer','height': '50px','padding': '0 25px','font-weight': '500','font-size': '15px','line-height': '61px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77'}}>
                           <option value="MyAccount" disabled selected hidden style={{'color':'black','font-weight': '400','font-size': '16px','padding': '10px 20px','white-space': 'nowrap','font-family': 'Open Sans,Helvetica Neue,Arial,sans-serif'}}>My Account</option>
                           <option value="AccountSettings" style={{'color':'black','font-weight': '400','font-size': '16px','padding': '10px 20px','white-space': 'nowrap','font-family': 'Open Sans,Helvetica Neue,Arial,sans-serif'}}>Account Settings</option>
                           <option value="PropertyDetails" style={{'color':'black','font-weight': '400','font-size': '16px','padding': '10px 20px','white-space': 'nowrap','font-family': 'Open Sans,Helvetica Neue,Arial,sans-serif'}}>Property Details</option>
                           <option value="PropertyArchieve" style={{'color':'black','font-weight': '400','font-size': '16px','padding': '10px 20px','white-space': 'nowrap','font-family': 'Open Sans,Helvetica Neue,Arial,sans-serif'}}>Property Archieve</option>
                           <option value="AddNewProperty" style={{'color':'black','font-weight': '400','font-size': '16px','padding': '10px 20px','white-space': 'nowrap','font-family': 'Open Sans,Helvetica Neue,Arial,sans-serif'}}>Add New Property</option>
                           <Link to="/" onClick={this.handleLogout} style={{'text-decoration':'none'}}><option value="Signout" style={{'color':'black','font-weight': '400','font-size': '16px','padding': '10px 20px','white-space': 'nowrap','font-family': 'Open Sans,Helvetica Neue,Arial,sans-serif'}}>Sign Out</option></Link> 
                           </select> 
                    </div> */}

                    <div style={{'top':'20px','right':'5px','position':'absolute'}}>
                        <img src="img/HomeAwayHouseLogo.png" alt="HomeAway" ></img>
                    </div>
                    
                    

                </div>
               <div className="row" style={{'width':'100%','height':'700px'}}>

            <Tabs defaultTab="vertical-tab-one" vertical selectedIndex={this.state.key} onSelect={this.handleSelect}>
               <div className='col-md-4' style={{'width':'200px'}}>
                    <TabList activeTabClassName='listProperty'>
                        
                    <Tab  tabFor="vertical-tab-one"  style={{'font-weight': '700','margin-top': '16px','font-size':'16px','display':'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem'}}>Welcome</Tab>
                    <Tab  tabFor="vertical-tab-two" style={{'font-weight': '700','margin-top': '16px','font-size':'16px','display':'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem'}}>Location</Tab>
                    <Tab  tabFor="vertical-tab-three"  style={{'font-weight': '700','margin-top': '16px','font-size':'16px','display':'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem'}}>Details</Tab>
                    <Tab  tabFor="vertical-tab-four"  style={{'font-weight': '700','margin-top': '16px','font-size':'16px','display':'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem'}}>Photos</Tab>
                    <Tab  tabFor="vertical-tab-five"  style={{'font-weight': '700','margin-top': '16px','font-size':'16px','display':'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem'}}>Pricing</Tab>
                    
                    </TabList>
                </div>
                
        <div className="col-md-8" style={{'background-color':'#f5f5f0', 'height':'650px','margin-top':'10px','width':'1000px','textAlign':'center'}}>
                                
                                
                            
        <TabPanel tabId="vertical-tab-one" eventKey={1} style={{'marginTop':'100px'}}>
            <ul>
                <h3>Welcome to post your property. Complete the following steps by clicking on the tabs on your left</h3>
                            
                {/* <input type="submit" value="Next"  style={{'vertical-align':'middle','width':'20%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/> */}
            </ul>  
        </TabPanel>
        <TabPanel tabId="vertical-tab-two" eventKey={2} style={{'marginTop':'100px'}}>
        <ul>
                        <h3>Location of the property</h3>
                        <input type="text" placeholder="Enter your location" onChange={this.mylocationHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                        <div >
                        {/* <input type="submit" value="Back" style={{'vertical-align':'middle','width':'20%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center'}}/>
                        <input type="submit"  value="Next"  style={{'margin-left':'5px','vertical-align':'middle','width':'20%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/> */}
                        </div>
                    </ul>
        </TabPanel>
        <TabPanel tabId="vertical-tab-three" eventKey={3}>
        <ul>
                        <h3>Describe your property</h3>
                        <h5>Start out with a descriptive headline and a detailed summary of your property</h5>
                         <span style={{'display':'block'}}>               
                            <input type="text" placeholder="Headline" onChange={this.headlineHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                        </span>
                        <span style={{'display':'block'}}>
                            <textarea onChange={this.mypropDescriptionHandler} placeholder="Property description" rows="5" cols="10" style={{'margin-bottom':'10px','width': '40%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}></textarea>
                        </span>
                        <span style={{'display':'block'}}>
                            <input type="text" placeholder="Property Type" onChange={this.mypropTypeHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                        </span>
                        <span style={{'display':'block'}}>
                            <input type="text" placeholder="Bedrooms" onChange={this.BedroomsHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                        </span>
                        <span style={{'display':'block'}}>                
                            <input type="text" placeholder="Accomodates" onChange={this.AccomodatesHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                        </span>
                        <span style={{'display':'block'}}>
                        <   input type="text" placeholder="Bathrooms" onChange={this.BathroomsHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
                        </span>
                                        
                        <div>
                        {/* <input type="submit" value="Back"  style={{'vertical-align':'middle','width':'20%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center'}}/>
                        <input type="submit" value="Next"  style={{'margin-left':'5px','vertical-align':'middle','width':'20%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/> */}

                        </div>

                    </ul>
        </TabPanel>

        <TabPanel tabId="vertical-tab-four" eventKey={4} style={{'marginTop':'100px'}}>
        <ul>
                            <h3>Add upto 5 photos of your property</h3>
                            <h5>Showcase your property's best features. Requirements:JPEG </h5>
                            <p> (Please click on Add Pics after you choose your files) </p>
                            
                                {/* <button onClick={this.addPics} >Add Property Photos</button></li> */}
                                <span style={{'display':'block'}}>
                                <form enctype="multipart/form-data">
                                <input type="file" name="selectedFile" onChange={this.addPics}  style={{'vertical-align':'middle','width':'60%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center','margin-left':'5px'}} multiple/>
                                </form>
                                </span>
                           <div>
                              
                           <input type="submit" value="Add Pics" onClick={this.picsSubmit} style={{'margin-left':'5px','vertical-align':'middle','width':'20%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center','marginTop':'50px'}}/>
                               </div>
                            <div>
                                {/* <input type="submit" value="Back"  style={{'vertical-align':'middle','width':'20%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center'}}/>
                                <input type="submit" value="Next"  style={{'margin-left':'5px','vertical-align':'middle','width':'20%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/> */}

                            </div>
                            
                        </ul> 
        </TabPanel>

        <TabPanel tabId="vertical-tab-five" eventKey={5} style={{'marginTop':'100px'}}>
        <ul>
                        <h3> Block the dates when you want your property to be listed</h3>
                        
                        <div>
                            <span style={{'display':'block'}}>
                            Start Date: <input type="date" name="arrivedate" placeholder="Arrive Date" onChange={this.arriveDateHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px','marginRight':'85px'}} />
                            </span>
                            <span style={{'display':'block'}}>
                            End Date :   <input type="date" name="checkoutdate" placeholder="Checkout Date" onChange={this.checkoutDateHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px','marginRight':'85px'}} />
                            </span>
                        </div>
        
                        <div>
                            <span style={{'display':'block'}}>
                            <input type="text" name="price" placeholder="Nightly Base Rate" onChange={this.priceHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}  />
                            </span>
                            <span style={{'display':'block'}}>
                            <input type="text" name="cleanfee" placeholder="Cleaning Fee" onChange={this.cleanFeeHandler} style={{'margin-bottom':'10px','width': '40%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}  />
                            </span>
                        </div>
        
                        <div>
                            
                        {/* <input type="submit" value="Back"  style={{'vertical-align':'middle','width':'20%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center'}}/> */}
                            
                            <Link to="/"><input type="Submit" onClick={this.submitProp} style={{'margin-left':'5px','vertical-align':'middle','width':'20%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/></Link>
                        </div>
                        
                    </ul>      
            </TabPanel>

        </div>
      </Tabs>
                
</div>
                

         </div>  
        
        );
    }
}

const mapStatetoProps=(state)=>({
    log:state.log,
    errors:state.errors,
    listProperty:state.listProperty
    
});

export default connect(mapStatetoProps,{addProperty,logOut})(withRouter(ListMyProperty));