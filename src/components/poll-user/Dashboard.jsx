import React from "react";
import Questions from "./Questions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = () => {
  return (
    <div>
      <Questions />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
