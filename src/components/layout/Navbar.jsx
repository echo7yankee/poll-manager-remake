import React, { useEffect } from "react";
import style from "./navbar.module.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { logoutUser, getUserData } from "../../store/actions/authActions";

const Navbar = ({ logoutUser, auth: { authenticated, user }, getUserData }) => {
  useEffect(() => {
    if (authenticated) {
      getUserData();
    }
  }, [authenticated, getUserData]);

  return (
    <nav className={style.nav}>
      <Link to={authenticated ? "/create" : "/"} className={style.logo}>
        M-POLLS
      </Link>

      {authenticated ? (
        <SignedInLinks logoutUser={logoutUser} user={user} />
      ) : (
        <SignedOutLinks />
      )}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    getUserData: () => dispatch(getUserData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
