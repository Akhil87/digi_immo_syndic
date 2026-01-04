import { applyMiddleware, combineReducers, createStore } from "redux";
import { Auth_reducer } from "../Reducer/Auth_reducer";
import { thunk } from "redux-thunk";
import { Bill_reducer } from "../Reducer/Bill_reducer";
import { Tenants_reducer } from "../Reducer/Tenants_reducer";
import { Loader_reducer } from "../Reducer/Loader_reducer";
import { Meeting_reducer } from "../Reducer/Meeting_reducer";

const Reducer = combineReducers({
  Auth_reducer,
  Bill_reducer,
  Tenants_reducer,
  Meeting_reducer,
  Loader_reducer
});

export const store = createStore(Reducer, applyMiddleware(thunk));

store.subscribe(() => {
  //   console.log(store.getState());
});
