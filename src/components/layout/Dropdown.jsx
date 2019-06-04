import React from "react";
import { Link } from "react-router-dom";

import style from "./navbar.module.css";

const Dropdown = ({ toggle, logoutUser }) => {
  return (
    <div
      className={`${style.dropdownContainer} ${
        toggle === true ? style.show : style.hide
      }`}
    >
      <ul className={style.dropdownItems}>
        <li className={`${style.dropdownItem} hover-darker`}>
          <Link to="/profile" className={`${style.dropdownItemLink} `}>
            Profile
          </Link>
        </li>
        <li
          className={`${style.dropdownItem} hover-darker`}
          onClick={logoutUser}
        >
          <Link to="/" className={`${style.dropdownItemLink} `}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
