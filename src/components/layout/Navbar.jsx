import React from "react";
import style from "./navbar.module.css";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <Link to={"/"} className={style.logo}>
        M-POLLS
      </Link>

      <SignedInLinks />

      <SignedOutLinks />
    </nav>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
