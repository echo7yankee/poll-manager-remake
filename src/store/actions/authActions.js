import {
  LOADING_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  GET_AUTHENTICATED_USER,
  IMG_UPLOADED_SUCCESSFULY
} from "../types";
import axios from "axios";

export const signupUser = (newUser, history) => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/signup", newUser)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
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
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: SET_AUTHENTICATED });
      history.push("/create");
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED
  });
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("user/image", formData)
    .then(res => {
      dispatch({
        type: IMG_UPLOADED_SUCCESSFULY,
        payload: res.data.message
      });
      dispatch(getUserData());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios.get("/user").then(res => {
    dispatch({
      type: GET_AUTHENTICATED_USER,
      payload: res.data.credentials
    });
  });
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
