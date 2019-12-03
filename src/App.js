import React from 'react';
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import OrderPage from "./components/pages/OrderPage";
import LacakPage from "./components/pages/LacakPage";
// import ReqPickupPage from "./components/pages/ReqPickupPage";
import EntriPoPage from "./components/pages/EntriPoPage";
import SignupPage from "./components/pages/SignupPage";
import AssigmentPage from "./components/pages/AssigmentPage";
import HandOverPage from "./components/pages/HandOverPage";
import PetugasPage from "./components/pages/PetugasPage";
import TopupPage from "./components/pages/TopupPage";
import TopupForm from "./components/forms/TopupForm";
import InvoicePage from "./components/pages/InvoicePage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
import PageListPo from "./components/pages/PageListPo"; 
import ListInvoicePage from "./components/pages/ListInvoicePage";
import HomePage from "./components/pages/HomePage";
import UserPage from "./components/pages/UserPage";
import PetugasPickupPage from "./components/pages/PetugasPickupPage";
import DetailPo from "./components/po/DetailPo";
import AddUserPage from "./components/pages/AddUserPage";
import DetailInvoicePage from "./components/pages/DetailInvoicePage";
import PageNotFound from "./components/pages/PageNotFound";
import ConfirmTopupPage from "./components/pages/ConfirmTopupPage";
import ConfirmationAkunPage from "./components/pages/ConfirmationAkunPage";
import ChangePasswordPage from "./components/pages/ChangePasswordPage";
import LaporanOrderPage from "./components/pages/LaporanOrderPage";
import AddPetugasPickupPage from "./components/pages/AddPetugasPickupPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import LaporanAssigmentPage from "./components/pages/LaporanAssigmentPage";
import LaporanHandoverPage from "./components/pages/LaporanHandoverPage";
import SelesaiAntarPage from "./components/pages/SelesaiAntarPage";
import LaporanPickupPage from "./components/pages/LaporanPickupPage";
import EntriPickupPage from "./components/pages/EntriPickupPage";
import PickupPage from "./components/pages/PickupPage";

const App = ({ location, level }) =>
  <Switch>
    <Route location={location} path="/" exact component={HomePage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/signup" exact component={SignupPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <UserRoute location={location} path="/order" exact component={OrderPage} />
    <UserRoute location={location} path="/lacak" exact component={LacakPage} />
    <UserRoute location={location} path="/pickup" exact component={PickupPage} />
    <UserRoute location={location} path="/po" exact component={EntriPoPage} />
    { level === '01' && <UserRoute location={location} path="/assignment" exact component={AssigmentPage} />}
    <UserRoute location={location} path="/handover" exact component={HandOverPage} />
    <UserRoute location={location} path="/petugas" exact component={PetugasPage} />
    <UserRoute location={location} path="/topup/:id" exact component={TopupPage} />
    <UserRoute location={location} path="/topup" exact component={TopupForm} />
    <UserRoute location={location} path="/invoice" exact component={InvoicePage} />
    <UserRoute location={location} path="/list_po" exact component={PageListPo} />
    <UserRoute location={location} path="/list_po/:id" exact component={DetailPo} />
    <UserRoute location={location} path="/laporan_invoice" exact component={ListInvoicePage} />
    <UserRoute location={location} path="/user" exact component={UserPage} />
    <UserRoute location={location} path="/user/add" exact component={AddUserPage} />
    <UserRoute location={location} path="/pickup/petugas" exact component={PetugasPickupPage} />
    <UserRoute location={location} path="/detail_invoice/:noinvoice" exact component={DetailInvoicePage} />
    <UserRoute location={location} path="/notifikasi/topup" exact component={ConfirmTopupPage} />
    <UserRoute location={location} path="/confirmation/akun/:token" exact component={ConfirmationAkunPage} />
    <UserRoute location={location} path="/changepassword" exact component={ChangePasswordPage} />
    <UserRoute location={location} path="/list_order" exact component={LaporanOrderPage} />
    <UserRoute location={location} path="/pickup/petugas/tambah" exact component={AddPetugasPickupPage} />
    <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
    <GuestRoute location={location} path="/change_password/:token" exact component={ForgotPasswordForm} />
    <UserRoute location={location} path="/laporan/assignment" exact component={LaporanAssigmentPage} />
    <UserRoute location={location} path="/laporan/handover" exact component={LaporanHandoverPage} />
    <UserRoute location={location} path="/laporan/selesai_antar" exact component={SelesaiAntarPage} />
    <UserRoute location={location} path="/laporan/pickup" exact component={LaporanPickupPage} />
    { level === '01' && <UserRoute location={location} path="/entri_pickup" exact component={EntriPickupPage} />}
    <UserRoute location={location} path="*" exact component={PageNotFound} />
  </Switch>;  


App.propTypes = {
  location: PropTypes.shape({ 
    pathname: PropTypes.string.isRequired
  }).isRequired,
  level: PropTypes.string
}

function mapStateToProps(state) {
    return{
        level: state.user.level
    }
}

export default connect(mapStateToProps, null)(App);
