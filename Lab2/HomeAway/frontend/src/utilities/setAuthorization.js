import axios from 'axios';

const setAuthorization= token =>{
    if(token){
        axios.defaults.headers.common['Authorization']=token;
        console.log("Authorization done");
    }else{
        delete axios.defaults.headers.common['Authorization'];
        console.log("Authorization removed");
    }
};

export default setAuthorization;

