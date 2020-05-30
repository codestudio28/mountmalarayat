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
import Payment from './components/Admin/Transaction/Payment/PageLayout';
import Payable from './components/Admin/Transaction/Payable/PageLayout';
import SinglePayment from './components/Admin/Transaction/Payment/Index';
import Home from './components/Public/Home/Home';
import Inquiry from './components/Public/Inquiry/Home';
import ReportProperty from './components/Admin/Report/ListProperty/PageLayout';
import ReportClient from './components/Admin/Report/ListClient/PageLayout';
import ReportPaymentType from './components/Admin/Report/PaymentType/PageLayout';
import ReportIncome from './components/Admin/Report/Income/PageLayout';
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
          <Route path="/payment" exact component={Payment}></Route>
          <Route path="/payable" exact component={Payable}></Route>
          <Route path="/inquire" exact component={Inquiry}></Route>
          <Route path="/listings" exact component={Listings}></Route>
          <Route path="/property-report" exact component={ReportProperty}></Route>
          <Route path="/client-report" exact component={ReportClient}></Route>
          <Route path="/paymenttype-report" exact component={ReportPaymentType}></Route>
          <Route path="/collection-report" exact component={ReportIncome}></Route>
          <Route path="/payment/:id" exact component={SinglePayment}></Route>
        </Switch>
    </Router>
  );
}

export default App;
