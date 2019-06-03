import { GET_ANSWERS } from "../types";

export const getAnswers = answer => {
  return {
    type: GET_ANSWERS,
    payload: answer
  };
};
