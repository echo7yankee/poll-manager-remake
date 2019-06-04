import React from "react";
import style from "./navbar.module.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

const Navbar = ({ logoutUser, auth: { authenticated } }) => {
  console.log(authenticated);

  return (
    <nav className={style.nav}>
      <Link to={"/"} className={style.logo}>
        M-POLLS
      </Link>

      {authenticated ? (
        <SignedInLinks logoutUser={logoutUser} />
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
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
