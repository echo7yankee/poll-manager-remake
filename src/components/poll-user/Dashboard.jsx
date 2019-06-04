import React from "react";
import Questions from "./Questions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ auth: { authenticated } }) => {
  if (authenticated) return <Redirect to="/create" />;

  return (
    <div>
      <Questions />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
