import * as actions from "./actions";

const initialState = {
    loading:false,
    error: null
};
  
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.LOADING:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actions.ERROR_MESSAGE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;