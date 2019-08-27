import { combineReducers } from "redux";
import user from "./reducers/user";
import handover from "./reducers/handover";
import order from "./reducers/order";

export default combineReducers({
	user,
	handover,
	order
}); 