import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

const Oauth = () => {
	const location = useLocation();

	useEffect(() => {
		const queryValues = location.search;
		const code = queryString.parse(queryValues).code;

		axios
			.get("/oauth/42/redirect", {
				headers: {
					code
				}
			})
			.then(res => {
				return res.data.access_token;
			})
			.then(res => {
				return axios.get("https://api.intra.42.fr/v2/me", {
					headers: {
						Authorization: "BEARER " + res
					}
				});
			})
			.then(res => console.log(res.data))
			.catch(err => console.log(err));
	});

	return (
		<div>
			<h1>this is redirect component</h1>
		</div>
	);
};

export default Oauth;
