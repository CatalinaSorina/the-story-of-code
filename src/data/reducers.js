import * as actions from "./actions";
import { getPlaces } from "./utils";

const initialState = {
  points: 0,
  pointsType: [],
  loading: false,
  money: 0,
  currency: 1,
  currencyType: "USD",
  error: null,
  places: [],
  selectedArea: null,
  mapQuestionsDisabled: [],
  challengeQuestionNumber: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //===POINTS===\\
    case actions.ADD_POINTS:
      const pointsAdded = state.points + action.payload[0];
      const moneyAdded = pointsAdded * state.currency;
      return {
        ...state,
        points: pointsAdded,
        pointsType: [...state.pointsType, action.payload[1]],
        money: moneyAdded
      };
    case actions.REMOVE_POINTS:
      const pointsRemoved = state.points - action.payload[0];
      const moneyRemoved = pointsRemoved * state.currency;
      return {
        ...state,
        points: pointsRemoved,
        pointsType: [...state.pointsType, action.payload[1]],
        money: moneyRemoved
      };
    //===SYNC===\\
    case actions.LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.ERROR_MESSAGE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    //===MAP===\\
    case actions.GET_PLACES:
      const setPlaces = getPlaces().slice();
      return {
        ...state,
        places: setPlaces
      }
    case actions.GET_LOCATION:
      const placesWithSelectedPlace = state.places.filter(place => place.name !== "Selected area")
      return {
        ...state,
        places: [
          ...placesWithSelectedPlace,
          {
            name: "Selected area",
            location: action.payload,
            color: "blue"
          }
        ]
      };
    case actions.SET_SELECTED_AREA:
      return {
        ...state,
        loading: false,
        selectedArea: action.payload,
        error: null
      };
    case actions.CHANGE_SELECTED_NAME:
      return {
        ...state,
        selectedArea: action.payload
      };
    case actions.REMOVE_SELECTED_AREA:
      const placesWithoutSelectedPlace = state.places.filter(place => place.name !== "Selected area");
      return {
        ...state,
        places: placesWithoutSelectedPlace,
        selectedArea: null
      };
    case actions.DISABLE_MAP_QUESTION:
      const placesFiltre = state.places.map(place => (
        place.name === action.payload ? {
          ...place,
          color: "white"
        } : place
      ));
      return {
        ...state,
        places: placesFiltre,
        mapQuestionsDisabled: [...state.mapQuestionsDisabled, action.payload]
      };
    //===CHALLENGE==\\
    case actions.CHANGE_CHALLENGE_NUMBER:
      return {
        ...state,
        challengeQuestionNumber: action.payload
      };
    //===MONEY===\\
    case actions.GET_CURRENCY:
      return {
        ...state,
        currencyType: action.payload.split("_")[1]
      };
    case actions.SET_CURRENCY:
      return {
        ...state,
        loading: false,
        money: state.points * action.payload,
        currency: action.payload,
        error: null
      };
    case actions.USE_MONEY:
      return {
        ...state,
        points: 0,
        money: 0,
        places: [],
        selectedArea: null,
        mapQuestionsDisabled: [],
        challengeQuestionNumber: 0
      };
    default:
      return state;
  }
};

export default rootReducer;
