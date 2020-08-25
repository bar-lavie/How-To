export const setName = (howToName) => {
  return {
    type: "SET_NAME",
    payload: howToName,
  };
};
export const setHowToList = (howToList) => {
  return {
    type: "SET_HOW_TO_LIST",
    payload: howToList,
  };
};
export const selectIndustry = (selectedIndustry) => {
  return {
    type: "SELECT_INDUSTRY",
    payload: selectedIndustry,
  };
};

export const setPresetName = (presetName) => {
  return {
    type: "SET_PREST_NAME",
    payload: presetName,
  };
};

export const setPrimaryColor = (primaryColor) => {
  return {
    type: "SET_PRIMARY_COLOR",
    payload: primaryColor,
  };
};

export const setSecondaryColor = (secondaryColor) => {
  return {
    type: "SET_SECONDARY_COLOR",
    payload: secondaryColor,
  };
};

export const setMonthlyOrders = (monthlyOrders) => {
  return {
    type: "SET_MONTHLY_ORDERS",
    payload: monthlyOrders,
  };
};

export const setAverageOrderValue = (averageOrderValue) => {
  return {
    type: "SET_AVERAGE_ORDER_VALUE",
    payload: averageOrderValue,
  };
};

export const selectGoals = (goals) => {
  return {
    type: "SET_GOALS",
    payload: goals,
  };
};

export const selectRewards = (selectedRewards) => {
  return {
    type: "SELECT_REWARDS",
    payload: selectedRewards,
  };
};
