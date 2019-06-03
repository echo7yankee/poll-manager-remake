import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

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

store.subscribe(
  throttle(() => {
    saveState({
      polls: store.getState().polls,
      answers: store.getState().answers
    });
  }, 1000)
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
