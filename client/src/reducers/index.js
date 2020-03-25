import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import offerReducer from "./offerReducer";

export default combineReducers({
	user: userReducer,
	error: errorReducer,
	auth: authReducer,
	offer: offerReducer
});
