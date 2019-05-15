import React from "react";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.css";

const SignedOutLinks = () => {
  return (
    <ul className={style.navItems}>
      <li className={`${style.navItem} `}>
        <NavLink
          exact
          to="/"
          className={`${style.navLink} ${
            style.blueText
          } navLink-btn navLink-btn-transparent `}
          activeClassName="navLink-btn-blue"
        >
          Answer Questions
        </NavLink>
      </li>
      <li className={`${style.navItem} `}>
        <NavLink
          to="/signin"
          className={`${style.navLink} ${
            style.blueText
          } navLink-btn navLink-btn-transparent`}
          activeClassName="navLink-btn-blue"
        >
          Log In
        </NavLink>
      </li>
      <li className={`${style.navItem} `}>
        <NavLink
          to="/signup"
          className={`${style.navLink} ${
            style.whiteText
          } navLink-btn navLink-btn-transparent`}
          activeClassName="navLink-btn-blue"
        >
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
