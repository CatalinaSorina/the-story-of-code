import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { saveState, loadState } from "./localStorage";
import { debounce } from "./utils";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, loadState(), enhancer);

store.subscribe(debounce(() => {
    saveState({ ...store.getState() });
}, 1000));

sagaMiddleware.run(rootSaga);

export default store;