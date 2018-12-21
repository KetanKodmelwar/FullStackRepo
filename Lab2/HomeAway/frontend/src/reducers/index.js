import {combineReducers} from 'redux';
import reducerLogin from './reducerLogin';
import reducerSignup from './reducerSignup';
import reducerError from './reducerError';
import reducerProfile from './reducerProfile';
import reducerOwnerSignup from './reducerOwnerSignup';
import reducerOwnerLogin from './reducerOwnerLogin';
import reducerlistProperty from './reducerlistProperty';
import reducerSearchProperty from './reducerSearchProperty';


export default combineReducers({

    log:reducerLogin,
    signup:reducerSignup,
    errors:reducerError,
    profile:reducerProfile,
    ownersignup:reducerOwnerSignup,
    ownerlogin:reducerOwnerLogin,
    listProperty:reducerlistProperty,
    search:reducerSearchProperty
    

   
});
