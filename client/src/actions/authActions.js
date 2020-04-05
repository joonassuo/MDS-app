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

// REGISTER USER
export const registerUser = ({
	firstname,
	lastname,
	username,
	email,
	password,
}) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	// Request body
	const body = JSON.stringify({
		firstname,
		lastname,
		username,
		email,
		password,
	});

	axios
		.post("/api/users", body, config)
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

// LOGIN USER
export const loginUser = ({ email, password }) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	// Request body
	const body = JSON.stringify({ email, password });

	axios
		.post("/api/auth", body, config)
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

// LOGOUT USER
export const logoutUser = () => (dispatch) => {
	dispatch({ type: LOGOUT_SUCCESS });
};

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING });

	// Get token from local storage
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	// If token, then add to headers
	if (token) {
		config.headers["x-auth-token"] = token;
	}

	axios
		.get("/api/auth/user", config)
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			console.log(err);

			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};
