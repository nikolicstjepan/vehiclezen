import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

import Layout from "./components/layout";
import LoginUser from "./features/user/LoginUser";
import RegisterUser from "./features/user/RegisterUser";
import VehiclesList from "./features/vehicles/VehiclesList";
import AddVehicle from "./features/vehicles/AddVehicle";

export default function App() {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={VehiclesList} />
          <Route exact path="/new" component={AddVehicle} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/login" component={LoginUser} />
        </Switch>
      </Layout>
    </Router>
  );
}
