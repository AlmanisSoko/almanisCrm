import React from "react";
import { Link } from "react-router-dom";
import APIHandler from "../utils/APIHandler";
import swal from 'sweetalert2';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.formSubmit = this.formSubmit.bind(this); // Add this line to bind the formSubmit method
    }

    state = {
        name: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        btnDisabled: true,
        loginStatus: 0,
    };

    saveInputs = (event) => {
        var key = event.target.name;
        this.setState({ [key]: event.target.value });

        // Check if all required fields are filled
        const { name, username, phone, email, password } = this.state;
        if (name !== ""  && phone !== "" && email !== "" && password !== "") {
            this.setState({ btnDisabled: false });
        } else {
            this.setState({ btnDisabled: true });
        }
    };

    async formSubmit(event) {
        event.preventDefault();
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveUserData(
          event.target.name.value,
          event.target.phone.value,
          event.target.email.value,
          event.target.password.value,
        );
      
        console.log(response);
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
      
        if (this.state.errorRes === false) {
          // Show the success message and redirect to the login page
          swal.fire(
            "Account Created Successfully. An activation email has been sent.",
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
        return(
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row flex-grow">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left p-5">
                                <div className="brand-logo">
                                <img src="../../assets/images/logo192.png" alt="logo"/>
                                </div>
                                <h4>Create An Account</h4>
                                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                                <form className="pt-3" onSubmit={this.formSubmit} ref={this.formRef}>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" name="name" onChange={this.saveInputs} placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" name="phone" onChange={this.saveInputs} placeholder="Phone" />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-lg" name="email" onChange={this.saveInputs} placeholder="Email" />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" name="password" onChange={this.saveInputs} placeholder="Password" />
                    </div>
                    <div className="mb-4">
                        <div className="form-check">
                            <label className="form-check-label text-muted">
                                <input type="checkbox" className="form-check-input" /> I agree to all Terms &amp; Conditions </label>
                        </div>
                    </div>
                    <div className="mt-3">
                        <button
                            type="submit"
                            className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                            disabled={this.state.btnDisabled}
                        >
                            SIGN UP
                        </button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                        Already have an account? <Link to={"/login"} className="text-primary">Login</Link>
                    </div>
                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;
