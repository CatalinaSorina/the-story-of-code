import * as actions from "./actions";

const initialState = {
    points:0,
    pointsType:[],
    loading:false,
    error: null
};
  
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_POINTS:
            return{
                ...state,
                points: (state.points+action.payload[0]),
                pointsType: [...state.pointsType,action.payload[1]]
            }
        case actions.REMOVE_POINTS:
            return{
                ...state,
                points: (state.points-action.payload[0]),
                pointsType: [...state.pointsType,action.payload[1]]
            }
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