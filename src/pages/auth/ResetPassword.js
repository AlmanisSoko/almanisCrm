import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

class ResetPassword extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    error: '',
    success: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
      success: '',
    });
  };

  formSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
  
    if (password !== confirmPassword) {
      this.setState({ error: "Passwords don't match." });
      return;
    }
  
    const { uidb64, token } = this.props.match.params;
  
    axios
      .post(`https://test.tarase.com/api/reset-password-confirm/${uidb64}/${token}/`, {
        password, // Send the password in the request body
      })
      .then((response) => {
        swal.fire('Password Reset Successful!', response.data.message, 'success')
          .then(() => {
            // Redirect to the login page here (e.g., using react-router or window.location)
            this.props.history.push('/login');
          });
      })
      .catch((error) => {
        this.setState({ error: error.response.data.message }, () => {
          swal.fire('Oops! Something went wrong', this.state.error, 'error');
        });
      });
  };
    

  render() {
    const { password, confirmPassword, error, success } = this.state;

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
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="password"
                      id="password"
                      value={password}
                      onChange={this.handleChange} // Update this line
                      placeholder="Password"
                    />
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange} // Update this line
                        placeholder="Confirm Password"
                      />
                      {error && <div className="text-danger">{error}</div>}
                    </div>
                    <input
                      type="submit" // Change the type to "submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      value="RESET"
                      disabled={this.state.btnDisabled}
                    />
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

export default ResetPassword;
