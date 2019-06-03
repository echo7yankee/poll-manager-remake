import React, { useState } from "react";
import style from "./auth.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import spinnerGif from "../imgAndSvg/GIF/spinner.gif";

const initialState = {
  email: "",
  password: ""
};

const SignIn = ({ loginUser, history, auth }) => {
  const [credentials, setCredentials] = useState(initialState);
  //destructuring off of credentials
  const { email, password } = credentials;
  //destructuring off of auth
  const { isLoading, errors } = auth;

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(credentials, history);
  };

  return (
    <>
      <div className={style.authContainer}>
        <h4>Sign In</h4>
        <span className="border" />
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className={isLoading ? style.disabledBtn : style.authBtn}
          >
            Log in
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
    loginUser: (user, history) => dispatch(loginUser(user, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
