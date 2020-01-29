export const ADD_POINTS = "ADD_POINTS";
export const REMOVE_POINTS = "REMOVE_POINTS";
export const USE_MONEY = "USE_MONEY";
export const LOADING = "LOADING";
export const GET_CURRENCY = "GET_CURRENCY";
export const CURRENCY = "CURRENCY";
export const GET_LOCATION = "GET_LOCATION";
export const SET_SELECTED_AREA = "SET_SELECTED_AREA";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const addPoints = (points,pointsType) => ({
    type: ADD_POINTS,
    payload: [points,pointsType]
});

export const removePoints = (points,pointsType) => ({
    type: REMOVE_POINTS,
    payload: [points,pointsType]
});

export const useMoney = () => ({type: USE_MONEY});

export const loading = () => ({type: LOADING});

export const getCurrencyVal = currencyType => ({
    type: GET_CURRENCY,
    payload: currencyType
});

export const currencyVal = val => ({
    type: CURRENCY,
    payload: val
});

export const makeLocation = coordinates => ({
    type: GET_LOCATION,
    payload: coordinates
});

export const setSelectedArea = location => ({
    type: SET_SELECTED_AREA,
    payload: location
});

export const errorMessage = errMsg => ({
    type: ERROR_MESSAGE,
    payload: errMsg
});