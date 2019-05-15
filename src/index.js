import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    })
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

store.firebaseAuthIsReady.then(() => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  ReactDOM.render(app, document.getElementById("root"));
});
