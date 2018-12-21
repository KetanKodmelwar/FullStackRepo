import {SEARCH_PROPERTY} from '../actions/index';
import {GET_DETAILS} from '../actions/index';

const initialState={
    search:{},
    searchResult:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case SEARCH_PROPERTY:
            return{
                ...state,
                search:action.payload
            }
        case GET_DETAILS:
            return{
                ...state,
                searchResult:action.payload
            }     
        default:
            return state;     
    }
}