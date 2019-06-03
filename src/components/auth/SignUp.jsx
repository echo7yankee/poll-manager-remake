import React, { useState } from "react";
import style from "./auth.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signupUser } from "../../store/actions/authActions";
import spinnerGif from "../imgAndSvg/GIF/spinner.gif";

const initialState = {
  handle: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUp = ({ signupUser, auth, history }) => {
  const [credentials, setCredentials] = useState(initialState);

  //destructuring off of credentials
  const { handle, email, password, confirmPassword } = credentials;
  //destructuring off of auth
  const { errors, isLoading } = auth;

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    signupUser(credentials, history);
  };

  return (
    <>
      <div className={style.authContainer}>
        <h4>Sign Up</h4>
        <span className="border" />
        <form onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <input
              type="text"
              id="handle"
              placeholder="Name"
              className={errors.handle ? style.inputInvalid : style.input}
              value={handle}
              onChange={handleChange}
            />
            {errors.handle && (
              <div className={style.errorContainer}>
                <span className={style.error}>{errors.handle}</span>
              </div>
            )}
          </div>
          <div className={style.inputGroup}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={errors.email ? style.inputInvalid : style.input}
              value={email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className={style.errorContainer}>
                <span className={style.error}>{errors.email}</span>
              </div>
            )}
          </div>
          <div className={style.inputGroup}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={errors.password ? style.inputInvalid : style.input}
              value={password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className={style.errorContainer}>
                <span className={style.error}>{errors.password}</span>
              </div>
            )}
          </div>
          <div className={style.inputGroup}>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className={
                errors.confirmPassword ? style.inputInvalid : style.input
              }
              value={confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className={style.errorContainer}>
                <span className={style.error}>{errors.confirmPassword}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={isLoading ? style.disabledBtn : style.authBtn}
          >
            Sign Up
            {isLoading && (
              <img className={style.spinner} src={spinnerGif} alt="spinner" />
            )}
          </button>
          {errors.general && (
            <div className={style.centerContainer}>
              <span className={style.error}>{errors.general}</span>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupUser: (newUser, history) => dispatch(signupUser(newUser, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
