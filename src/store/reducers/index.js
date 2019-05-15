import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import pollReducer from "./pollReducer";
import answersReducer from "./answersReducer";

const rootReducer = combineReducers({
  authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  polls: pollReducer,
  answers: answersReducer
});

export default rootReducer;
