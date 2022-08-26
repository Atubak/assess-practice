import { fillSpaces, fillSpaceDetails } from "./slice";
const axios = require("axios");

export const getAllSpaces = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("http://localhost:4000/");

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

    const spaceAndDetails = response.data;
    spaceAndDetails.stories.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    dispatch(fillSpaceDetails(spaceAndDetails));
  } catch (e) {
    console.log(e);
  }
};
