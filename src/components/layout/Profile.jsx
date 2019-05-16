import React, { useState } from "react";

import styleCreate from "../poll-admin/createPoll.module.css";
import style from "./profile.module.css";
import axios from "axios";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProfilePicture } from "../../store/actions/authActions";

const Profile = ({ auth, getProfilePicture }) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose a picture ...");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (file === "") {
      setMessage("You need to insert an image");
      return;
    }

    if (e.target.elements.password.value.length <= 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = response.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }

    setFileName("Choose a picture ...");
    setMessage("");
  };

  getProfilePicture(uploadedFile.filePath);

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
              <span className={style.labelTxt}>{fileName}</span>
              <span className={`${style.labelBtn} hover-blue`}>Browse</span>
            </label>
            <input
              id="customPicture"
              type="file"
              className={`${style.input} `}
              onChange={onChange}
            />
          </div>

          {uploadedFile.filePath && (
            <div className="justify-center">
              <div className={style.imageContainer}>
                <img
                  className={style.uploadedImage}
                  src={uploadedFile.filePath}
                  alt=""
                />
              </div>
            </div>
          )}

          <button
            className={`mt-5 btn btn-submit
          `}
            type="submit"
          >
            Set Picture
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
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfilePicture: picture => dispatch(getProfilePicture(picture))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
