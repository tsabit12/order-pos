import { combineReducers } from "redux";
import user from "./reducers/user";
import handover from "./reducers/handover";
import order from "./reducers/order";
import gethandover from "./reducers/lasthandover";
import petugas from "./reducers/petugas";
import dashboard from "./reducers/dashboard";
import purchase from "./reducers/purchase";
import pouser from "./reducers/pouser";
import ui from "./reducers/ui";
import invoice from "./reducers/invoice";
import notifikasi from "./reducers/notifikasi";
import laporan from "./reducers/laporan";
import pickup from "./reducers/pickup";

export default combineReducers({
	ui,
	laporan,
	user,
	handover,
	order,
	gethandover,
	petugas,
	dashboard,
	purchase,
	pouser,
	invoice,
	notifikasi,
	pickup
}); 