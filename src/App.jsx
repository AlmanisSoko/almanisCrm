import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import React, { useEffect, lazy, Suspense } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { load_user } from './actions/auth'; // Import the load_user action
import './assets/css/argon-dashboard.min9c7f.css'

// Lazy-loaded components
const Login = lazy(() => import('./pages/auth/Login'));

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
            
          </Routes>
          </Suspense>
        </Router>
      </Provider>
  );
}

export default App;