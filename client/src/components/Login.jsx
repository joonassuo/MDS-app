import React, { useState } from "react";
import { loginUser, registerUser } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import "./css/login.css";

const Login = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e, type) => {
    e.preventDefault();

    switch (type) {
      case "firstname":
        setFirstname(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm-password":
        setConfirm(e.target.value);
        break;
      default:
        return;
    }
  };

  const onSubmit = () => {
    // Login or register new user
    if (!isRegister) {
      const user = {
        email,
        password,
      };
      loginUser(user)(dispatch);
      setIsLoggedIn(true);
    } else {
      // Check if password confirmation matches
      if (password !== confirm) {
        alert("passwords don't match");
      } else {
        const user = {
          firstname,
          lastname,
          username,
          email,
          password,
        };
        registerUser(user)(dispatch);
        setIsLoggedIn(true);
      }
    }
  };

  const handleExit = () => {
    if (isRegister) {
      setIsRegister(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  return isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div className="login-screen">
      <img
        src={isRegister ? "/back.png" : "/cancel.png"}
        alt="cancel"
        className="back-button"
        onClick={() => handleExit()}
      />
      <div className="login-container">
        {isRegister ? (
          <div>
            <input
              type="text"
              className="firstname-field h-align"
              placeholder="First Name"
              onChange={(e) => onChange(e, "firstname")}
            />
            <input
              type="text"
              className="lastname-field h-align"
              placeholder="Last Name"
              onChange={(e) => onChange(e, "lastname")}
            />
            <input
              type="text"
              className="username-field h-align"
              placeholder="Username"
              onChange={(e) => onChange(e, "username")}
            />
          </div>
        ) : (
          <a
            id="hive-login-link"
            href="https://api.intra.42.fr/oauth/authorize?client_id=8f7dbe7ac964071bad261bdc3197b8c40b26a2bc5105046c3245ab2635a28ecb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2F42%2Fredirect&response_type=code&scope=public"
          >
            <div className="hive-login-container h-align">
              <img id="hive-login-logo" src="/hive.png" alt="hive-logo" />
              <div id="hive-login-text">Hive Credentials</div>
            </div>
          </a>
        )}
        <input
          className="email-field h-align"
          type="email"
          placeholder="Email"
          onChange={(e) => onChange(e, "email")}
        />
        <input
          type="password"
          placeholder="Password"
          className="pasword-field h-align"
          onChange={(e) => onChange(e, "password")}
        />
        {isRegister ? (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="confirm-pasword-field h-align"
              onChange={(e) => onChange(e, "confirm-password")}
            />
          </div>
        ) : null}
        {isRegister ? (
          <div className="register-button" onClick={onSubmit}>
            REGISTER
          </div>
        ) : (
          <div className="login-button" onClick={onSubmit}>
            LOGIN
          </div>
        )}
        {!isRegister ? (
          <div className="register-link">
            <div
              onClick={() => {
                setIsRegister(true);
              }}
            >
              Don't have an account yet?
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
