import axios from 'axios';
import {OWNER_SIGNUP} from './index';
import {GET_ERRORS} from './index';
import {Redirect} from 'react-router';


export const ownersignupUser=(userData,history) => dispatch => {
        axios.post('http://localhost:3001/routeapi/owners/ownersignup',userData)
                .then(response =>{
                        dispatch({
                                type:OWNER_SIGNUP,
                                payload:userData
                        })
                    console.log("Status Code: ",response.status);
                    console.log(response);
                    alert("Signed up successfully");
                   history.push('/ownerlogin');     
                })

                .catch(err=>{
                        dispatch({
                                type:GET_ERRORS,
                                payload:err.response.data
                        })
                })
               
};


