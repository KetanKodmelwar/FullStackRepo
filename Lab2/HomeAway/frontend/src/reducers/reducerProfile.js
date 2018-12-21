import {PROFILE} from '../actions/index'

const initialState={
    profile:{}
    
}

export default function(state=initialState,action){
    switch(action.type){
        case PROFILE:
            return{
                ...state,
                profile:action.payload
            }
        default:
            return state;
    }
}