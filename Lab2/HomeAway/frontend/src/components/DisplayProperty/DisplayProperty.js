import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import Photo from '../SearchResult/Photo';

import cookie from 'react-cookies';
// import Redirect from 'react-router';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
import Modal from 'react-responsive-modal'
import {connect} from 'react-redux';

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    
  };

  


class DisplayProperty extends Component{

    constructor(props){
        super(props);

        this.state={
            myprop_id:"",
            bookCheckin_date:"",
            bookCheckout_date:"",
            userid:"",
            isBooked:false,
            open:false,
            questionHeadline:"",
            questionDescription:"",
            imageView:""
        }

        this.bookedSubmit=this.bookedSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.questionHeadlineHandler=this.questionHeadlineHandler.bind(this);
        this.questionDescriptionHandler=this.questionDescriptionHandler.bind(this);
        

        const {data}=props.location.state;
        console.log("Data: ",data);
        const {value}=props.location.state;
        console.log("Value: ",value);
        const {guests}=props.location.state;
        console.log("Guests: ",guests);
        const {arrive_date}=props.location.state;
        console.log("Arrive: ",arrive_date);
        const {checkout_date}=props.location.state;
        console.log("Checkout: ",checkout_date);
            
            
    }

    bookedSubmit=(e)=>{


        // const myprop_id=this.props.location.state.data[valueOfArray]._id;
        // console.log("Property id",myprop_id);
        let val;
        if(this.props.location.state.curr_page===1){
            val=this.props.location.state.value
        }else{
            val=(this.props.location.state.propPerPage)+(this.props.location.state.value)
        }
        const data={
            //myprop_id:this.props.location.state.data[this.props.location.state.value].id,
            myprop_id:this.props.search.searchResult[val]._id,
            owner_id:this.props.search.searchResult[val].user,
            bookCheckin_date:this.props.location.state.arrive_date,
            bookCheckout_date:this.props.location.state.checkout_date,
            user_id:this.props.log.user.id
        }
        axios.defaults.withCredentials = true;
        console.log("Data for booking",data);
        //make a post request with the user data
        axios.post('http://localhost:3001/routeapi/book/bookProperty',data)
        .then(response => {
             console.log("Status Code : ",response.status);
         if(response.status === 200){
             console.log("Booked Successfully");
             alert("Booked Successfully");
                
            //  window.location.reload();
             
         }else{
             console.log("Error in Booking");
         }
     });

    }

    sendQuestion=(e)=>{

        e.preventDefault();
        let val;
        if(this.props.location.state.curr_page===1){
            val=this.props.location.state.value
        }else{
            val=(this.props.location.state.propPerPage)+(this.props.location.state.value)
        }
        const data={
            questionHeadline:this.state.questionHeadline,
            questionDescription:this.state.questionDescription,
            owner_id:this.props.location.state.data[val].user
        }
        console.log("Data from react",data);

        axios.post('http://localhost:3001/routeapi/QandA/question',data)
            .then(response=>{
                console.log("Status code ",response.status);
                if(response.status===200){
                    console.log("Question submitted successfully");
                    alert("Question submitted successfully");

                    this.setState({
                        open:false
                    })
                }else{
                    console.log("Error in the scene");
                }

            })
            .catch(err=>{
                console.log("Error in question part");
            })
    }
    

    openModal (){
        this.setState({ open: true })
      }
      closeModal () {
        this.setState({ open: false })
      }


      questionHeadlineHandler=(e)=>{
        this.setState({
            questionHeadline:e.target.value
        })
      }

