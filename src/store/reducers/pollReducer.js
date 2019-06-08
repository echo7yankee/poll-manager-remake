import {
  DELETE_POLL,
  TOGGLE_EDIT,
  EDIT_POLL,
  CLEAR_POLLS,
  POST_POLL,
  GET_POLLS,
  LOADING_UI_POST,
  LOADING_UI_DELETE,
  LOADING_UI_GET
} from "../types";

const initialState = {
  polls: [],
  isLoadingPost: false,
  isLoadingDelete: false,
  isLoadingGet: false
};

const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_UI_POST:
      return {
        ...state,
        isLoadingPost: true
      };
    case LOADING_UI_DELETE:
      return {
        ...state,
        isLoadingDelete: true
      };
    case LOADING_UI_GET:
      return {
        ...state,
        isLoadingGet: true
      };
    case GET_POLLS:
      return {
        ...state,
        polls: action.payload,
        isLoadingGet: false
      };

    case POST_POLL:
      return {
        ...state,
        polls: [...state.polls, action.payload],
        isLoadingPost: false
      };
    case DELETE_POLL:
      return {
        ...state,
        polls: state.polls.filter(poll => {
          return poll.id !== action.id;
        }),
        isLoadingDelete: false
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
