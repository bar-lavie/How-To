import { combineReducers } from "redux";

const nameReducer = (howToName = null, action) => {
  if (action.type === "SET_NAME") {
    return action.payload;
  }
  return howToName;
};

const howToListReducer = (howToList = [], action) => {
  if (action.type === "SET_HOW_TO_LIST") {
    return [...howToList, ...action.payload];
  }
  return howToList;
};

const howToStatusReducer = (status = [], action) => {
  if (action.type === "SET_HOW_TO_STATUS") {
    return [...status, action.payload];
  }
  if (action.type === "GET_HOW_TO_STATUS") {
    return [...new Set([...status, ...action.payload])];
    // return [...status, ...action.payload];
  }
  return status;
};

export default combineReducers({
  name: nameReducer,
  howto: howToListReducer,
  status: howToStatusReducer,
});
