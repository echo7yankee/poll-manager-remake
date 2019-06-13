import {
  DELETE_POLL,
  TOGGLE_EDIT,
  EDIT_POLL,
  CLEAR_POLLS,
  POST_POLL,
  GET_POLLS,
  LOADING_UI_POST,
  LOADING_UI_DELETE,
  LOADING_UI_GET,
  LOADING_UI_CLEAR,
  SET_POLLS_ERRORS,
  LOADING_UI_EDIT
} from "../types";

const initialState = {
  polls: [],
  errors: {},
  isLoadingPost: false,
  isLoadingClear: false,
  isLoadingGet: false
};

const pollReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POLLS:
      return {
        ...state,
        polls: action.payload,
        isLoadingGet: false
      };

    case LOADING_UI_POST:
      return {
        ...state,
        isLoadingPost: true
      };
    case LOADING_UI_EDIT:
      return {
        ...state,
        polls: state.polls.map(poll => {
          if (poll.id === action.payload.id) {
            poll = {
              ...action.payload,
              isLoadingEdit: true
            };
          }

          return poll;
        })
      };
    case LOADING_UI_DELETE:
      return {
        ...state,
        polls: state.polls.map(poll => {
          if (poll.id === action.id) {
            poll = {
              ...poll,
              isLoadingDelete: true
            };
          }

          return poll;
        })
      };
    case LOADING_UI_CLEAR:
      return {
        ...state,
        isLoadingClear: true
      };
    case LOADING_UI_GET:
      return {
        ...state,
        isLoadingGet: true
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
        })
      };

    case CLEAR_POLLS:
      return {
        ...state,
        polls: [],
        isLoadingClear: false
      };

    case TOGGLE_EDIT:
      return {
        ...state,
        polls: state.polls.map(poll => {
          if (poll.id === action.payload.id) {
            poll = {
              ...poll,
              isEdit: !action.payload.isEdit
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
              isEdit: false,
              isLoadingEdit: false
            };
          }

          return poll;
        })
      };

    case SET_POLLS_ERRORS:
      return {
        ...state,
        errors: action.payload,
        isLoadingPost: false
      };

    default:
      return state;
  }
};

export default pollReducer;
