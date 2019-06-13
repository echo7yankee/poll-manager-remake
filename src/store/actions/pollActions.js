import {
  DELETE_POLL,
  EDIT_POLL,
  TOGGLE_EDIT,
  CLEAR_POLLS,
  GET_POLLS,
  POST_POLL,
  LOADING_UI_POST,
  LOADING_UI_DELETE,
  LOADING_UI_GET,
  LOADING_UI_CLEAR,
  LOADING_UI_EDIT,
  SET_POLLS_ERRORS
} from "../types";

import axios from "axios";

export const getPolls = () => dispatch => {
  dispatch({ type: LOADING_UI_GET });
  axios.get("polls").then(res => {
    dispatch({ type: GET_POLLS, payload: res.data });
  });
};

export const postPoll = newPoll => dispatch => {
  dispatch({ type: LOADING_UI_POST });
  axios
    .post("/poll", newPoll)
    .then(res => {
      dispatch({
        type: POST_POLL,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_POLLS_ERRORS,
        payload: err.response.data
      });
    });
};

export const deletePoll = id => dispatch => {
  dispatch({ type: LOADING_UI_DELETE, id });
  axios
    .delete(`/poll/${id}`)
    .then(() => {
      dispatch({ type: DELETE_POLL, id });
    })
    .catch(err => {
      console.error(err);
    });
};

export const clearPolls = () => dispatch => {
  dispatch({ type: LOADING_UI_CLEAR });

  axios.delete("/polls").then(() => {
    dispatch({ type: CLEAR_POLLS });
  });
};

export const toggleEdit = poll => {
  return {
    type: TOGGLE_EDIT,
    payload: poll
  };
};

export const editPoll = poll => dispatch => {
  dispatch({ type: LOADING_UI_EDIT, payload: poll });
  axios
    .put(`/poll/${poll.id}`, poll)
    .then(() => {
      dispatch({
        type: EDIT_POLL,
        payload: poll
      });
    })
    .catch(err => {
      console.error(err);
    });
};
