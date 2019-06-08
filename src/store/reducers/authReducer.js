import {
  LOADING_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  GET_AUTHENTICATED_USER,
  IMG_UPLOADED_SUCCESSFULY
} from "../types";

const initialState = {
  isLoading: false,
  authenticated: false,
  errors: {},
  user: {},
  message: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;

    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      };

    case GET_AUTHENTICATED_USER:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        user: action.payload
      };

    case IMG_UPLOADED_SUCCESSFULY:
      return {
        ...state,
        message: action.payload
      };

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
