import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

import cookie from 'react-cookies';
// import Redirect from 'react-router';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class DisplayProperty extends Component{

    constructor(props){
        super(props);

        this.state={
            myprop_id:"",
            bookCheckin_date:"",
            bookCheckout_date:"",
            userid:"",
            isBooked:false
        }

        this.bookedSubmit=this.bookedSubmit.bind(this);

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
        const data={
            myprop_id:this.props.location.state.data[this.props.location.state.value].id,
            bookCheckin_date:this.props.location.state.arrive_date,
            bookCheckout_date:this.props.location.state.checkout_date
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/book',data)
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

render(){

    let prop_location=this.props.location.state.data[this.props.location.state.value].myprop_location;
    let prop_headline=this.props.location.state.data[this.props.location.state.value].myprop_headline;
    let prop_description=this.props.location.state.data[this.props.location.state.value].myprop_description;
    let prop_type=this.props.location.state.data[this.props.location.state.value].myprop_type;
    let prop_bedrooms=this.props.location.state.data[this.props.location.state.value].myprop_bedrooms;
    let prop_accomodates=this.props.location.state.data[this.props.location.state.value].myprop_accomodates;
    let prop_bathrooms=this.props.location.state.data[this.props.location.state.value].myprop_bathrooms;
    let prop_pricing=this.props.location.state.data[this.props.location.state.value].myprop_pricing;
    let cleanFee=this.props.location.state.data[this.props.location.state.value].cleanFee;
    let arrive_date=this.props.location.state.data[this.props.location.state.value].arrive_date;
    let checkout_date=this.props.location.state.data[this.props.location.state.value].checkout_date;
    let oneday=24*3600*1000;
    let diff=Math.abs(this.props.location.state.checkout_date -this.props.location.state.arrive_date);
    var numberOfDays=(Math.round(diff)/(oneday) );
    console.log("Diff",diff);

    console.log("Days: ",numberOfDays)
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
                <img src="/img/test.jpg" style={{'width':'100%'}}></img>
                    <div className="col-md-4point5" style={{'margin-left':'800px','background-color':'#f8f9fa','height':'1200px !important','margin-top':'10px','display': 'block','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size': '16px','box-sizing': 'border-box'}}>
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
                        <li >Romantic</li>
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

export default DisplayProperty;