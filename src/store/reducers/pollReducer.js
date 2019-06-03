import {
  ADD_POLL,
  DELETE_POLL,
  TOGGLE_EDIT,
  EDIT_POLL,
  CLEAR_POLLS
} from "../types";
import uuidv4 from "uuid/v4";

const initialState = {
  polls: []
};

const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POLL:
      return {
        ...state,
        polls: [...state.polls, { ...action.payload, id: uuidv4() }]
      };

    case DELETE_POLL:
      return {
        ...state,
        polls: state.polls.filter(poll => {
          return poll.id !== action.id;
        })
      };

    case CLEAR_POLLS:
      return {
        ...state,
        polls: []
      };

    case TOGGLE_EDIT:
      return {
        ...state,
        polls: state.polls.map(poll => {
          if (poll.id === action.id) {
            poll = {
              ...poll,
              isEdit: !poll.isEdit
            };
          }
          return poll;
        })
      };

    case EDIT_POLL:
      return {
        ...state,
        polls: state.polls.map(poll => {
          if (poll.id === action.payload.id) {
            poll = {
              ...action.payload,
              isEdit: false
            };
          }
          return poll;
        })
      };

    default:
      return state;
  }
};

export default pollReducer;
