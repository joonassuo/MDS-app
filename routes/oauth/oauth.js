const express = require("express");
const router = express.Router();
const axios = require("axios");
const c = require("config");

router.get("/42/redirect", (req, res) => {
  const code = req.headers.code;
  !code ? res.send("no code") : res.send("yes code");
  const body = JSON.stringify({
    grant_type: "authorization_code",
    client_id: c.get("CLIENT_ID"),
    client_secret: c.get("CLIENT_SECRET"),
    code,
    redirect_uri: "https://beeswax.herokuapp.com/oauth/42/redirect",
    scope: "public",
  });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  axios
    .post("https://api.intra.42.fr/oauth/token", body, config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
