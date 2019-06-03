import { LOADING_USER, SET_ERRORS, CLEAR_ERRORS } from "../types";
import axios from "axios";

export const signupUser = (newUser, history) => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/signup", newUser)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      history.push("/create");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (user, history) => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/signin", user)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch({ type: CLEAR_ERRORS });
      history.push("/create");
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
