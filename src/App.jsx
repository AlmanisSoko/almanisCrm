import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import React, { useEffect, lazy, Suspense } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { load_user } from './actions/auth'; // Import the load_user action
import './assets/css/argon-dashboard.min9c7f.css'
import Layout from './hoc/Layout';

// Lazy-loaded components
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Activate = lazy(() => import('./pages/auth/Activate'));
const Home = lazy(() => import('./pages/general/Home'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const ResetPasswordConfirm = lazy(() => import('./pages/auth/ResetPasswordConfirm'));
const AdminSignup = lazy(() =>  import('./pages/auth/AdminSignup'));
const AddOders = lazy(() => import('./pages/sales/orders/AddOders'));
const EditOrders = lazy(() => import('./pages/sales/orders/EditOrders'));
const Orders = lazy(() => import('./pages/sales/orders/Orders'));
const Customer = lazy(() => import('./pages/sales/customer/Customer'))
const AddCustomer = lazy(() => import('./pages/sales/customer/AddCustomer'))
const EditCustomer = lazy(() => import('./pages/sales/customer/EditCustomer'))
const Farmer = lazy(() => import('./pages/sales/farmer/Farmer'))
const AddFarmer = lazy(() => import('./pages/sales/farmer/AddFarmer'))
const EditFarmer = lazy(() => import('./pages/sales/farmer/EditFarmer'))
const Payments = lazy(() => import('./pages/sales/payments/Payments'))
const AddPayments = lazy(() => import('./pages/sales/payments/AddPayments'))
const EditPayments = lazy(() => import('./pages/sales/payments/EditPayments'))
const Invoice = lazy(() => import('./pages/sales/invoice/Invoice'))
const DownloadInvoice = lazy(() => import('./pages/sales/invoice/DownloadInvoice'))
const Analytics = lazy(() => import('./pages/dashboard/Analytics'))

function App() {
  useEffect(() => {
    // Load user when the app loads
    store.dispatch(load_user());
  }, []);

  return (
      <Provider store={store}>
      <ToastContainer position="bottom-right" autoClose={5000} />
        <Router>
          <Suspense fallback={<div className="d-flex justify-content-center align-items-center min-vh-100">
              <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
              </div>
            </div>}>
            <Routes>
              {/* Auth Pages */}
              <Route exact path="/" element={<Login />}/>
              <Route exact path="/signup" element={<Signup />}/>
              <Route path="/admin-signup" element={<AdminSignup />} />
              <Route exact path="/activate/:uid/:token" element={<Activate />}/>
              <Route exact path="/reset-password" element={<ResetPassword />}/>
              <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />}/>
              
            </Routes>
            <Layout>
              <Routes>
                <Route exact path="/home" element={<Home />}/>

                {/* / Orders */}
                <Route exact path="/neworders" element={<AddOders />}/>
                <Route exact path="/orders" element={<Orders />}/>
                <Route exact path="/ordersdetails/:id" element={<EditOrders />}/>

                {/* Customers */}
                <Route exact path="/customer" element={<Customer />}/>
                <Route exact path="/addcustomer" element={<AddCustomer />}/>
                <Route exact path="/customerdetails/:id" element={<EditCustomer />}/>

                {/* farmers */}
                <Route exact path="/farmer" element={<Farmer />}/>
                <Route exact path="/addfarmer" element={<AddFarmer />}/>
                <Route exact path="/farmerdetails/:id" element={<EditFarmer />}/>

                {/* Payments */}
                <Route exact path="/payments" element={<Payments />}/>
                <Route exact path="/addpayment" element={<AddPayments />}/>
                <Route exact path="/paymentsdetails/:id" element={<EditPayments />}/>

                {/* Invoice */}         
                <Route exact path="/invoice" element={<Invoice />} />
                <Route exact path="/download-invoice/:id" element={<DownloadInvoice />} />

                {/* Analytics & Dasboard */}         
                <Route exact path="/analytics" element={<Analytics />} />

              </Routes>
            </Layout>
          </Suspense>
        </Router>
      </Provider>
  );
}

export default App;
