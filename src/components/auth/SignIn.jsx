import React, { useState } from "react";
import style from "./auth.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import Spinner from "../utils/Spinner";

const initialState = {
  email: "",
  password: ""
};

const SignIn = ({ signIn, auth, authReducer }) => {
  const [credentials, setCredentials] = useState(initialState);
  const [spinner, setSpinner] = useState(false);

  //Destructuring off of credentials
  const { email, password } = credentials;

  const handleSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      return;
    }

    if (authReducer.isLoading === true) {
      setSpinner(true);
    } else {
      setSpinner(false);
    }

    signIn(credentials);
    setCredentials(initialState);
  };

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value
    });
  };

  if (auth.uid) return <Redirect to="/create" />;
  if (spinner) return <Spinner />;

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
              minLength="6"
            />
          </div>
          <button type="submit" className={style.authBtn}>
            Log in
          </button>
        </form>
        <div className={style.centerContainer}>
          {authReducer.authError && (
            <span className={style.error}>{authReducer.authError}</span>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authReducer: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
