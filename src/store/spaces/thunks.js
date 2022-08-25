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
    const response = await axios.get(
      `http://localhost:4000/spacedetails/${id}`
    ); //this should be the endpoint made in the router, should give the specific space and include its stories too
    console.log("getSpaceDetailsthunk", response.data);
    const spaceAndDetails = response.data;
    spaceAndDetails.stories.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    console.log("sorted", spaceAndDetails);
  } catch (e) {
    console.log(e);
  }
};
