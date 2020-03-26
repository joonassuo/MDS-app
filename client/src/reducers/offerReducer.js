import {
	GET_OFFERS,
	OFFERS_LOADING,
	GET_OFFERS_ERROR,
	ADD_OFFER_SUCCESS
} from "../actions/types";

const initialState = {
	offers: [],
	isLoading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_OFFERS:
			return {
				...state,
				offers: action.payload,
				isLoading: false
			};
		case OFFERS_LOADING:
			return {
				...state,
				isLoading: true
			};
		case GET_OFFERS_ERROR:
			return {
				...state,
				offers: [],
				isLoading: false
			};
		case ADD_OFFER_SUCCESS:
			return {
				...state,
				offers: [...state.offers, action.payload]
			};
		default:
			return state;
	}
}
