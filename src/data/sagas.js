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

export function* getLocation(action) {
  try {
      yield put(actions.loading());
      const coordinates=action.payload;
      if(coordinates!==0){
        const { data } = yield call(
          API.getResponseFromApi,
          `https://api.opencagedata.com/geocode/v1/json?key=33b2739dd8d64aa9bf5eeec12d5864da&q=${coordinates}`
        );
        // console.log(data.results[0].components.country,data.results[0].components.continent)
        data.results[0].components.country? 
          yield put(actions.setSelectedArea(data.results[0].components.country)):
          yield put(actions.setSelectedArea("unmapped"));
      }else{
        yield put(actions.setSelectedArea(null));
      }
    } catch (error) {
      yield put(actions.errorMessage(error.message));
    }
}
  
export default function* rootSaga() {
    yield takeEvery(actions.GET_CURRENCY, changeCurrency);
    yield takeEvery(actions.GET_LOCATION, getLocation);
}