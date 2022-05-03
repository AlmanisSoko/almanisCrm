import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import HomeComponent from "./pages/HomeComponent";
import OrderComponent from "./pages/OrderComponent";
import OrderDetailsComponent from "./pages/OrderDetailsComponent";
import PaymentComponent from "./pages/PaymentComponent";
import AddPaymentComponent from "./pages/AddPaymentComponent";
import FarmerComponent from "./pages/FarmerComponent";
import AddFarmerComponent from "./pages/AddFarmerComponent";
import FarmerDetailsComponent from "./pages/FarmerDetailsComponent";
import CustomerComponent from "./pages/CustomerComponent";
import AddCustomerComponent from "./pages/AddCustomerComponent";
import CustomerDetailsComponent from "./pages/CustomerDetailsComponent";
import DashboardComponent from "./pages/DashboardComponent";
import CustomerBillComponent from "./pages/CustomerBillComponent";
import { PrivateRoute } from "./utils/PrivateRoute";
import LogoutComponent from "./pages/LogoutComponent";
import Config from "./utils/Config";

ReactDOM.render(
    <Router>
        <Switch>

            <Route 
                exact path="/" 
                component={Login}
            >
            </Route>

            <Route 
                exact path={Config.logoutPageUrl} 
                component={LogoutComponent}
            >
            </Route>

            <PrivateRoute
                exact path="/neworders"
                activepage="1"
                page={HomeComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/orders"
                activepage="3"
                page={OrderComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/ordersdetails/:id"
                activepage="3"
                page={OrderDetailsComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/payments"
                activepage="2"
                page={PaymentComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/addpayment"
                activepage="2"
                page={AddPaymentComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/farmer"
                activepage="5"
                page={FarmerComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/addfarmer"
                activepage="5"
                page={AddFarmerComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/farmerdetails/:id"
                activepage="5"
                page={FarmerDetailsComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/customer"
                activepage="4"
                page={CustomerComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/addcustomer"
                activepage="4"
                page={AddCustomerComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/customerdetails/:id"
                activepage="4"
                page={CustomerDetailsComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/customerbillgenerate"
                activepage="6"
                page={CustomerBillComponent}
            >
            </PrivateRoute>

            <PrivateRoute
                exact path="/dashboard"
                activepage="7"
                page={DashboardComponent}
            >
            </PrivateRoute>

            

        </Switch>
    </Router>
    ,document.getElementById('root'));
