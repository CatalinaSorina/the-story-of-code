export const ADD_POINTS = "ADD_POINTS";
export const REMOVE_POINTS = "REMOVE_POINTS";
export const LOADING = "LOADING";
export const GET_CURRENCY = "GET_CURRENCY";
export const CURRENCY = "CURRENCY";
export const GET_LOCATION = "GET_LOCATION";
export const SET_SELECTED_AREA = "SET_SELECTED_AREA";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const addPoints = (points,pointsType) => {
    return {
        type: ADD_POINTS,
        payload: [points,pointsType]
    }
}

export const removePoints = (points,pointsType) => {
    return {
        type: REMOVE_POINTS,
        payload: [points,pointsType]
    }
}

export const loading = () => {
    return {
        type: LOADING
    }
}

export const getCurrencyVal = currencyType => {
    return {
        type: GET_CURRENCY,
        payload: currencyType
    }
}

export const currencyVal = val => {
    return {
        type: CURRENCY,
        payload: val
    }
}

export const makeLocation = coordinates => {
    return {
        type: GET_LOCATION,
        payload: coordinates
    }
}

export const setSelectedArea = location => {
    return {
        type: SET_SELECTED_AREA,
        payload: location
    }
}

export const errorMessage = errMsg => {
    return {
      type: ERROR_MESSAGE,
      payload: errMsg
    };
};