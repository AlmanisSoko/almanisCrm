import React, { Component } from 'react';
import axios from 'axios';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      message: '',
      error: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.setState({
        message: "New passwords don't match.",
        error: true,
      });
    } else {
      axios
        .post('http://127.0.0.1:8000/api/reset-password/', {
          current_password: currentPassword,
          new_password: newPassword,
        })
        .then((response) => {
          this.setState({
            message: response.data.message,
            error: false,
          });
        })
        .catch((error) => {
          this.setState({
            message: error.response.data.message,
            error: true,
          });
        });
    }
  };

  render() {
    const { currentPassword, newPassword, confirmPassword, message, error } =
      this.state;

    return (
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                        </div>
                        <div className="page-header">
                            <h3 className="page-title">PROFILE</h3>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                    <div className="col-lg-4">
                                        <div className="border-bottom text-center pb-4">
                                            <img src="../../assets/images/faces-clipart/undraw_female_avatar_efig.svg" alt="profile" className="img-lg rounded-circle mb-3"/>
                                            
                                        
                                            <div className="d-flex mb-3">
                                            </div>
                                        </div>
                                        <div className="border-bottom py-4">
                                            
                                        </div>
                                        
                                    </div>

                                    <div className="col-lg-8">
                                        <div className="d-flex justify-content-between">
                                        <div>
                                            {/*  */}
                                        </div>
                                        
                                        </div>
                                        <div className="mt-4 py-2 border-top border-bottom">
                                        <ul className="nav profile-navbar">
                                            <li className="nav-item">
                                            <a className="nav-link active" href="#">
                                                <i className="mdi mdi-account-outline"></i> Info </a>
                                            </li>
                                        </ul>
                                        </div>
                                        <div className="profile-feed">
                                        <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                            <p className="card-description">  </p>
                                            
                                            <div className="row">
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Name</label>
                                                        <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder=""
                                                        // defaultValue={this.state.name}
                                                        required
                                                        />
                                                    </div>
                                                </div> 
                                                
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Phone: </label>
                                                        <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        placeholder=""
                                                        // defaultValue={this.state.phone}
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" >
                                                {this.state.btnMessage === 0 ? "Edit Farmer" : "Editing Farmer Please Wait.."}<div className="ripple-container"></div>
                                            </button>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
    //   <div className="container">
    //     <h1>Change Password</h1>
    
    //     {error ? (
    //       <div className="error-message mt-3">{message}</div>
    //     ) : (
    //       <div className="success-message mt-3">{message}</div>
    //     )}
    //   </div>
    );
  }
}

export default ChangePassword;
