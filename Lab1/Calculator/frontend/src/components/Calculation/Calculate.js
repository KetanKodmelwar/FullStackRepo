import React,{Component} from 'react';
import '../../App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import App from '../../App';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Calculate extends Component{
    constructor(props){
        super(props);

        this.state={
            calc:[]
        }

        this.variableHandler=this.variableHandler.bind(this);
        this.additionHandler=this.additionHandler.bind(this);
        this.subtractionHandler=this.subtractionHandler.bind(this);
        this.multiplicationHandler=this.multiplicationHandler.bind(this);
        this.divisionHandler=this.divisionHandler.bind(this);
        // this.calculation=this.calculation.bind(this);
        this.submitCalculation=this.submitCalculation.bind(this);
        this.clearField=this.clearField.bind(this);

    }
        variableHandler=(e)=>{
            this.setState({
                calc:e.target.value
            })
        }

        additionHandler=(e)=>{
            e.preventDefault();
            // var newArray=[...this.state.calc,'+'];
            // console.log("Clicking +");
            // newArray=newArray.join("");
            // this.setState({
            //         calc:[...this.state.calc,newArray]
            // })
            console.log(this.state.calc);
            this.setState({
                calc:[this.state.calc + "+"]
            })
            console.log(this.state.calc)
           // document.getElementById("textbx").appendChild('+');
        //    ReactDOM.render(<App />,document.getElementById("textbx").value+='+')
            
        }

        subtractionHandler=(e)=>{
             e.preventDefault();
            // var newArray=[...this.state.calc,'-'];
            // console.log("Clicking -");
            // newArray=newArray.join("");
            // this.setState({
            //         calc:[...this.state.calc,newArray]
            // })
            // document.getElementById("textbx").appendChild('-');
            console.log(this.state.calc);
            this.setState({
                calc:[this.state.calc + "-"]
            })
            console.log(this.state.calc)
        }

        multiplicationHandler=(e)=>{
            e.preventDefault();
            // var newArray=[...this.state.calc,'*'];
            // console.log("Clicking *");
            // newArray=newArray.join("");
            // this.setState({
            //         calc:[...this.state.calc,newArray]
            // })
            // document.getElementById("textbx").appendChild('*');
            console.log(this.state.calc);
            this.setState({
                calc:[this.state.calc + "*"]
            })
            console.log(this.state.calc)
        }

        divisionHandler=(e)=>{
            e.preventDefault();
            // var newArray=[...this.state.calc,'/'];
            // console.log("Clicking /");
            // newArray=newArray.join("");
            // this.setState({
            //         calc:[...this.state.calc,newArray]
            // })
            // document.getElementById("textbx").appendChild("/");
            console.log(this.state.calc);
            this.setState({
                calc:[this.state.calc + "/"]
            })
            console.log(this.state.calc)
        }


       clearField = (e)=>{
           console.log("Clearing");
        document.getElementById("textbx").value="";
       }

        submitCalculation=(e)=>{
            e.preventDefault();
            const data={
                calculate:this.state.calc
            }
            console.log("GOing",data);
            console.log("Before",data);
            
            axios.post('http://localhost:3001/calculation',data)
            .then(response => {
                
                console.log("Status Code : ",response.status);
                console.log(response);
                if(response.data==='Infinity'){
                    document.getElementById("textbx").value="Divide by zero error.Please enter a right value";    
                }else if(response.data==='undefined' ){
                    document.getElementById("textbx").value="Please enter a proper value";
                }else{
                    document.getElementById("textbx").value=response.data;
                    }
                
                
            });
            
           
    }

    render()
    {
        return (
            <div className="container">
            <div className="main-div">
             <div className="calc-form">
             <form>
                        <div className="panel">
                            <h1>CALCULATOR</h1>
                            <p>Perform your calculation</p>
                        </div>
                        
                            <div className="form-group">
                                <input onChange={this.variableHandler} type="text" value={this.state.calc} className="form-control" id="textbx" name="digitText"  placeholder="Please enter the digits" style={{'width':'500px'}}/>
                            </div>
                            <div className="form-group"> 
                                <button onClick={this.additionHandler} className="btn btn-primary">ADD</button>
                                <button onClick={this.subtractionHandler} className="btn btn-primary">SUBTRACT</button>
                            </div>
                            <div className="form-group">                     
                                <button onClick={this.multiplicationHandler} className="btn btn-primary">MULTIPLY</button>
                                <button onClick={this.divisionHandler} className="btn btn-primary">DIVIDE</button>
                            </div>
                            <div className="form-group">
                                <button onClick={this.submitCalculation} className="btn btn-submit" type="submit">Calculate</button>
                                <button onClick={this.clearField} className="btn btn-submit" type="submit" id="clear">Clear</button>
                            </div>
                </form>
                  </div>
                  </div>
                </div>
            
        )
    }
}
export default Calculate;