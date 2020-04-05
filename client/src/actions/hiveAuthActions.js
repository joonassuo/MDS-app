import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from "./types";

// LOGIN HIVE USER
export const loginHive = (hive_id) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	// Req body
	const body = JSON.stringify({
		hive_id,
	});

	axios
		.post("/api/auth/hive", body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			returnErrors(err.response.data, err.response.status, "LOGIN_FAIL");
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};

// REGISTER HIVE USER
export const registerHive = ({
	firstname,
	lastname,
	username,
	email,
	profile_picture,
	hive_id,
}) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	// Req body
	const body = JSON.stringify({
		firstname,
		lastname,
		username,
		email,
		hive_id,
		profile_picture,
	});

	axios
		.post("/api/users/hive", body, config)
		.then((res) => {
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			returnErrors(
				err.response.data,
				err.response.status,
				"REGISTER_FAIL"
			);
			dispatch({
				type: REGISTER_FAIL,
			});
		});
};
