export const LOADING = "LOADING";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

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