      questionDescriptionHandler=(e)=>{

        this.setState({
            questionDescription:e.target.value
        })

      }

render(){
    console.log("Stats in display property",this.state);

    

    const {open}=this.state;
    // console.log(this.props.location.state.data);
    console.log("Current page",this.props.location.state.curr_page)
    console.log("Value found in here",this.props.location.state.value)
    let valueOfArray;
    if(this.props.location.state.curr_page===1){
        valueOfArray=this.props.location.state.value
    }else{
        valueOfArray=(this.props.location.state.propPerPage)+(this.props.location.state.value)
    }

    const myprop_id=this.props.location.state.data[valueOfArray]._id;
    console.log("Property id",myprop_id);

    let owner_id=this.props.location.state.data[valueOfArray].user;
    let prop_location=this.props.location.state.data[valueOfArray].myprop_location;
    let prop_headline=this.props.location.state.data[valueOfArray].myprop_headline;
    let prop_description=this.props.location.state.data[valueOfArray].myprop_description;
    let prop_type=this.props.location.state.data[valueOfArray].myprop_type;
    let prop_bedrooms=this.props.location.state.data[valueOfArray].myprop_bedrooms;
    let prop_accomodates=this.props.location.state.data[valueOfArray].myprop_accomodates;
    let prop_bathrooms=this.props.location.state.data[valueOfArray].myprop_bathrooms;
    let prop_pricing=this.props.location.state.data[valueOfArray].myprop_pricing;
    let cleanFee=this.props.location.state.data[valueOfArray].cleanFee;
    let imagename=this.props.location.state.data[valueOfArray].imagename
    let arrive_date=this.props.location.state.data[valueOfArray].arrive_date;
    let checkout_date=this.props.location.state.data[valueOfArray].checkout_date;
    let oneday=24*3600*1000;
    let diff=Math.abs(this.props.location.state.checkout_date -this.props.location.state.arrive_date);
    var numberOfDays=(Math.round(diff)/(oneday) );
    console.log("Diff",diff);

    console.log("Days: ",numberOfDays)

    console.log("Finding owner of the property",owner_id);
    
    
    // axios.post('http://localhost:3001/download/'+imagename)
    //             .then(response =>
    //             {
    //                // console.log("Imgae Res : ",response);
    //                 let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    
    //                 this.setState({
    //                     imageView: this.state.imageView.concat(imagePreview)
    //                 })
    //             });
    
    
    
    
    return(
        <div>
             <div className="row" style={{ 'height': '10px' ,'margin':'30px'}}>
                    <div style={{'top':'0','left':'0','position':'absolute'}}>
                        <img src="img/HomeAwayLogo.png" alt="HomeAway" ></img>
                    </div>
                    <div style={{'top':'0','right':'0%','float':'right','padding-left':'1200px','position':'absolute',}}>
                        <img src="img/HomeAwayHouseLogo.png" alt="HomeAway" ></img>
                    </div>
            </div>
            <div className="col-md-12" style={{'height':'1600px','background-color':'rgb(248, 249, 250)'}}>
            <div className="row" style={{'height':'20px'}}></div>
                <div className="col-md-7 col-md-offset-4" style={{'background-color':'rgb(248, 249, 250)','height':'400px','margin-top':'10px','width':'100%'}}>
                {/* <img src={this.state.imageView} style={{'width':'100%'}}></img> */}
                <Photo imagePreview={imagename} />
                    <div className="col-md-4point5" style={{'margin-left':'800px','background-color':'#f8f9fa','height':'1200px !important','margin-top':'10px','display': 'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size': '16px','box-sizing': 'border-box'}}>
                    <Link to="/" style={{'textAlign':'right','marginLeft':'1100px','marginTop':'50px'}}>Go Home Page</Link>
                    <div style={{'display': 'flex','flex-direction': 'column','min-height': '88px','position': 'relative','box-sizing': 'border-box','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size': '16px','font-size': '25px','margin-top': '75px'}}>
                        <p >Price per day : ${prop_pricing}</p>
                        <p>Cleaning Fee : ${cleanFee}</p>
                        <p>Tax : ${0.15 * prop_pricing + cleanFee}</p>
                    </div>
                    <br/>
                        <div style={{'margin-bottom': '8px','background-color': '#fff','border': '1px solid #d3d8de','border-radius': '4px','display': 'block'}}>
                            <div style={{'display':'flex','-webkit-box-orient': 'horizontal','-webkit-box-direction': 'normal','flex-direction': 'row','box-sizing': 'border-box','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size':'16px'}}>
                                <input type="date"  placeholder="Arrive" value={this.props.location.state.arrive_date} style={{'height':'50px','width': '100%','margin': '0','-webkit-box-flex': '4','flex': '4','position': 'relative','display': 'block','font-size': '20px'}} />
                                <input type="date"  placeholder="Depart" value={this.props.location.state.checkout_date} style={{'height':'50px','width': '100%','margin': '0','-webkit-box-flex': '4','flex': '4','position': 'relative','display': 'block','font-size': '20px'}} />
                            </div>
                            <div style={{'display': 'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size': '16px'}}>
                                <input type="text" size="10" placeholder="Guests" value={this.props.location.state.guests} style={{'height':'50px','width':'100%','display': 'block','outline': '0px','position': 'relative','box-sizing': 'border-box','font-size': '20px'}} />
                            </div>
                        </div>
                    <div style={{'display': 'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size': '25px','margin-top':'40px'}}>
                        Total: ${prop_pricing + cleanFee + 0.15 * prop_pricing + cleanFee} 
                    </div> 

                    <div style={{'background-color': 'transparent','bottom':'0','height':'68px','padding': '10px 0','z-index': '1','border-color': '#d3d8de','display':'block','text-align':'center','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','margin-top':'40px'}}>
                        <Link to="/" style={{'text-decoration':'none'}}><input type="submit" value="Book Now" onClick={this.bookedSubmit} style={{'min-height': '48px','display': 'block','width': '100%','position': 'relative','background-color': '#0067db','border-color': '#0067db','color': '#fff','text-shadow': 'none','line-height': '24px','margin-bottom': '0','font-weight': '400','text-align': 'center','vertical-align': 'middle','touch-action': 'manipulation','cursor': 'pointer','background-image': 'none','border': '1px solid transparent','white-space': 'nowrap','padding': '11px 32px','font-size': '1rem'}} /></Link>
                    </div>

            <div style={{'background-color': 'transparent','bottom':'0','height':'68px','padding': '10px 0','z-index': '1','border-color': '#d3d8de','display':'block','text-align':'center','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','margin-top':'40px'}}>
                        

      <div style={styles}>
        
        <button onClick={this.openModal} style={{'min-height': '48px','width': '40%','position': 'relative','backgroundColor': '#f4a742','borderColor': '#f4a742','color': '#fff','text-shadow': 'none','line-height': '24px','margin-bottom': '0','font-weight': '400','text-align': 'center','cursor': 'pointer','border': '1px solid transparent','padding': '11px 32px','font-size': '1rem'}}>Have a Question? Ask here</button>
        <Modal open={open} onClose={this.closeModal} center>
          <h2 style={{'marginTop':'50px','marginBottom':'25px'}}>Get answer to your Queries</h2>
          <div style={{'horizontalAlign':'middle'}}>
          <span style={{'display':'block'}}>               
                            <input type="text" placeholder="What is it about?" onChange={this.questionHeadlineHandler} style={{'margin-bottom':'10px','width': '100%','height': '44px','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}/>
        </span>

            <span style={{'display':'block'}}>
                            <textarea onChange={this.questionDescriptionHandler} placeholder="Tell us more about your query" rows="5" cols="10" style={{'margin-bottom':'10px','width': '100%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}></textarea>
            </span>


            <span style={{'justifyContent':'center','display':'flex'}}>
            <input type="submit" value="Not Now" onClick={this.closeModal} style={{'vertical-align':'middle','width':'40%','height':'44px','background-color':'light-grey','border-color':'light-grey','font-size':'18px','color':'black','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>
            <input type="submit"  value="Send" onClick={this.sendQuestion}  style={{'margin-left':'5px','vertical-align':'middle','width':'40%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center','cursor':'pointer'}}/>

            </span>

          </div>
        </Modal>
      </div>


                    </div>  
                    
                    </div>
                </div>

                <div className="col-md-7" style={{'background-color':'#f8f9fa','height':'1000px','margin-top':'10px','padding-top':'10px'}}>
                    <h1 style={{'font-size': '1.5rem','line-height': '2rem','color': '#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','margin': '.67em 0','display': 'block'}}>{prop_location}</h1>
                    
                    <h3 style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>{prop_headline}</h3>
                    <p style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>{prop_description}</p>

                    <h3 style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>Details</h3>
                    <p style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>
                    <ul style={{'list-style':'none','padding-top': '20px','display': 'block','list-style-type': 'disc','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','padding-inline-start': '40px'}}>

                    <li style={{'display':'inline','margin-left':'50px','padding-bottom': '16px'}}>Type: {prop_type}</li>
                    <li style={{'display':'inline','margin-left':'50px','padding-bottom': '16px'}}>Sleeps: {prop_accomodates}</li>
                    <li style={{'display':'inline','margin-left':'50px','padding-bottom': '16px'}}>Bedrooms: {prop_bedrooms}</li>  
                    <li style={{'display':'inline','margin-left':'50px','padding-bottom': '16px'}}>Bathrooms: {prop_bathrooms}</li> 

                    </ul>
                    </p>
                    <h3 style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>Amenities</h3>
                    <p style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>
                    <ul style={{'list-style':'none','padding-top': '20px','display': 'block','list-style-type': 'disc','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','padding-inline-start': '40px'}}>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Internet</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Washer and Dryer</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>TV</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Parking</li>
                        </ul>
                    </p>


                    <h3 style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>Theme</h3>
                    <p style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>
                    <ul style={{'list-style':'none','padding-top': '20px','display': 'block','list-style-type': 'disc','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','padding-inline-start': '40px'}}>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Romantic</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Historic</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Family</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Tourist Attractions</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Budget</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Adventure</li>
                        <li style={{'margin-left':'50px','padding-bottom': '16px'}}>Sports and Activities</li>
                    </ul>
                    </p>


                    
                   
                </div>
                
            </div>
            



        </div>
    )
}    
}

const mapStateToProps=state=>({
    log:state.log,
    listProperty:state.listProperty,
    search:state.search
});

export default connect(mapStateToProps)(DisplayProperty);