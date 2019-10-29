import React from 'react';
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
// import OrderPage from "./components/pages/OrderPage";
import OrderPageNew from "./components/pages/OrderPageNew";
import LacakPage from "./components/pages/LacakPage";
import ReqPickupPage from "./components/pages/ReqPickupPage";
import RealTransactionPage from "./components/pages/RealTransactionPage";
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


const App = ({ location }) =>
  <Switch>
    <GuestRoute location={location} path="/" exact component={HomePage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/signup" exact component={SignupPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <UserRoute location={location} path="/order" exact component={OrderPageNew} />
    <UserRoute location={location} path="/lacak" exact component={LacakPage} />
    <UserRoute location={location} path="/pickup" exact component={ReqPickupPage} />
    <UserRoute location={location} path="/transaction" exact component={RealTransactionPage} />
    <UserRoute location={location} path="/po" exact component={EntriPoPage} />
    <UserRoute location={location} path="/assigment" exact component={AssigmentPage} />
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
    <UserRoute location={location} path="*" exact component={PageNotFound} />
  </Switch>;  


App.propTypes = {
  location: PropTypes.shape({ 
    pathname: PropTypes.string.isRequired
  }).isRequired
}


export default App;
