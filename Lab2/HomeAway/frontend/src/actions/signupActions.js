import axios from 'axios';
import {SIGNUP} from './index';
import {GET_ERRORS} from './index';
import {Redirect} from 'react-router';


export const signupUser=(userData,history) => dispatch => {
        axios.post('http://localhost:3001/routeapi/users/signup',userData)
                .then(response =>{
                        dispatch({
                                type:SIGNUP,
                                payload:userData
                        })
                    console.log("Status Code: ",response.status);
                    console.log(response);
                    alert("Signed up successfully");
                   history.push('/login');     
                })

                .catch(err=>
                        dispatch({
                                type:GET_ERRORS,
                                payload:err.response.data
                        })
                );
               
};


