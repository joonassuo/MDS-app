import React, { useEffect, useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import queryString from "query-string";
import { loginHive, registerHive } from "../actions/hiveAuthActions";
import "./css/oauth.css";

const Oauth = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isReady, setIsready] = useState(false);

  useEffect(() => {
    const queryValues = location.search;
    const code = queryString.parse(queryValues).code;

    // Get token from 42 with granted code
    axios
      .get("/oauth/42", { headers: { code } })
      .then((res) => {
        // Post to 42 for token
        return axios.get("https://api.intra.42.fr/v2/me", {
          headers: {
            Authorization: "BEARER " + res.data.access_token,
          },
        });
      })
      .then((res) => {
        // Check if user with hiveID already exists in DB
        axios.get("/api/users").then((result) => {
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].hive_id === res.data.id) {
              // If exists, login user
              loginHive(res.data.id)(dispatch);
              setIsready(true);
              return;
            }
          }

          // Else, register new user
          const d = res.data;
          const body = {
            firstname: d.first_name,
            lastname: d.last_name,
            username: d.login,
            email: d.email,
            hive_id: d.id,
            profile_picture: d.image_url,
          };
          registerHive(body)(dispatch);
          setIsready(true);
        });
      })
      .catch((err) => console.log(err));
  });

  return isReady ? (
    <Redirect to="/" />
  ) : (
    <div className="spinner-container">
      <Spinner animation="border" variant="info" />
    </div>
  );
};

export default Oauth;
