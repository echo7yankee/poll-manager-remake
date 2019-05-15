import React from "react";
import style from "./navbar.module.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

import { Link } from "react-router-dom";

const Navbar = ({ logout, auth, profile }) => {
  return (
    <nav className={style.nav}>
      <Link to={auth.uid ? "create" : "/"} className={style.logo}>
        M-POLLS
      </Link>

      {auth.uid ? (
        <SignedInLinks logout={logout} profile={profile} />
      ) : (
        <SignedOutLinks />
      )}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
