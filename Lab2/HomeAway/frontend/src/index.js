import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import thunk from 'redux-thunk';
/*Changed its position*/import rootReducer from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import jwtdecode from 'jwt-decode';
import setAuthorizaton from './utilities/setAuthorization'; 
import {setCurrentUser} from './actions/loginActions';
import {logOut} from './actions/loginActions';




const initialState={};
const middleware=[thunk];

//const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//const store = createStore(rootReducer,initialState,composePlugin(applyMiddleware(promise)));
const store=createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(...middleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                )
                );

                
//this will check for every page you visit if user is logged in or not


if(localStorage.authToken!=undefined ||localStorage.authToken!=null ){
    setAuthorizaton(localStorage.authToken);

    const decodeUser=jwtdecode(localStorage.authToken);

    store.dispatch(setCurrentUser(decodeUser));


//     const currTime=Date.now()/1000;
//     if (decodeUser.exp<currTime){
//         store.dispatch(logOut());
//         window.location.href('/');
//     } 

    
 }


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
