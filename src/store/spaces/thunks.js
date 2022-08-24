import { fillSpaces } from "./slice";
const axios = require("axios");

export const getAllSpaces = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("http://localhost:4000/");

    console.log(response.data);
    dispatch(fillSpaces(response.data));
  } catch (e) {
    console.log(e.message);
  }
};