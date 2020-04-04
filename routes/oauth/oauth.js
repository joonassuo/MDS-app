const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");

router.get("/42/redirect", (req, res) => {
	const code = req.headers.code;
	const body = JSON.stringify({
		grant_type: "authorization_code",
		client_id: config.get("CLIENT_ID"),
		client_secret: config.get("CLIENT_SECRET"),
		code,
		redirect_uri: "http://localhost:3000/oauth/42/redirect",
		scope: "public"
	});

	res.send(body);
});

module.exports = router;
