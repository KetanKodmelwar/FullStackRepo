import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class ListOrNot extends Component{

    constructor(props){
        super(props);

        this.state={
            isOwner:""
        }
    }

    componentDidMount(){
        axios.post('http://localhost:3001/isauth')
           .then(response => {
               console.log("Status Code : ",response.status);
               if(response.status === 200){
                   console.log("Logs transferred for authorization",response.data);
                
                  if(response.data[0].isOwner==="no"){
                      this.setState({
                        isOwner:"no"                     
                      })
                  }else{
                      this.setState({
                        
                        
                        isOwner:"yes"
                        
    
                      })
                  }
                   
                   
               }})
           .catch(response =>{
               console.log("Status code: ",response.status);
    
               console.log('Authorization not done');
           })    
    
      }    
      
render(){
    if(this.state.isOwner==="yes"){
        return(
            <div>
                <Link to="/ListMyproperty"><a className="nav-link js-scroll-trigger" href="#" style={{'background-color': '#fff','color': '#0067db','border-color': '#fff','min-height': '48px','display': 'unset','border-radius': '40px','font-size': '14px','margin': '0 15px','padding': '12px 40px','font-weight': '400','text-align': 'center','vertical-align': 'middle','cursor': 'pointer','background-image': 'none','border': '1px solid transparent','font-family': 'Lato,Arial,Helvetica Neue,sans-serif','box-sizing': 'border-box','text-transform':'none'}}>List Your Property</a></Link>
                </div>
        )

    }else{
        return(
            <div>
                </div>
        )
        
    }
}
    
}

export default ListOrNot;