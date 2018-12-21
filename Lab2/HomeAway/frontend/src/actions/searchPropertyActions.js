import axios from 'axios';
import {SEARCH_PROPERTY} from './index';
import {GET_ERRORS} from './index'
import {GET_DETAILS} from './index'

export const searchPropertyDetails=(userData,history)=>dispatch=>{
    axios.post('http://localhost:3001/routeapi/searchProperty/search',userData)
        .then(response=>{
                dispatch({
                    type:SEARCH_PROPERTY,
                    payload:response.data
                })
            console.log("Status code: ",response.status);
            console.log("Search action response ",response);
            history.push('/searchResult');    
        })

        .catch(err=>{
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
        })
};


// export const getPropertyDetails=(userData,page=3,resultPerPage=10)=>dispatch=>{
//     axios.post('http://localhost:3001/routeapi/searchProperty/getProperty')
//         .then(response=>{
//             dispatch({
//                 type:GET_DETAILS,
//                 payload:response.data
//             })
//             console.log("Property search details",response)

//             const start=(page-1)*resultPerPage;
//             const end=page*resultPerPage;
//             payload.slice(start,end).forEach(rend)
            
//         })
//         .catch(err=>{
//             dispatch({
//                 type:GET_ERRORS,
//                 payload:err.response.data
//             })
//         })
// }


export const getPropertyDetails=userData=>dispatch=>{
    axios.post('http://localhost:3001/routeapi/searchProperty/getProperty',userData)
        .then(response=>{
            console.log("In action data of property",response);
            dispatch({
                type:GET_DETAILS,
                payload:response.data
            })
            console.log("Property search details",response)
            
        })
        .catch(err=>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}

