import React, { Component } from 'react';
import APIHandler from "../../utils/APIHandler";
import swal from 'sweetalert2';
import { Link } from "react-router-dom";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            btnDisabled: true,
            loginStatus: 0,
        };
        this.formSubmit = this.formSubmit.bind(this); // Add this line to bind the formSubmit method
    }

    saveInputs = (event) => {
        var key = event.target.name;
        this.setState({ [key]: event.target.value });

        // Check if all required fields are filled
        const { email } = this.state;
        if (email !== "") {
            this.setState({ btnDisabled: false });
        } else {
            this.setState({ btnDisabled: true });
        }
    };

    async formSubmit(event) {
        event.preventDefault();
        var apiHandler = new APIHandler();
        var response = await apiHandler.resetUserData(
          this.state.email, // Use the email from the component's state
        );

        console.log(response);
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });

        if (this.state.errorRes === false) {
          // Show the success message and redirect to the login page
          swal.fire(
            "A password reset link has been sent to your email.",
            "",
            "success"
          );
          this.props.history.push("/login");
        } else {
          // Show the error message
          swal.fire(
            "An Account With Those Credentials Already Exists. Try Logging in",
            "",
            "error"
          );
        }
      }      

  render() {
    const { success } = this.state;

    return (
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <img src="../../assets/images/logo192.png" alt="logo" />
                </div>
                <h4>PASSWORD RESET!</h4>
                <h6 className="font-weight-light">
                  Enter your email below to reset your account password
                </h6>
                <form className="pt-3" onSubmit={this.formSubmit}>
                  <div className="mt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        onChange={this.saveInputs}
                        placeholder="Email"
                      />
                    </div>
                    <input
                      type="submit" // Change the type to "submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      value="RESET"
                    />
                  </div>
                    <div className="text-center mt-4 font-weight-light">
                        Log into your account? <Link to={"/login"} className="text-primary">Login</Link>
                    </div>
                </form>
                {success && <div className="success-message">{success}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
