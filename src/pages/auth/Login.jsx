import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import backgroundImage from '../../assets/images/login-bg.jpg'

const Login = ({ login, isAuthenticated, user }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const { email, password } = formData;

    const onChange = (e) =>
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(email, password);
      } catch (err) {
        alert('Confirm login credentials')
        console.log(err);
      }
    };
  
    const continueWithGoogle = async () => {
      try {
        // const response = await fetch('https://test.tarase.com/auth/o/google-oauth2/?redirect_uri=https://auth.tarase.com');
        const response = await fetch('http://127.0.0.1:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:3000');
        const data = await response.json();
        window.location.replace(data.authorization_url);
      } catch (error) {
        console.log(error);
      }
    }

    //is authenticated redirect
    if (isAuthenticated) {
        return (
            navigate('/home')
        );
    } 

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            console.log(response)
    
            if (response.success) {
                // Display a success toast only when the login is successful
                toast.success('Login successful', { toastId: 'success' });
                navigate('/home');
            } else if (response.error) {
                // If the API response contains an 'error' property, show an error toast with the error message.
                toast.error(response.error, { toastId: 'error' });
            } else {
                // Handle other unexpected responses.
                toast.error('An error occurred. Please try again.', { toastId: 'error' });
            }
        } catch (err) {
            // Handle any other errors, e.g., network issues, and show an error toast.
            toast.error('An error occurred. Please try again.', { toastId: 'error' });
            console.log(err);
        }
    };  

    return (
        <main className="main-content main-content-bg mt-0 ps">
            <div className="page-header min-vh-100" style={{backgroundImage: `url(${backgroundImage})`, backgroundPosition: "center center"}}>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-7">
                            <div className="card border-0 mb-0">

                                <div className="card-header bg-transparent">
                                    <h5 className="text-dark text-center mt-2 mb-3">Sign in</h5>
                                    <div className="btn-wrapper text-center">
                                        <a onClick={continueWithGoogle} className="btn btn-neutral btn-icon btn-sm mb-0">
                                            <img className="w-30" src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/logos/google.svg"/>
                                            Google
                                        </a>
                                    </div>
                                </div>

                                <div className="card-body px-lg-5 pt-0">
                                    
                                    <form className="text-start" method="POST" onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                placeholder="Email" 
                                                name="email"
                                                aria-label="Email"
                                                value={email}
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                placeholder="Password" 
                                                aria-label="Password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => onChange(e)}
                                            />
                                        </div>
                                        <div className="form-check form-switch">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="rememberMe"
                                            />
                                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                        </div>
                                        <div className="form-check-label mt-2">
                                            Forgot password? 
                                            <Link to="/reset-password" className="text-dark font-weight-bolder">Reset</Link>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2" onClick={handleLogin}>Login</button>
                                        </div>
                                        <div className="form-check-label mt-2">
                                            Don't have an account? 
                                            <Link to="/signup" className="text-dark font-weight-bolder">Sign Up</Link>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
