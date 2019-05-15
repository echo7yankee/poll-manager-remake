import { GET_ANSWERS } from "../actions/types";

const initialState = {
  answers: []
};

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      return {
        ...state,
        answers: state.answers.concat(action.payload)
      };
    default:
      return state;
  }
};

export default answersReducer;
