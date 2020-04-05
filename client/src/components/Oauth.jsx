import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

const Oauth = () => {
	const location = useLocation();

	useEffect(() => {
		const queryValues = location.search;
		const code = queryString.parse(queryValues).code;

		// Get token from 42 with granted code
		axios
			.get("/oauth/42/redirect", { headers: { code } })
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
					const config = {
						headers: {
							"Content-type": "application/json",
						},
					};

					for (let i = 0; i < result.data.length; i++) {
						if (result.data[i].hive_id === res.data.id) {
							const body = JSON.stringify({
								hive_id: res.data.id,
							});
							axios
								.post("/api/auth/hive", body, config)
								.then((res) => console.log(res.data))
								.catch((err) => console.log(err));
							console.log("user exists");
							return;
						}
					}

					// register user
					const d = res.data;
					console.log(d);
					const body = JSON.stringify({
						firstname: d.first_name,
						lastname: d.last_name,
						username: d.login,
						email: d.email,
						hive_id: d.id,
						profile_picture: d.image_url,
					});

					axios
						.post("/api/users/hive", body, config)
						.then((res) => {
							console.log(res.data);
						})
						.catch((err) => console.log(err));
				});
			})
			.catch((err) => console.log(err));
	});

	return (
		<div>
			<h1>this is redirect component</h1>
		</div>
	);
};

export default Oauth;
