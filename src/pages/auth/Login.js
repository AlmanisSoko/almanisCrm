import React from "react";
import AuthHandler from "../../utils/AuthHandler";
import { Redirect } from "react-router-dom";
import Config from "../../utils/Config";
import { Link } from "react-router-dom";

class Login extends React.Component {

  state = {
    email: "",
    password: "",
    btnDisabled: true,
    loginStatus: 0,
  };

  saveInputs = (event) => {
    var key = event.target.id;
    this.setState({ [key]: event.target.value });
    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  formSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ loginStatus: 1 });
    AuthHandler.login(
      this.state.email,
      this.state.password,
      this.handleAjaxResponse
    );
  };

  handleAjaxResponse = (data) => {
    console.log(data);
    if (data.error) {
      this.setState({ loginStatus: 4 });
    } else {
      this.setState({ loginStatus: 3 });
      window.location = Config.homeUrl;
    }
  };

  getMessages = () => {
    if (this.state.loginStatus === 0) {
      return "";
    } else if (this.state.loginStatus === 1) {
      return (
      <div className="alert alert-fill-warning">
          <i className="mdi mdi-alert-circle"></i><strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (this.state.loginStatus === 3) {
      return (
        <div className="alert alert-fill-success" role="alert">
          <i className="mdi mdi-alert-circle"></i><strong>Login Successfull!</strong>
        </div>
      );
    } else if (this.state.loginStatus === 4) {
      return (
        <div className="alert alert-fill-danger">
          <i className="mdi mdi-alert-circle"></i><strong>Error During Login Invalid Login Credentials..</strong>
        </div>
      );
    }
  };

    render() {
      if (AuthHandler.loggedIn()) {
        return <Redirect to={Config.homeUrl} />;
      }
       
        return (
          <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
              <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                <div className="row flex-grow">
                  <div className="col-lg-6 d-flex align-items-center justify-content-center">
                    <div className="auth-form-transparent text-left p-3">
                      <div className="brand-logo">
                        <img src="../../assets/images/logo192.png" alt="logo"/>
                        {/* <h2>ALMANIS</h2> */}
                      </div>
                      <h4>Welcome back!</h4>
                      <h6 className="font-weight-light">Happy to see you again!</h6>
                      <form className="pt-3" method="POST" onSubmit={this.formSubmit}>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail">email</label>
                          <div className="input-group">
                            <div className="input-group-prepend bg-transparent">
                              <span className="input-group-text bg-transparent border-right-0">
                                <i className="mdi mdi-account-outline text-primary"></i>
                              </span>
                            </div>
                            <input type="text" className="form-control form-control-lg border-left-0" id="email" placeholder="email" required autoFocus onChange={this.saveInputs} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword">Password</label>
                          <div className="input-group">
                            <div className="input-group-prepend bg-transparent">
                              <span className="input-group-text bg-transparent border-right-0">
                                <i className="mdi mdi-lock-outline text-primary"></i>
                              </span>
                            </div>
                            <input type="password" className="form-control form-control-lg border-left-0" id="password" placeholder="Password" required onChange={this.saveInputs} />
                          </div>
                        </div>
                        <div className="my-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <label className="form-check-label">
                            <input type="checkbox" className="form-check-input"/> Keep me signed in </label>
                          </div>
                          <Link to={"reset-password"} className="auth-link text-black">Forgot password?</Link>
                        </div>
                        <div className="my-3">
                          <button className="btn btn-rounded btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit" disabled={this.state.btnDisabled}>
                            LOGIN
                          </button>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                          Don't have an account? <Link to={"register"} className="text-primary">Register</Link>
                        </div>
                        
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 login-half-bg d-flex flex-row">
                  
                   <p className="text-white font-weight-medium text-center flex-grow align-self-end">{this.getMessages()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Login;
