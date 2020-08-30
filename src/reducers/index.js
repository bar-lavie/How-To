import { combineReducers } from "redux";
import { updateObject } from "../shared/utility";

const nameReducer = (howToName = null, action) => {
  // console.log("action");
  // console.log("in");
  if (action.type === "SET_NAME") {
    return action.payload;
  }
  return howToName;
};

const howToListReducer = (howToList = [], action) => {
  if (action.type === "SET_HOW_TO_LIST") {
    return updateObject(howToList, action.payload);
  }
  return howToList;
};

const howToStatusReducer = (status = [], action) => {
  if (action.type === "SET_HOW_TO_STATUS") {
    console.log("SET_HOW_TO_STATUS ", action.payload);
    return [...status, action.payload];
  }
  if (action.type === "GET_HOW_TO_STATUS") {
    console.log("GET_HOW_TO_STATUS ", action.payload);
    // return [...new Set([...status, ...action.payload])];
    return [...status, ...action.payload];
  }
  return status;
};

export default combineReducers({
  name: nameReducer,
  howto: howToListReducer,
  status: howToStatusReducer,
});
