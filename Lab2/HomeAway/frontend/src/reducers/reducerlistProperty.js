import {LIST_PROPERTY} from '../actions/index'

const initialState={
    property:{}
    
}

export default function(state=initialState,action){
    switch(action.type){
        case LIST_PROPERTY:
            return{
                ...state,
                property:action.payload
            }
        default:
            return state;
    }
}