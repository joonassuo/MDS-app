import { GET_USERS } from "./types";
import axios from "axios";

export const getUsers = () => {
	return {
		type: GET_USERS,
	};
};

export const modifyUser = (id, data) => {
	console.log(id + " " + data);
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
