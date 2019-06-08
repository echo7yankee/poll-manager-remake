import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Summary from "./components/poll-admin/Summary";
import CreatePoll from "./components/poll-admin/CreatePoll";
import Dashboard from "./components/poll-user/Dashboard";
import Answers from "./components/poll-admin/Answers";
import Profile from "./components/layout/Profile";

//Redux
import { connect } from "react-redux";
import { getPolls } from "./store/actions/pollActions";

const App = ({ getPolls }) => {
  useEffect(() => {
    getPolls();
  }, [getPolls]);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/create" component={CreatePoll} />
          <Route path="/summary" component={Summary} />
          <Route path="/answers" component={Answers} />
          <Route path="/profile" component={Profile} />
          <Route
            component={() => (
              <h1 style={{ margin: "100px auto" }}>404 NOT FOUND</h1>
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getPolls: () => dispatch(getPolls())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
