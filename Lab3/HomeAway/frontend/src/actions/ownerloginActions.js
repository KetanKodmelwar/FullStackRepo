import axios from 'axios';
import { GET_ERRORS,SET_CURRENT_USER } from './index';
import setAuthorization from '../utilities/setAuthorization';
import jwtdecode from 'jwt-decode';




export const ownerloginUser=(userData)=>dispatch=>{
    axios.post('http://localhost:3001/routeapi/owners/ownerlogin',userData)
        .then(res=>{
            const token=res.data.token;

            localStorage.setItem('authToken',token);

            setAuthorization(token);
            const decodeUser=jwtdecode(token)

            dispatch(setCurrentUser(decodeUser));
            localStorage.setItem("localUser",decodeUser.emailID);


        })
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data 
            })
        })
};


export const setCurrentUser=decodeUser=>{
    return{
        type:SET_CURRENT_USER,
        payload:decodeUser
    }
}
  

