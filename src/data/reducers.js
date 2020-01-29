import * as actions from "./actions";
import { getPlaces } from "./utils";

const initialState = {
    points:0,
    pointsType:[],
    loading:false,
    money:0,
    currency:1,
    currencyType:"USD",
    error:null,
    places:getPlaces(),
    selectedArea:null,
    mapQuestionsDisabled:[]
};
  
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case actions.ADD_POINTS:
            const pointsAdded=state.points+action.payload[0];
            const moneyAdded=pointsAdded*state.currency;
            return{
                ...state,
                points: pointsAdded,
                pointsType: [...state.pointsType,action.payload[1]],
                money: moneyAdded
            }
        case actions.REMOVE_POINTS:
            const pointsRemoved=state.points-action.payload[0];
            const moneyRemoved=pointsRemoved*state.currency;
            return{
                ...state,
                points: pointsRemoved,
                pointsType: [...state.pointsType,action.payload[1]],
                money: moneyRemoved
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
        case actions.GET_LOCATION:
            let placesWithSelectedPlace=state.places;
            if(state.selectedArea) placesWithSelectedPlace.pop();
            return{
                ...state,
                places: [...placesWithSelectedPlace,{
                    name:"Selected area",
                    location: action.payload,
                    color:"blue"
                }]
            }
        case actions.REMOVE_SELECTED_AREA:
            const placesWithoutSelectedPlace=state.places.filter(place=>place.name!=="Selected area");
            return{
                ...state,
                places: placesWithoutSelectedPlace,
                selectedArea: null
            }
        case actions.DISABLE_MAP_QUESTION:
            let placesFiltre=state.places;
            placesFiltre.forEach(place=>{
                if(place.name===action.payload){
                    place.color="black";
                }
            });
            return{
                ...state,
                places:placesFiltre,
                mapQuestionsDisabled: [...state.mapQuestionsDisabled,action.payload]
            }
        case actions.SET_SELECTED_AREA:
            return{
                ...state,
                loading: false,
                selectedArea: action.payload,
                error: null
            }
        case actions.CHANGE_SELECTED_NAME:
            return{
                ...state,
                selectedArea: action.payload
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