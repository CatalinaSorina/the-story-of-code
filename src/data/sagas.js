import { put, call, takeEvery } from "redux-saga/effects";
import * as actions from "./actions";
import * as API from "./api";

export function* changeCurrency(action) {
    try {
        yield put(actions.loading());
        const currencyType=action.payload;
        const { data } = yield call(
            API.getResponseFromApi,
          `https://free.currconv.com/api/v7/convert?q=${currencyType}&compact=ultra&apiKey=2a31c224ca2988d34341`
        );
        yield put(actions.currencyVal(Object.values(data)[0]));
      } catch (error) {
        yield put(actions.errorMessage(error.message));
      }
}
  
export default function* rootSaga() {
    yield takeEvery(actions.GET_CURRENCY, changeCurrency);
}