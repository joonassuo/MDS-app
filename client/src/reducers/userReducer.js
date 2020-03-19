import { GET_USERS, ADD_USER, DELETE_USER } from "../actions/types";

const initialState = {
	users: [
		{
			firstname: "Joonas",
			lastname: "Suonpera",
			username: "joonassuo"
		},
		{
			firstname: "Sanna",
			lastname: "Silander",
			username: "Sannis"
		},
		{
			firstname: "Teemu",
			lastname: "Halme",
			username: "thalme"
		}
	]
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state
			};
		default:
			return state;
	}
}
