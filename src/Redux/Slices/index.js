// src/slices/index.js
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import filterReducer from "./globalFilterSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  query: filterReducer,
});

export default rootReducer;
