import React from 'react';
import PropTypes from "prop-types";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import OrderPage from "./components/pages/OrderPage";
import LacakPage from "./components/pages/LacakPage";
import ReqPickupPage from "./components/pages/ReqPickupPage";
import RealTransactionPage from "./components/pages/RealTransactionPage";
import EntriPoPage from "./components/pages/EntriPoPage";
import SignupPage from "./components/pages/SignupPage";
import AssigmentPage from "./components/pages/AssigmentPage";
import HandOverPage from "./components/pages/HandOverPage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";

const App = ({ location }) =>
  <div>
    <GuestRoute location={location} path="/" exact component={LoginPage} />
    <GuestRoute location={location} path="/signup" exact component={SignupPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <UserRoute location={location} path="/order" exact component={OrderPage} />
    <UserRoute location={location} path="/lacak" exact component={LacakPage} />
    <UserRoute location={location} path="/pickup" exact component={ReqPickupPage} />
    <UserRoute location={location} path="/transaction" exact component={RealTransactionPage} />
    <UserRoute location={location} path="/po" exact component={EntriPoPage} />
    <UserRoute location={location} path="/assigment" exact component={AssigmentPage} />
    <UserRoute location={location} path="/handover" exact component={HandOverPage} />
  </div>;  


App.propTypes = {
  location: PropTypes.shape({ 
    pathname: PropTypes.string.isRequired
  }).isRequired
}


export default App;
