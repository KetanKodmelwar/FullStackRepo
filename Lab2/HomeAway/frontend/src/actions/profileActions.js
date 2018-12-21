import axios from 'axios';
import {PROFILE} from './index';
import {GET_ERRORS} from './index';


export const currentProfile=(userData) => dispatch => {
    axios.post('http://localhost:3001/routeapi/profile/getProfile',userData)
            .then(response =>{
                    dispatch({
                            type:PROFILE,
                            payload:response.data
                    })
                console.log("Status Code: ",response.status);
                console.log("Profile action response",response);    
            })

            .catch(err=>{
                    dispatch({
                            type:GET_ERRORS,
                            payload:err.response.data
                    })
            })
           
};


export const updateProfile=(data,history)=>dispatch=>{
        axios.post('http://localhost:3001/routeapi/profile/updateProfile',data)
                .then(response=>{
                        alert("Profile updated successfully");
                        history.push('/')
                })
                .catch(err=>{
                        dispatch({
                                type:GET_ERRORS,
                                payload:err.response.data
                        })
                })
}