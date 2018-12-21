import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logOut} from '../../actions/loginActions';
import {Accordion,AccordionItem,AccordionItemTitle,AccordionItemBody} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';



class Messages extends Component{
        constructor(props){
            super(props);

            this.state={
                data:[],
                answer:""
            }
            
            
            this.submitAnswer=this.submitAnswer.bind(this);
            this.answerHandler=this.answerHandler.bind(this);
        }

        componentDidMount=(e)=>{

            if(this.props.log.user.isOwner==="no"){

                axios.post('http://localhost:3001/routeapi/QandA/getQuestionsandAnswers')
                .then(response=>{
                    console.log("Response received",response.data);
                    this.setState({
                        data:response.data
                    })
                    console.log("state data",this.state.data);
                })

            }else{
                axios.post('http://localhost:3001/routeapi/QandA/getQuestions')
                .then(response=>{
                    console.log("Response received",response.data);
                    this.setState({
                        data:response.data
                    })
                    console.log("state data",this.state.data);
                })
            }
            

        }
  
        answerHandler=(e)=>{
            this.setState({
                answer:e.target.value
            })
          }
     
  
       

        submitAnswer=id=>(e)=>{
            
            
            const i=id;
            console.log("Am i getting the value of id ",i);
            const data={
                answer:this.state.answer,
                questionID:this.state.data[i]._id
            }
            console.log("Data to be sent",data);

            axios.post('http://localhost:3001/routeapi/QandA/answer',data)
                .then(response=>{
                    console.log("Status code: ",response.status);
                    if(response.status===200){
                        console.log("Asnwer submitted successfully");
                    alert("Answer submitted successfully");
                        window.location.href('/');
                    }
                })
                .catch(err=>{
                    console.log("Error while sending the answer")
                })



        }
  

render(){
    const {isAuth,user}=this.props.log;

    

    let detailsForTraveller=this.state.data.map((kkdata,i)=>{
        return(
            <div>
               
               <Accordion style={{'marginTop':'20px'}}> 
        <AccordionItem >
        <AccordionItemTitle>
        
        <h3 className="u-position-relative" style={{'font-family': '"Comic Sans MS", cursive, sans-serif'}}>{i+1} {kkdata.questionHeadline}
        <div className="accordion__arrow" role="presentation"/>
        </h3>
        
            </AccordionItemTitle>
            <AccordionItemBody>
                <h4>Question: {kkdata.questionDescription}</h4>
                
                <h4>Answer:  {kkdata.answer}</h4>

            </AccordionItemBody>
        </AccordionItem>
        
    </Accordion>
                
            </div>
        )
    })


    let detailsForOwner=this.state.data.map((kkdata,i)=>{
        return(
            <div>
               
               <Accordion style={{'marginTop':'20px'}}> 
        <AccordionItem >
        <AccordionItemTitle>
        
        <h3 className="u-position-relative" style={{'font-family': '"Comic Sans MS", cursive, sans-serif'}}>{i+1} {kkdata.questionHeadline}
        <div className="accordion__arrow" role="presentation"/>
        </h3>
        
            </AccordionItemTitle>
            <AccordionItemBody>
                <h4>{kkdata.questionDescription}</h4>

                 <div>
                 <textarea id="ta" onChange={this.answerHandler} name="Answer" placeholder="Answer here" rows="5" cols="20" style={{'margin-left':'1px','width': '100%','padding':  '9px 14px','font-size':  '18px','border-radius':  '0px','line-height':  '1.33','margin-top':  '16px'}}></textarea>
                 
                 <input type="submit" onClick={this.submitAnswer(i)}  value="Submit Answer"  style={{'vertical-align':'middle','width':'40%','height':'44px','background-color':'#ff8a00','border-color':'#ff8a00','font-size':'18px','color':'#FFE','padding':' 7px 31px','text-align':'center'}}/>

                </div>
                
            </AccordionItemBody>
        </AccordionItem>    
    </Accordion>
                
            </div>
        )
    })

    if(isAuth===true && this.props.log.user.isOwner==="no")
{
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

              <div className="rowMessage" style={{'backgroundColor':'rgb(248, 249, 250)'}}>
            <div className="columnMessage">
                {detailsForTraveller}
            </div>
            <div className="columnMessage" style={{'marginTop':'100px','backgroundColor':''}}>

                <h2>Not yet Booked a property for vacation. Book it now and avail a discount of upto 50% off</h2>
                <small >Use code:TZA145ZCX</small>
            </div>

             <Link to="/" style={{'text-decoration':'none'}}><input  type="submit" value="Back" style={{'margin-top':'10px','display':'block','color': 'white','border-color': '#2f4f88','background-color': '#2f4f88','min-height': '48px','position': 'relative','border-radius': '100px','box-shadow': 'none','font-weight': '400','text-align': 'center','vertical-align': 'middle','padding': '11px 32px','width':'200px'}}/></Link>   
             </div>     
               
        </div>
    )
}

else if(isAuth===true && this.props.log.user.isOwner==="yes"){
    return(
        <div style={{'marginTop':'70px'}}>
            
            
             <div className="row" style={{ 'height': '10px' ,'margin':'30px'}}>
                    <div style={{'top':'0','left':'0','position':'absolute'}}>
                        <img src="img/HomeAwayLogo.png" alt="HomeAway" ></img>
                    </div>

                    <div style={{'top':'0','right':'0%','float':'right','padding-left':'1200px','position':'absolute',}}>
                        <img src="img/HomeAwayHouseLogo.png" alt="HomeAway" ></img>
                    </div>
            </div>

            <div className="rowMessage" style={{'backgroundColor':'rgb(248, 249, 250)'}}>
            <div className="columnMessage">
                {detailsForOwner}
            </div>
            <div className="columnMessage" style={{'marginTop':'100px','backgroundColor':''}}>

                <h2>Not yet Booked a property for vacation. Book it now and avail a discount of upto 50% off</h2>
                <small >Use code:TZA145ZCX</small>
            </div>

                
             </div>   
            
               
        </div>
    )

}

else{
    return(
        <div>
            
            <Redirect to="/login" />
        </div>
    )
}
}      
}



const mapStateToProps=state=>({
    log:state.log
});


export default connect(mapStateToProps,{logOut})(Messages);