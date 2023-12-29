import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import React, { useEffect, lazy, Suspense } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { load_user } from './actions/auth'; // Import the load_user action
import './assets/css/argon-dashboard.min9c7f.css'
import Layout from './hoc/Layout';
import AddOders from './pages/sales/orders/AddOders';
import EditOrders from './pages/sales/orders/EditOrders'
import Orders from './pages/sales/orders/Orders'

// Lazy-loaded components
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Activate = lazy(() => import('./pages/auth/Activate'));
const Home = lazy(() => import('./pages/general/Home'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const ResetPasswordConfirm = lazy(() => import('./pages/auth/ResetPasswordConfirm'));
const AdminSignup = lazy(() =>  import('./pages/auth/AdminSignup'))

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
              <div className="spinner-border text-danger" role="status">
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

              </Routes>
            </Layout>
          </Suspense>
        </Router>
      </Provider>
  );
}

export default App;
