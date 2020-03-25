import axios from "axios";
import { returnErrors } from "./errorActions";

import { GET_OFFERS, OFFERS_LOADING, GET_OFFERS_ERROR } from "./types";

// Get all offers and dispatch to state
export const getOffers = () => dispatch => {
	// offers loading
	dispatch({ type: OFFERS_LOADING });

	// get all offers from DB
	axios
		.get("/api/offers")
		.then(res => {
			dispatch({
				type: GET_OFFERS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: GET_OFFERS_ERROR
			});
		});
};
