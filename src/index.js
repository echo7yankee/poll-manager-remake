import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import jwtToken from "jwt-decode";
import axios from "axios";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";
import { logoutUser } from "./store/actions/authActions.js";
import { SET_AUTHENTICATED } from "./store/types.js";

const persistedState = loadState();
const middleware = [thunk];

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// store.subscribe(
//   throttle(() => {
//     saveState({
//       polls: store.getState().polls,
//       answers: store.getState().answers
//     });
//   }, 1000)
// );

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtToken(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/signin";
    store.dispatch(logoutUser);
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
  }
}

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
