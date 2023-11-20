import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import Config from './utils/Config';
import Login from "./pages/auth/Login";
import LogoutComponent from './pages/auth/LogoutComponent';
import DashboardComponent from './pages/dashboard/DashboardComponent'
import HomeComponent from "./pages/HomeComponent";
import PaymentComponent from "./pages/payments/PaymentComponent";
import OrderComponent from "./pages/e-commerce/OrderComponent";
import OrderDetailsComponent from "./pages/e-commerce/OrderDetailsComponent";
import PaymentDetailsComponent from "./pages/payments/PaymentDetailsComponent";
import AddPaymentComponent from "./pages/payments/AddPaymentComponent";
import FarmerComponent from "./pages/farmer/FarmerComponent";
import AddFarmerComponent from "./pages/farmer/AddFarmerComponent";
import FarmerDetailsComponent from "./pages/farmer/FarmerDetailsComponent";
import CustomerComponent from "./pages/customer/CustomerComponent";
import AddCustomerComponent from "./pages/customer/AddCustomerComponent";
import CustomerDetailsComponent from "./pages/customer/CustomerDetailsComponent";
import CustomerBillComponent from "./pages/customer/CustomerBillComponent";
import TotalComponent from "./pages/payments/TotalComponent";
import CashComponent from "./pages/payments/CashComponent";
import BankComponent from "./pages/payments/BankComponent";
import PromoComponent from "./pages/payments/PromoComponent";
import TradeInComponent from "./pages/payments/TradeInComponent";
import KilosComponent from "./pages/dashboard/KilosComponent";
import 'react-datepicker/dist/react-datepicker.css';
import AnalyticsComponent from "./pages/e-commerce/AnalyticsComponent";
import ProfitComponent from "./pages/dashboard/ProfitComponent";
import DiscountComponent from './pages/dashboard/DiscountComponent';
import PaidFarmerComponent from './pages/dashboard/PaidFarmerComponent';
import OverHeadComponent from "./pages/dashboard/OverHeadComponent";
import MpesaComponent from "./pages/payments/MpesaComponent";
import DeliveryNoteComponent from "./pages/e-commerce/DeliveryNoteComponent";
import reportWebVitals from './reportWebVitals';
import TicketComponent from './pages/e-commerce/TicketComponent';
import TicketDetailsComponent from './pages/e-commerce/TicketDetailsComponent';
import InvoiceDetailsComponent from './pages/e-commerce/InvoiceDetailsComponent';
import InvoiceComponent from './pages/e-commerce/InvoiceComponent';
import FarmerStock from './pages/farmer/FaremerStock';
import AddStockComponent from './pages/farmer/AddStockComponent';
import FarmerStockdetails from './pages/farmer/FarmerStockDetails';
import Register from './pages/auth/Register';
import Activate from './pages/auth/Activate';
import ChangePassword from './pages/auth/ChangePassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OverPayment from './pages/payments/OverPayment';
import DebtorsComponent from './pages/payments/DebtorsComponent';
import BalanceComponent from './pages/payments/BalanceComponent';
import Untitled from './pages/Untitled';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
ReactDOM.render(
  <Router>
    <Switch>
      <Route 
          exact path="/login" 
          component={Login}
      >
      </Route> 

      <Route 
          exact path="/" 
          component={Login}
      >
      </Route> 

      <Route 
          exact path="/register" 
          component={Register}
      >
      </Route> 

      <Route 
          exact path="/activate/:uidb64/:token" 
          component={Activate}
      >
      </Route> 

      <Route 
          exact path="/reset-password" 
          component={ForgotPassword}
      >
      </Route> 

      <Route 
          exact path="/reset-password-confirm/:uidb64/:token" 
          component={ResetPassword}
      >
      </Route> 

      <PrivateRoute 
          exact path="/reset-password" 
          page={ChangePassword}
      >
      </PrivateRoute> 


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
        exact path="/payments"
        activepage="3"
        page={PaymentComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/addpayment"
          activepage="3"
          page={AddPaymentComponent}
      >
      </PrivateRoute>

      <PrivateRoute
            exact path="/mpesapayments"
            activepage="12"
            page={MpesaComponent}
        >
        </PrivateRoute>

      <PrivateRoute
          exact path="/paymentdetails/:id"
          activepage="3"
          page={PaymentDetailsComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/orders"
          activepage="4"
          page={OrderComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/ordersdetails/:id"
          activepage="4"
          page={OrderDetailsComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/customer"
          activepage="5"
          page={CustomerComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/addcustomer"
          activepage="5"
          page={AddCustomerComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/customerdetails/:id"
          activepage="5"
          page={CustomerDetailsComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/farmer"
          activepage="6"
          page={FarmerComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/addfarmer"
          activepage="6"
          page={AddFarmerComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/farmerdetails/:id"
          activepage="6"
          page={FarmerDetailsComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/customerbillgenerate"
          activepage="7"
          page={CustomerBillComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/analytics"
          activepage="8"
          page={AnalyticsComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/kilos"
          activepage="11"
          page={KilosComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/total"
          activepage="12"
          page={TotalComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/cashpayments"
          activepage="12"
          page={CashComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/Bankpayments"
          activepage="12"
          page={BankComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/promo"
          activepage="12"
          page={PromoComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/tradein"
          activepage="12"
          page={TradeInComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/profit"
          activepage="12"
          page={ProfitComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/paidfarmers"
          activepage="12"
          page={PaidFarmerComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/discount"
          activepage="12"
          page={DiscountComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/overhead"
          activepage="12"
          page={OverHeadComponent}
      >
      </PrivateRoute>

     <PrivateRoute
          exact path="/delivery"
          activepage="13"
          page={DeliveryNoteComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/invoice"
          activepage="14"
          page={InvoiceComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/invoicedetails/:id"
          activepage="14"
          page={InvoiceDetailsComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/ticketsdetails/:id"
          activepage="15"
          page={TicketDetailsComponent}
      >
      </PrivateRoute>

     <PrivateRoute
          exact path="/tickets"
          activepage="15"
          page={TicketComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/stock"
          activepage="16"
          page={FarmerStock}
      >
      </PrivateRoute> 

      <PrivateRoute
          exact path="/addstock"
          activepage="16"
          page={AddStockComponent}
      >
      </PrivateRoute> 

      <PrivateRoute
          exact path="/stockdetails/:id"
          activepage="16"
          page={FarmerStockdetails}
      >
      </PrivateRoute> 

      <PrivateRoute
          exact path="/underpayment"
          activepage="97"
          page={DebtorsComponent}
      >
      </PrivateRoute> 

      <PrivateRoute
          exact path="/overpayment"
          activepage="97"
          page={OverPayment}
      >
      </PrivateRoute> 

      <PrivateRoute
          exact path="/balance"
          activepage="97"
          page={BalanceComponent}
      >
      </PrivateRoute>

      <PrivateRoute
          exact path="/untitled"
          activepage="97"
          page={Untitled}
      >
      </PrivateRoute> 

      <PrivateRoute
        exact path="/dashboard"
        activepage="9"
        page={DashboardComponent}
      >
      </PrivateRoute>
    </Switch>
  </Router>
,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
