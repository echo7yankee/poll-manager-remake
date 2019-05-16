import React, { useState } from "react";
import style from "./auth.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import spinnerGif from "../imgAndSvg/GIF/spinner.gif";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUp = ({ signUp, authReducer, auth }) => {
  const [credentials, setCredentials] = useState(initialState);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);

  //Destructuring off of credentials
  const { firstName, lastName, email, password, confirmPassword } = credentials;

  const handleSubmit = e => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Confirm password must be the same as Password");
      return;
    }

    if (authReducer.isLoading === true) {
      setSpinner(true);
    } else {
      setSpinner(false);
    }

    signUp(credentials);
    setCredentials(initialState);
  };

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    });
  };

  if (auth.uid) return <Redirect to="/create" />;

  return (
    <>
      <div className={style.authContainer}>
        <h4>Sign Up</h4>
        <span className="border" />
        <form onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className={style.input}
              value={firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputGroup}>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className={style.input}
              value={lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputGroup}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={style.input}
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputGroup}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={style.input}
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.inputGroup}>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className={style.input}
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={style.authBtn}>
            Sign Up
          </button>
          <div className={style.centerContainer}>
            {error && <span className={style.error}>{error}</span>}
            {authReducer.authError && (
              <span className={style.error}>{authReducer.authError}</span>
            )}
          </div>
          <div className={style.centerContainer}>
            <span>
              {spinner && (
                <img className={style.spinner} src={spinnerGif} alt="" />
              )}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    authReducer: state.authReducer,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
