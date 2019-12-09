import { combineReducers } from "redux";
import user from "./reducers/user";
import handover from "./reducers/handover";
import order from "./reducers/order";
import petugas from "./reducers/petugas";
import dashboard from "./reducers/dashboard";
import purchase from "./reducers/purchase";
import pouser from "./reducers/pouser";
import ui from "./reducers/ui";
import invoice from "./reducers/invoice";
import laporan from "./reducers/laporan";
import pickup from "./reducers/pickup";
import mapping from "./reducers/mapping";

export default combineReducers({
	ui,
	laporan,
	user,
	handover,
	order,
	petugas,
	dashboard,
	purchase,
	pouser,
	invoice,
	pickup,
	mapping
}); 