export const ADD_POINTS = "ADD_POINTS";
export const REMOVE_POINTS = "REMOVE_POINTS";
export const LOADING = "LOADING";
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

export const errorMessage = errMsg => {
    return {
      type: ERROR_MESSAGE,
      payload: errMsg
    };
};