import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
	user: userReducer,
	error: errorReducer,
	auth: authReducer
});
