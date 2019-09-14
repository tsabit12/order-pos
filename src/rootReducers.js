import { combineReducers } from "redux";
import user from "./reducers/user";
import handover from "./reducers/handover";
import order from "./reducers/order";
import gethandover from "./reducers/lasthandover";
import petugas from "./reducers/petugas";
import dashboard from "./reducers/dashboard";

export default combineReducers({
	user,
	handover,
	order,
	gethandover,
	petugas,
	dashboard
}); 