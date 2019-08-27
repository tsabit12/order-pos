import { combineReducers } from "redux";
import user from "./reducers/user";
import handover from "./reducers/handover";

export default combineReducers({
	user,
	handover
}); 