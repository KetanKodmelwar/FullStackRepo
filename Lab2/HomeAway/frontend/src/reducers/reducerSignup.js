import {SIGNUP} from '../actions/index'

const initialState={
    user:{}
    
}

export default function(state=initialState,action){
    switch(action.type){
        case SIGNUP:
            return{
                ...state,
                user:action.payload,
                type:SIGNUP
            }
        default:
            return state;
    }
}