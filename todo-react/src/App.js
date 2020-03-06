import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PageLayout from './components/Login/PageLayout';
import Dashboard from './components/Admin/Dashboard/PageLayout';
import Client from './components/Admin/Client/ListClient/PageLayout';
import RemovedClient from './components/Admin/Client/RemovedClient/PageLayout';
import Property from './components/Admin/Property/ListProperty/PageLayout';
import RemovedProperty from './components/Admin/Property/RemovedProperty/PageLayout';
import Administrator from './components/Admin/Administrator/ListAdministrator/PageLayout';
import RemovedAdministrator from './components/Admin/Administrator/RemovedAdministrator/PageLayout';
import PropertyType from './components/Admin/Settings/PropertyType/PageLayout';
import PaymentScheme from './components/Admin/Settings/PaymentScheme/PageLayout';
import AccountInfo from './components/Admin/Account/AccountInformation/PageLayout';
import ChangePassword from './components/Admin/Account/ChangePassword/PageLayout';
import Listings from './components/Admin/Listings/ListListings/PageLayout';
import Buy from './components/Admin/Transaction/Buy/PageLayout';
import Home from './components/Public/Home/Home';
import Inquiry from './components/Public/Inquiry/Home';
function App() {

  return (
    <Router>
     
      <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={PageLayout}></Route>
          <Route path="/dashboard" exact component={Dashboard}></Route>
          <Route path="/client" exact component={Client}></Route>
          <Route path="/client/removed" exact component={RemovedClient}></Route>
          <Route path="/property/" exact component={Property}></Route>
          <Route path="/property/removed" exact component={RemovedProperty}></Route>
          <Route path="/administrator/" exact component={Administrator}></Route>
          <Route path="/administrator/removed" exact component={RemovedAdministrator}></Route>
          <Route path="/propertytype" exact component={PropertyType}></Route>
          <Route path="/scheme" exact component={PaymentScheme}></Route>
          <Route path="/account" exact component={AccountInfo}></Route>
          <Route path="/account/password" exact component={ChangePassword}></Route>
          <Route path="/buy" exact component={Buy}></Route>
          <Route path="/inquire" exact component={Inquiry}></Route>
          <Route path="/listings" exact component={Listings}></Route>
        </Switch>
    </Router>
  );
}

export default App;
