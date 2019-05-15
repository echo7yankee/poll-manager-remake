import {
  ADD_POLL,
  DELETE_POLL,
  EDIT_POLL,
  TOGGLE_EDIT,
  CLEAR_POLLS
} from "./types";

export const addPoll = newPoll => {
  return {
    type: ADD_POLL,
    payload: newPoll
  };
};

export const deletePoll = id => {
  return {
    type: DELETE_POLL,
    id
  };
};

export const clearPolls = () => {
  return {
    type: CLEAR_POLLS
  };
};

export const toggleEdit = id => {
  return {
    type: TOGGLE_EDIT,
    id
  };
};

export const editPoll = poll => {
  return {
    type: EDIT_POLL,
    payload: poll
  };
};
