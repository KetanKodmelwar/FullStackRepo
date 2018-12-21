import React, {Component} from 'react';
import '../../App.css';

import axios from 'axios';

import cookie from 'react-cookies';
import {Redirect} from 'react-router';

import {Link} from 'react-router-dom';
import SearchResult from '../SearchResult/SearchResult';
import LogOrNot from '../LogOrNot/LogOrNot.js';
import ListOrNot from '../ListOrNot/ListOrNot.js';



class Home extends Component{

    constructor(props)
        {
            super(props);
            this.state={
              // loc_search:'',
              // arrive_date:'',
              // checkout_date:'',
              // guests:'',
              // data:[],
              mydata:{loc_search:null,arrive_date:null,checkout_date:null,guests:null},
              bookedData:[]

            }

            this.loc_searchHandler=this.loc_searchHandler.bind(this);
            this.arrive_dateHandler=this.arrive_dateHandler.bind(this);
            this.checkout_dateHandler=this.checkout_dateHandler.bind(this);
            this.guestsHandler=this.guestsHandler.bind(this);
            
        }

loc_searchHandler = (e)=>{
  let mydata={...this.state.mydata}
    mydata.loc_search=e.target.value
    mydata.arrive_date=null
    mydata.checkout_date=null
    mydata.guests=null
  this.setState({
    mydata
    //loc_search:e.target.value
  })
}

arrive_dateHandler = (e)=>{
  let mydata={...this.state.mydata}
  mydata.arrive_date=e.target.value
  mydata.checkout_date=null
    mydata.guests=null
  this.setState({
    mydata
    //arrive_date:e.target.value
  })
}

checkout_dateHandler = (e)=>{
  let mydata={...this.state.mydata}
  mydata.checkout_date=e.target.value
    mydata.guests=null

  this.setState({
    mydata
    //checkout_date:e.target.value
  })
}

guestsHandler = (e)=>{
  let mydata={...this.state.mydata}
  mydata.guests=e.target.value
  this.setState({
    mydata
    //guests:e.target.value
  })
}

handleLogout = (e)=>{
  // cookie.remove('cookie', { path: '/' });
  //e.preventDefault();
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


// submitSearch = (e) => {
//   // var headers = new Headers();
//    //prevent page from refresh
//    //e.preventDefault();
//    const data = {
//        loc_search:this.state.mydata.loc_search,
//        arrive_date:this.state.mydata.arrive_date,
//        checkout_date:this.state.mydata.checkout_date,
//        guests:this.state.mydata.guests
//    }
//    //set the with credentials to true
//    axios.defaults.withCredentials = true;
//    //make a post request with the user data
//    axios.post('http://localhost:3001/search',data)
//        .then(response => {
//            console.log("Status Code : ",response.status);
//            if(response.status === 200){
//                console.log("Search transferred",response.data);
//               //  this.setState({
//               //    data:[response.data]
//               //  })
             
//                console.log("Data from state: ",this.state.mydata);
//               //  this.props.callbackFromParent(this.state.data);
               
               
               
//            }})
//        .catch(response =>{
//            console.log("Status code: ",response.status);

//            console.log('Search not transferred');
//        })    
               
           
       
// }

// componentWillUnmount(){
//   this.submitSearch
// }

// submitSearch= (e) =>{
//   //e.preventDefault();
    

//   console.log("Home: ",this.state.mydata);
// }

componentDidMount(){

  axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.post('http://localhost:3001/seebooked')
      .then(response => {
          console.log("Status Code : ",response.status);
          if(response.status === 200){
              console.log("Bookings shown",response.data);
              this.setState({
                bookedData:response.data
            })
             
            
           //    console.log("Data from state: ",this.state.mydata);
             //  this.props.callbackFromParent(this.state.data);
              
              
              
          }})
      .catch(response =>{
          console.log("Status code: ",response.status);

          console.log('Search not transferred');
      }) 

}
render(){
 let details=this.state.bookedData.map((kkdata,i) =>{
    return (
        <div className="searchRows" >
        <div className="row" style={{'background-color':'#f5f5f0'}}>
        <div className="col-md-2" style={{'margin':'0px'}}>
                       
                        
                        </div>
            <div className="col-md-4" style={{'margin-left':'150px','float':'right'}}>    
                        <div>
                                <span style={{'margin-bottom': '16px','font-size': '1.125rem','line-height': '1.625rem','color':'#323f4d','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','font-weight': '700','display':'block','margin-block-start':'1em','margin-block-end':'1em','margin-inline-start': '0px','box-sizing': 'border-box'}}>{kkdata.myprop_headline}</span>
                                <span style={{'margin': '0 0 16px','line-height': '1.5rem','display': 'block','margin-block-start': '1em','margin-block-end': '1em','margin-inline-start': '0px','margin-inline-end': '0px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','color': '#5e6d77','font-size': '16px'}}>{kkdata.myprop_type} . {kkdata.myprop_bedrooms}BR . {kkdata.myprop_bathrooms}BA . Sleeps {kkdata.myprop_accomodates}  </span>

                        </div>
                            <div style={{'background': '#f6f7f8','height': '45px','display': 'flex','flex-flow': 'row nowrap','align-items': 'flex-end','width': '100%','padding': '8px 12px','font-family': 'Lato,Roboto,Arial,Helvetica Neue,Helvetica,sans-serif','line-height': '1.5rem','font-size': '16px'}}>
                                <span> ${kkdata.myprop_pricing} per night</span>
                            </div>    
                    </div>
                </div>
        </div>
    )
})
  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" style={{'position':'absolute'}}>
        <div className="container">
            {/* <a className="navbar-brand js-scroll-trigger" href="#page-top">HomeAway</a>  */}
            <div style={{'top':'0','left':'0','position':'absolute'}}>
                        <img src="img/HomeHomeAway2.png" alt="HomeAway" ></img>
                    </div>
             <div style={{'top':'0','right':'0%','position':'absolute'}}>
                        <img src="img/HomeBirdLogo.png" alt="HomeAway" ></img>
            </div> 
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/"><a className="nav-link js-scroll-trigger" href="#about" style={{'color': 'white','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif','text-align': 'center','outline': '0','display': 'block','line-height': '24px','padding': '10px 15px','background': 'transparent'}}>Trip Boards</a></Link>
                </li>
                <li className="nav-item"> 
                
                {/* <Link to="/login"><a className="nav-link js-scroll-trigger"  href="#" style={{'color': 'white','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif','text-align': 'center','outline': '0','display': 'block','line-height': '24px','padding': '10px 15px','background': 'transparent'}}>Login</a></Link> */}
                <a className="nav-link js-scroll-trigger"  href="#" style={{'color': 'white','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif','text-align': 'center','outline': '0','display': 'block','line-height': '24px','padding': '10px 15px','background': 'transparent'}}><LogOrNot></LogOrNot></a>
                </li>
                <li className="nav-item">
                  <Link to="/profile"><a className="nav-link js-scroll-trigger" href="#" style={{'color': 'white','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif','text-align': 'center','outline': '0','display': 'block','line-height': '24px','padding': '10px 15px','background': 'transparent'}}>Notifications</a></Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/" onClick={this.handleLogout} ><a className="nav-link js-scroll-trigger" href="#"  style={{'color': 'white','font-family': '"Roboto",Arial,"Helvetica Neue",Helvetica,sans-serif','text-align': 'center','outline': '0','display': 'block','line-height': '24px','padding': '10px 15px','background': 'transparent'}}>Logout</a></Link>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#" ><ListOrNot></ListOrNot></a>
                </li>
              </ul>
          </div>
        </div>
      </nav>

          <header className="masthead text-center text-white d-flex">
              <div className="container my-auto">
                <div className="row">
                  <div className="col-lg-10 mx-auto">
                    <h1>
                      <p style={{'display': 'block','font-size': '40px','font-weight': '400','letter-spacing':'.1px','text-align': 'left','line-height':'normal','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','padding-right':'200px'}}>Book beach houses, cabins,</p>
                      <p style={{'display': 'block','font-size': '40px','font-weight': '400','letter-spacing':'.1px','text-align': 'left','line-height':'normal','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','padding-right':'200px'}}>condos and much more</p>
                    </h1>
                    
                  </div>
                  <div style={{'padding-left': '100px','box-shadow': 'none','display': 'flex','width': '100%','border-radius': '3px','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','line-height': '1.5rem','color': '#5e6d77','font-size': '16px',}}>
                      <input type="text" size="25" onChange={this.loc_searchHandler} placeholder="Where do you want to go?" style={{'margin-right':'20px','width': '37%','background-size': '0 3px','background-position':'bottom,center 99%','padding-left': '48px','background': 'transparent','width': '60%','text-overflow': 'ellipsis','overflow': 'hidden','padding-right': '48px','font-weight': '500','display':'block','height': '56px','padding': '15px 16px','border': '1px solid #d3d8de','background-color': '#fff'}} />
                      <input type="date" size="10" onChange={this.arrive_dateHandler} placeholder="Arrive" style={{'margin-right':'20px','width': '37%','background-size': '0 3px','background-position':'bottom,center 99%','padding-left': '48px','background': 'transparent','width': '40%','text-overflow': 'ellipsis','overflow': 'hidden','padding-right': '48px','font-weight': '500','display':'block','height': '56px','padding': '15px 16px','border': '1px solid #d3d8de','background-color': '#fff'}} />
                      <input type="date" size="10" onChange={this.checkout_dateHandler} placeholder="Depart" style={{'margin-right':'20px','width': '37%','background-size': '0 3px','background-position':'bottom,center 99%','padding-left': '48px','background': 'transparent','width': '40%','text-overflow': 'ellipsis','overflow': 'hidden','padding-right': '48px','font-weight': '500','display':'block','height': '56px','padding': '15px 16px','border': '1px solid #d3d8de','background-color': '#fff'}} />
                      <input type="text" size="10" onChange={this.guestsHandler} placeholder="Guests" style={{'margin-right':'20px','width': '37%','background-size': '0 3px','background-position':'bottom,center 99%','padding-left': '48px','background': 'transparent','width': '20%','text-overflow': 'ellipsis','overflow': 'hidden','padding-right': '48px','font-weight': '500','display':'block','height': '56px','padding': '15px 16px','border': '1px solid #d3d8de','background-color': '#fff'}} />
                      {/* <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Search</a> */}
                      <Link to={{pathname:"/searchResult",state:{mydata:this.state.mydata}, target:"_blank"}} style={{ 'textDecoration': 'none' }}><input onClick={this.submitSearch} type="submit" value="Search" style={{'display':'block','color': 'white','border-color': '#005dc5','background-color': '#005dc5','min-height': '48px','position': 'relative','border-radius': '100px','box-shadow': 'none','font-weight': '400','text-align': 'center','vertical-align': 'middle','padding': '11px 32px'}}/></Link>                     
                      
                  </div>
                 
                </div>
                
              </div>
          </header>

          

          <section id="services">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading">Your Booked Properties</h2>
                  <hr className="my-4"/>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
               {details}
              <div className="col-lg-3 col-md-6 text-center">
                
            </div>
        </div>
    </div>
    </section>


     <section id="services">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading">Your Owned Properties</h2>
                  <hr className="my-4"/>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
               
              <div className="col-lg-3 col-md-6 text-center">
                
            </div>
        </div>
    </div>
    </section>

   

    

    <section id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h2 className="section-heading">Let's Get In Touch!</h2>
          <hr className="my-4" />
          
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 ml-auto text-center">
          <i className="fas fa-phone fa-3x mb-3 sr-contact-1"></i>
          <p>123-456-6789</p>
        </div>
        <div className="col-lg-4 mr-auto text-center">
          <i className="fas fa-envelope fa-3x mb-3 sr-contact-2"></i>
          <p>
            <a href="mailto:your-email@your-domain.com">feedback@homeaway.car</a>
          </p>
        </div>
      </div>
    </div>
    </section>


<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<script src="vendor/jquery-easing/jquery.easing.min.js"></script>
<script src="vendor/scrollreveal/scrollreveal.min.js"></script>
<script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>

<script src="js/creative.min.js"></script>

</div>
        
    )
}

}

export default Home;