import React, { Component } from 'react';
import axios from 'axios';

class Activate extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    message: '',
    error: false,
  };

  activateAccount = (uidb64, token) => {
    axios
      // .get(`http://127.0.0.1:8000/api/activate/${uidb64}/${token}/`)
      .get(`https://api.jaafrikaimages.org/api/activate/${uidb64}/${token}/`)
      .then((response) => {
        this.setState({
          message: response.data.message,
          error: false,
        });

        // Redirect to login page after successful activation
        this.props.history.push('/login');
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.message,
          error: true,
        });
      });
  };

  handleVerifyClick = () => {
    const { uidb64, token } = this.props.match.params;
    this.activateAccount(uidb64, token);
  };

  render() {
    const { message, error } = this.state;

    return (
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <img src="../../assets/images/logo192.png" alt="logo" />
                </div>
                <h4>Verify Account</h4>
                <h6 className="font-weight-light">
                  Click the button below to activate your account
                </h6>
                <form className="pt-3" onSubmit={this.formSubmit} ref={this.formRef}>
                  <div className="mt-3">
                    <button
                      type="button" // Change the type to "button"
                      onClick={this.handleVerifyClick} // Call handleVerifyClick on button click
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      VERIFY
                    </button>
                  </div>
                </form>
                {error && <div className="error-message">{message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Activate;
