import axios from "axios";
import { USER_LOADED } from "./types";

export const getUser = (id) => (dispatch) => {
	axios
		.get("/api/users/" + id)
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			console.log(err);
		});
};

export const modifyUser = (id, data) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			id,
		},
	};

	axios
		.put("/api/users", data, config)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};

export const addUserNotification = (id, data) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			id,
		},
	};

	axios
		.put("/api/users/notification", data, config)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};

export const deleteUserNotification = (id, n) => {
	const config = {
		headers: {
			"Content-type": "application/json",
			id,
			n,
		},
	};

	axios
		.put("/api/users/notification/delete", {}, config)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};
