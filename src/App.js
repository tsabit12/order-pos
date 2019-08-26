import React from 'react';
import PropTypes from "prop-types";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";

const App = ({ location }) =>
  <div>
    <GuestRoute location={location} path="/" exact component={LoginPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
  </div>;  


App.propTypes = {
  location: PropTypes.shape({ 
    pathname: PropTypes.string.isRequired
  }).isRequired
}


export default App;
