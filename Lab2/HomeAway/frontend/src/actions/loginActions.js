import axios from 'axios';
import { GET_ERRORS,SET_CURRENT_USER } from './index';
import setAuthorization from '../utilities/setAuthorization';
import jwtdecode from 'jwt-decode';




export const loginUser=(userData)=>dispatch=>{
    axios.post('http://localhost:3001/routeapi/users/login',userData)
        .then(res=>{
            const token=res.data.token;
            console.log(res);

            localStorage.setItem('authToken',token);

            setAuthorization(token);
            const decodeUser=jwtdecode(token)

            dispatch(setCurrentUser(decodeUser));


        })
        .catch(err=>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data 
            })
        )
};


export const setCurrentUser=decodeUser=>{
    return{
        type:SET_CURRENT_USER,
        payload:decodeUser
    }
}
  

export const logOut=()=> dispatch => {
    localStorage.removeItem('authToken');

    setAuthorization(false);
    dispatch(setCurrentUser({}));
    window.location.reload(); 
    alert('You have been successfully logged out');
    
}