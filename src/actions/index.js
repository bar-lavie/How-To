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
export const setHowToStatus = (howTo) => {
  const storedStatus = JSON.parse(localStorage.getItem("howtoStatus")) || [];
  const newStatus = [...storedStatus, howTo];
  localStorage.setItem("howtoStatus", JSON.stringify(newStatus));
  return {
    type: "SET_HOW_TO_STATUS",
    payload: newStatus,
  };
};
export const getHowToStatus = () => {
  const storedStatus = JSON.parse(localStorage.getItem("howtoStatus")) || [];
  // return (dispatch) => {
  // dispatch(setHowToStatus(storedStatus));
  // };
  return {
    type: "GET_HOW_TO_STATUS",
    payload: storedStatus,
  };
};
