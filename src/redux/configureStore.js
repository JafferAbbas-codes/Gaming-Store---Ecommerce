import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import errorReducer from './errorReducer';
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import mouseReducer from "./mouseReducer";
import mousepadReducer from "./mousepadReducer";
import keyboardReducer from "./keyboardReducer";

// Session Storage is used to persist Store in Redux
function saveToLocalStorage(state) {
  try {
    console.log(state);
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalSotrage() {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
  }
}
const persistedState = loadFromLocalSotrage();

export const store = createStore(
  combineReducers({
    user: authReducer,
    error: errorReducer,
    product: productReducer,
    mouse: mouseReducer,
    keyboard: keyboardReducer,
    mousepad: mousepadReducer,
  }), 
  persistedState,
  applyMiddleware(thunk, logger)
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;