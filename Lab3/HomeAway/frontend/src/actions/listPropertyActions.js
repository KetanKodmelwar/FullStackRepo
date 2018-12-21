import axios from 'axios';
import {LIST_PROPERTY} from './index';
import {GET_ERRORS} from './index';

export const addProperty=(userData,history)=>dispatch=>{
    axios.post('http://localhost:3001/routeapi/listProperty/listing',userData)
        .then(response=>{
            dispatch({
                type:LIST_PROPERTY,
                payload:response.data
            })
            console.log("Status code of List property: ",response.status);
            console.log("List my property response action: ",response);
            alert("Property posted....You will now be redirected to the home page");
            history.push('/');
        })

        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
};