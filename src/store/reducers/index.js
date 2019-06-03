import { combineReducers } from "redux";

import authReducer from "./authReducer";
import pollReducer from "./pollReducer";
import answersReducer from "./answersReducer";

const rootReducer = combineReducers({
  authReducer,
  polls: pollReducer,
  answers: answersReducer
});

export default rootReducer;
