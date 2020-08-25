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

const industryReducer = (selectedIndustry = null, action) => {
  if (action.type === "SELECT_INDUSTRY") {
    return action.payload;
  }

  return selectedIndustry;
};

const paletteReducer = (state = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SET_PREST_NAME": {
      state = { ...state, presetName: action.payload };
      break;
    }
    case "SET_PRIMARY_COLOR": {
      state = { ...state, primaryColor: action.payload };
      break;
    }
    case "SET_SECONDARY_COLOR": {
      state = { ...state, secondaryColor: action.payload };
      break;
    }
  }

  return state;
};

const goalsReducer = (selectedGoals = [], action) => {
  if (action.type === "SET_GOALS") {
    const selectGoalIndex = selectedGoals.indexOf(action.payload);

    // If goals are set
    if (selectGoalIndex > -1) {
      // If goal already selected, remove goal from list
      return selectedGoals.filter((goal) => goal !== action.payload);
    } else {
      const goals = [...selectedGoals, action.payload]; // Add first goal to list
      return goals;
    }
  }

  return selectedGoals;
};

const ordersReducer = (
  state = { monthlyOrders: null, averageOrderValue: null },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SET_MONTHLY_ORDERS": {
      state = { ...state, monthlyOrders: action.payload };
      break;
    }
    case "SET_AVERAGE_ORDER_VALUE": {
      state = { ...state, averageOrderValue: action.payload };
      break;
    }
  }

  return state;
};

const rewardsReducer = (selectedRewards = [], action) => {
  if (action.type === "SELECT_REWARDS") {
    const selectRewardIndex = selectedRewards.indexOf(action.payload);

    // If rewards are set
    if (selectRewardIndex > -1) {
      // If goal already selected, remove reward from list
      return selectedRewards.filter((goal) => goal !== action.payload);
    } else {
      const rewards = [...selectedRewards, action.payload]; // Add first reward to list
      return rewards;
    }
  }

  return selectedRewards;
};

export default combineReducers({
  name: nameReducer,
  howto: howToListReducer,
});
