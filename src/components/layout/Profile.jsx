import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styleCreate from "../poll-admin/createPoll.module.css";
import style from "./profile.module.css";

const Profile = ({ auth }) => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  if (!auth.uid) return <Redirect to="/signin" />;
  return (
    <div className={styleCreate.container} style={{ overflow: "visible" }}>
      <div className={style.profileContainer}>
        <h3>Edit your profile</h3>
        <span className="border mb-5" />
        <form onSubmit={handleSubmit}>
          <h4>Edit your username:</h4>
          <div className={style.inputGroup}>
            <input type="text" placeholder="Firstname" className="input mb-3" />
            <input type="text" placeholder="Lastname" className="input mb-3" />
            <input type="password" placeholder="Password" className="input" />
          </div>
          <h4>Change your picture:</h4>
          <div className={style.inputGroup}>
            <label htmlFor="customPicture" className={style.label}>
              <span className={style.labelTxt}>Choose a picture</span>
              <span className={`${style.labelBtn} hover-blue`}>Browse</span>
            </label>
            <input
              id="customPicture"
              type="file"
              className={`${style.input} `}
            />
          </div>

          <button
            className={`mt-5 btn btn-submit
          `}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
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
)(Profile);
