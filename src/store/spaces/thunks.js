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

export const getSpaceDetails = (id) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`http://localhost:4000/spaces/${id}`); //this should be the endpoint made in the router, should give all stories that belong to this space instance
    console.log("getSpaceDetailsthunk", response.data);
  } catch (e) {
    console.log(e);
  }
};
