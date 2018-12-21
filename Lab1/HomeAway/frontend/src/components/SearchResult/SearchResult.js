import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import MyIndex from '../MyIndex.js';
import Home from '../Home/Home.js';
import {requestPageofPlans} from 'actions';


class SearchResult extends Component{

        constructor(props){
            super(props);

            this.state={
                data:[],
                imageView:"",
                isAuth:""
              
                
            }

            // console.log("Data in search",this.props.dataFromParent);
            console.log('Data from searchResult: ',this.props);
            
            
           if(this.props.location.state===undefined){
               return <Redirect to="/login" />
           }else{
               const {mydata}=props.location.state;
            console.log(mydata);
           }
            
            this.getPhoto=this.getPhoto.bind(this);
            
        }


        getPhoto = (e) =>{
            axios.post('http://localhost:3001/download/'+'test.jpg')
        .then(response => {
            console.log("Imgae Res : ",response);
            let imagePreview = 'data:image/jpg;base64, ' + response.data;
            this.setState({
                imageView: imagePreview
            })
        });
        }

componentWillMount(){
    this.setState({
        isAuth:true
    })
}


 componentDidMount(){
     this.getPhoto();

    let mylocation=this.props.location.state.mydata.loc_search;
    let myarrive_date=this.props.location.state.mydata.arrive_date;
    let mycheckout_date=this.props.location.state.mydata.checkout_date;
    let myguests=this.props.location.state.mydata.guests;

   const data = {
       loc_search:mylocation,
       arrive_date:myarrive_date,
       checkout_date:mycheckout_date,
       guests:myguests
   }
   //set the with credentials to true
   axios.defaults.withCredentials = true;
   //make a post request with the user data
   axios.post('http://localhost:3001/search',data)
       .then(response => {
           console.log("Status Code : ",response.status);
           if(response.status === 200){
               console.log("Checing response",response);
               if(response.data=="Inactive"){
                   this.setState({
                       isAuth:false
                   })
               }else{
                console.log("Search transferred",response.data);
                let x=response.data;
                this.setState({
                    data:response.data
                })
               console.log("After",this.state.data);
               }
             
            //    console.log("Data from state: ",this.state.mydata);
              //  this.props.callbackFromParent(this.state.data);
               
               
               
           }})
       .catch(response =>{
           console.log("Status code: ",response.status);

           console.log('Search not transferred');
       })    
 }       

render(){
    if(!this.state.isAuth){
        return <Redirect to="/login" />
    }
    
    let mylocation=this.props.location.state.mydata.loc_search;
    let myarrive_date=this.props.location.state.mydata.arrive_date;
    let mycheckout_date=this.props.location.state.mydata.checkout_date;
    let myguests=this.props.location.state.mydata.guests;
    let details=this.state.data.map((kkdata,i) =>{
        return (
            <div className="searchRows" >
            <div className="row">
            
            <Link to={{pathname:"/displayProperty",state:{data:this.state.data,value:i,guests:myguests,arrive_date:myarrive_date,checkout_date:mycheckout_date}, target:"_blank"}} style={{ textDecoration: 'none' }}><div className="col-md-2" style={{'margin':'0px'}}>
                            <div >
                            <img src={this.state.imageView} style={{'width':'100%','height':'100%'}} />
                            </div>
                            </div>
                <div className="col-md-6" style={{'margin-left':'150px','float':'right'}}>    
                            <div>
                                    <span style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>{kkdata.myprop_headline}</span>
                                    <span style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>{kkdata.myprop_type} . {kkdata.myprop_bedrooms}BR . {kkdata.myprop_bathrooms}BA . Sleeps {kkdata.myprop_accomodates}  </span>

                            </div>
                                <div style={{'background': '#f6f7f8','height': '45px','display': 'flex','flex-flow': 'row nowrap','align-items': 'flex-end','width': '100%','padding': '8px 12px','font-family': 'Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif','line-height': '1.5rem','font-size': '16px'}}>
                                    <span> ${kkdata.myprop_pricing} per night</span>
                                </div>    
                        </div></Link> 
                    </div>
            </div>
        )
    })
   

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
            <div className="row" style={{'padding-left': '100px','box-shadow': 'none','display': 'flex','width': '100%','border-radius': '3px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size': '16px',}}>
                    <input type="text"  placeholder="Where do you want to go?" value={this.state.data.myprop_location} style={{'margin-right':'20px','margin-bottom':'10px','width': '25%','background-size': '0 3px','background-position':'bottom,center 99%','padding-left': '10px','background': 'transparent','text-overflow': 'ellipsis','overflow': 'hidden','padding-right': '48px','font-weight': '500','display':'block','height': '56px','padding': '15px 16px','border': '1px solid #d3d8de','background-color': '#fff'}} />
                      <input type="date"  placeholder="Arrive" value={this.state.data.arrive_date} style={{'margin-right':'20px','margin-bottom':'10px','width': '20%','background-size': '0 3px','background-position':'bottom,center 99%','padding-left': '48px','background': 'transparent','text-overflow': 'ellipsis','overflow': 'hidden','padding-right': '20px','font-weight': '500','display':'block','height': '56px','padding': '15px 16px','border': '1px solid #d3d8de','background-color': '#fff'}} />
                      <input type="date"  placeholder="Depart" value={this.state.data.checkout_date} style={{'margin-right':'20px','margin-bottom':'10px','width': '20%','background-size': '0 3px','background-position':'bottom,center 99%','padding-left': '48px','background': 'transparent','text-overflow': 'ellipsis','overflow': 'hidden','padding-right': '48px','font-weight': '500','display':'block','height': '56px','padding': '15px 16px','border': '1px solid #d3d8de','background-color': '#fff'}} />
                      <input onClick={this.submitSearch} type="submit" value="Search" style={{'display':'block','color': 'white','border-color': '#005dc5','background-color': '#005dc5','min-height': '48px','position': 'relative','border-radius': '100px','box-shadow': 'none','font-weight': '400','text-align': 'center','vertical-align': 'middle','padding': '11px 32px'}}/>
            </div>
            
            

            <div className="row" >
                <div >
                        
                        <div className="col-md-6" style={{'margin-left':'150px'}}>    
                            {/* <div>
                                    <span style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>Property Headline</span>
                                    <span style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>Property information {details}</span>

                            </div>
                                <div style={{'background': '#f6f7f8','height': '64px','display': 'flex','flex-flow': 'row nowrap','align-items': 'flex-end','width': '150%','padding': '8px 12px','font-family': 'Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif','line-height': '1.5rem','font-size': '16px'}}>
                                    <span> Price per night</span>
                                </div>     */}
                                {details}
                        </div>        
                        
                        {/* <div className="col-md-2">
                            Photos here
                            
                            </div>
                        <div className="col-md-6" style={{'margin-left':'150px'}}>    
                            <div>
                                {this.state.data.map((data,index)=>(
                                    <p key={index}><span style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>Property Headline {data.myprop_headline}
                                    
                                    </span></p>
                                ))}
                                    <span style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>Property Headline</span>
                                    <span style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>Property information </span>

                            </div>
                                <div style={{'background': '#f6f7f8','height': '64px','display': 'flex','flex-flow': 'row nowrap','align-items': 'flex-end','width': '150%','padding': '8px 12px','font-family': 'Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif','line-height': '1.5rem','font-size': '16px'}}>
                                    <span> Price per night</span>
                                </div>    
                        </div>     */}

                </div>

            </div>

        </div>
        
    )
}

}

export default SearchResult;