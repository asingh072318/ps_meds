import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import CoachReducer from "./CoachReducer";

export default combineReducers({
  routing: routerReducer,
  coach: CoachReducer
});
