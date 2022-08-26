import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import { loginSuccess, logOut, tokenStillValid, replaceSpace } from "./slice";
import { fillSpaceDetails } from "../spaces/slice";

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(fillSpaceDetails(response.data.space));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const deleteStory = (storyId) => async (dispatch, getState) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/spacedetails/${storyId}`
    );
    console.log(response.data);
  } catch (e) {
    console.log(e.message);
  }
};

export const createStory =
  (storyObject, spaceId) => async (dispatch, getState) => {
    const token = getState().user.token;
    // console.log(getState().user);
    try {
      //make a post request to the server with the story object
      const response = await axios.post(
        `http://localhost:4000/stories/create/${spaceId}`,
        storyObject,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(
        "createStory thunk returning the successful added story from db",
        response.data
      );

      //if successful request the full space including stories from the endpoint
      const spaceResponse = await axios.get(
        `http://localhost:4000/spacedetails/${spaceId}`
      );
      console.log(spaceResponse.data);
      //dispatch to the store and replace the old user space state
      dispatch(replaceSpace(spaceResponse.data));
      //trigger a success message if the response was good
    } catch (e) {
      console.log(e.message);
    }
  };
