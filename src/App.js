import React from 'react';
import PropTypes from "prop-types";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import OrderPage from "./components/pages/OrderPage";
import LacakPage from "./components/pages/LacakPage";
import AddPostingPage from "./components/pages/AddPostingPage";
import HandoverPage from "./components/pages/HandoverPage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";

const App = ({ location }) =>
  <div>
    <GuestRoute location={location} path="/" exact component={LoginPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <UserRoute location={location} path="/order" exact component={OrderPage} />
    <UserRoute location={location} path="/addposting" exact component={AddPostingPage} />
    <UserRoute location={location} path="/lacak" exact component={LacakPage} />
    <UserRoute location={location} path="/handover" exact component={HandoverPage} />
  </div>;  


App.propTypes = {
  location: PropTypes.shape({ 
    pathname: PropTypes.string.isRequired
  }).isRequired
}


export default App;
