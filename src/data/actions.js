export const CHANGE_POINTS = "CHANGE_POINTS";
export const LOADING = "LOADING";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const changePoints = points => {
    return {
        type: CHANGE_POINTS,
        payload: points
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