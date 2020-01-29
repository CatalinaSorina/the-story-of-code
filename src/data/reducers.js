import * as actions from "./actions";

const initialState = {
    points:0,
    pointsType:[],
    loading:false,
    money:0,
    currency:1,
    currencyType:"USD",
    error: null,
    selectedArea:null
};
  
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_POINTS:
            return{
                ...state,
                points: (state.points+action.payload[0]),
                pointsType: [...state.pointsType,action.payload[1]],
                money: (state.points+action.payload[0])*state.currency
            }
        case actions.REMOVE_POINTS:
            return{
                ...state,
                points: (state.points-action.payload[0]),
                pointsType: [...state.pointsType,action.payload[1]],
                money: (state.points-action.payload[0])*state.currency
            }
        case actions.USE_MONEY:
            return{
                ...state,
                points: 0,
                money: 0
            }
        case actions.LOADING:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actions.GET_CURRENCY:
            return{
                ...state,
                currencyType: action.payload.split("_")[1]
            }
        case actions.SET_CURRENCY:
            return{
                ...state,
                loading: false,
                money: (state.points*action.payload),
                currency: action.payload,
                error: null
            }
        case actions.SET_SELECTED_AREA:
            return{
                ...state,
                loading: false,
                selectedArea: action.payload,
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