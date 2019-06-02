import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.css";
import Dropdown from "./Dropdown";
//import defaultProfilePic from "../imgAndSvg/SVG/profile.svg";

const SignedInLinks = ({ logout, profile }) => {
  const [toggle, setToggle] = useState(false);

  const toggleDropdown = () => {
    setToggle(toggle => !toggle);
  };

  const profilePic = localStorage.getItem("uploadedFile");

  return (
    <ul className={style.navItems}>
      <li className={`${style.navItem} `}>
        <NavLink
          to="/create"
          className={`${style.navLink} ${
            style.whiteText
          } navLink-btn navLink-btn-transparent`}
          activeClassName="navLink-btn-blue"
        >
          Add Polls
        </NavLink>
      </li>
      <li className={`${style.navItem} `}>
        <NavLink
          to="/summary"
          className={`${style.navLink} ${
            style.blueText
          } navLink-btn navLink-btn-transparent`}
          activeClassName="navLink-btn-blue"
        >
          Summary
        </NavLink>
      </li>
      <li className={`${style.navItem}`}>
        <NavLink
          to="/answers"
          className={`${style.navLink} ${
            style.blueText
          } navLink-btn navLink-btn-transparent`}
          activeClassName="navLink-btn-blue"
        >
          Answers
        </NavLink>
      </li>

      <li
        className={`${style.navItem} align-center  ${
          style.navItemPosRelative
        } `}
        onClick={toggleDropdown}
      >
        <span className={`${style.navLink} ${style.blueText}`}>
          Signed in as
        </span>{" "}
        <span className={`${style.initials} ml-2 `}>{profile.initials}</span>
        <div className={style.profilePicContainer}>
          <img
            className={style.profilePic}
            // src={`${defaultProfilePic}` || "/profile.jpg"}
            src={process.env.PUBLIC_URL + profilePic}
            alt=""
          />
        </div>
        <i
          className={`arrow ${
            toggle === true ? "arrow-down" : "arrow-right"
          } ml-3`}
          style={{ gridRow: "1 / span 2 " }}
        />
        <Dropdown toggle={toggle} logout={logout} />
      </li>
    </ul>
  );
};

export default SignedInLinks;
