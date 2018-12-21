import {OWNER_SIGNUP} from '../actions/index'

const initialState={
    user:{}
    
}

export default function(state=initialState,action){
    switch(action.type){
        case OWNER_SIGNUP:
            return{
                ...state,
                user:action.payload,
                type:OWNER_SIGNUP
            }
        default:
            return state;
    }
}