import React from "react";
import Questions from "./Questions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ auth }) => {
  if (auth.uid) return <Redirect to="/create" />;

  return (
    <div>
      <Questions />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
