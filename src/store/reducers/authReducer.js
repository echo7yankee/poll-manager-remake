import { LOADING_USER, SET_ERRORS, CLEAR_ERRORS } from "../types";

const initialState = {
  isLoading: false,
  errors: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER: {
      return {
        ...state,
        isLoading: true
      };
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        isLoading: false,
        errors: {}
      };
    }

    case SET_ERRORS: {
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      };
    }

    default:
      return state;
  }
};

export default authReducer;
