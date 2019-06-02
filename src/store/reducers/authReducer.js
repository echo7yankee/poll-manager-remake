import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from "../actions/types";

const initialState = {
  authError: null,
  isLoading: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("LOGIN success");
      return {
        ...state,
        authError: null,
        isLoading: false
      };

    case LOGIN_FAILED:
      console.log("LOGIN failed");
      return {
        ...state,
        authError: action.err.message
      };

    case LOGOUT:
      console.log("Logged out");
      return {
        ...state,
        isLoading: true
      };

    case SIGNUP_SUCCESS:
      console.log("Signup success");
      return {
        ...state,
        authError: null
      };
    case SIGNUP_FAILED:
      console.log("Signup failed");
      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
