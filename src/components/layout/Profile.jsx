import React, { useState, useEffect } from "react";
import spinner from "../imgAndSvg/GIF/spinner.gif";

import styleCreate from "../poll-admin/createPoll.module.css";
import style from "./profile.module.css";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { uploadImage, getUserData } from "../../store/actions/authActions";

const Profile = ({
  history,
  auth: { authenticated, isLoading, user },
  uploadImage,
  getUserData
}) => {
  const [message, setMessage] = useState("");
  const [label, setLabel] = useState("Choose a profile picture...");

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const onChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();

    //Check if image changes
    if (!image) return null;

    formData.append("image", image, image.name);
    setLabel(image.name);
    uploadImage(formData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
  };

  console.log(isLoading);

  if (!authenticated) return <Redirect to="/signin" />;

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
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input"
            />
          </div>
          <h4>Change your picture:</h4>
          <div className={style.inputGroup}>
            <label htmlFor="customPicture" className={style.label}>
              <span className={style.labelTxt}>{label}</span>
              <span className={`${style.labelBtn} hover-blue`}>Browse</span>
            </label>
            <input
              id="customPicture"
              type="file"
              className={`${style.input} `}
              onChange={onChange}
            />
          </div>

          <div className={style.imageContainer}>
            {isLoading && (
              <img src={spinner} alt="spinner" className={style.spinner} />
            )}
            <img src={user.imageUrl} alt="profile" className={style.image} />
            )}
          </div>

          <button
            className={`mt-5 btn btn-submit
          `}
            type="submit"
          >
            Save
          </button>
        </form>

        <div className="justify-center">
          {message && <p className="error error-red">{message}</p>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: formData => dispatch(uploadImage(formData)),
    getUserData: () => dispatch(getUserData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
