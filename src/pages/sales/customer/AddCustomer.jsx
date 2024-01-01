import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { saveCustomer } from '../../../actions/auth';

import { toast } from 'react-toastify'; // Import ToastContainer

const AddCustomer = ({ isAuthenticated, saveCustomer }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    secondary_phone: '',
    alternative_phone: '',
    region: '',
    town: '',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef(null); // Create a ref for the form
  const [buttonText, setButtonText] = useState('Add Customer'); // Initial button text
  const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

  const { name, phone, secondary_phone, alternative_phone, region, town } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setButtonDisabled(true); // Disable the button during submission
      const response = await saveCustomer(name, phone, secondary_phone, alternative_phone, town, region);
      console.log(response);
  
      if (response.data) {
        toast.error(response.data.message, { toastId: 'error' });
        setButtonDisabled(false); // Re-enable the button
      } else {
        toast.success('Customer Added Successfully', { toastId: 'success' });
        setButtonText('Customer Added Successfully'); // Change button text
        setSubmitSuccess(true);
  
        setTimeout(() => {
          // Reset the form fields and button text after 2 seconds
          setFormData({
            name: '',
            phone: '',
            secondary_phone: '',
            alternative_phone: '',
            region: '',
            town: '',
          });
          formRef.current.reset();
          setButtonText('Add Customer');
          setButtonDisabled(false);
          setSubmitSuccess(false);
        }, 2000); // 2000 milliseconds (2 seconds)
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle error, display error messages, etc.
      toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
      setButtonDisabled(false); // Re-enable the button
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const responsiveStyle = {
    width: '100%',
    marginLeft: '0',
  };

  const desktopStyle = {
    width: 'calc(100% - 265px)',
    marginLeft: '265px',
  };

  const mobileStyle = {
    width: '100%',
    marginLeft: '0',
  };

  const mediaQuery = window.matchMedia('(min-width: 768px)');

  return (
    <div>
      <div className="min-height-300 bg-dark position-absolute w-100"></div>
      <HeaderNav />
      <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
         
        <div className="container-fluid py-5">

          <div className="d-sm-flex justify-content-between">
            <div className="dropdown d-inline">
              <Link to={'/neworders'} className="btn btn-outline-white">
                <i className="ni ni-curved-next"></i> Back
              </Link>
            </div>
          </div>
         
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bolder">Add New Customer</h5>
                  <form ref={formRef} method="POST" onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            required
                            type="text"
                            name="name"
                            placeholder="Customer Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            required
                            type="text"
                            name="phone"
                            className="form-control"
                            id="phone"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            required
                            type="text"
                            name="secondary_phone"
                            placeholder="Secondary Phone"
                            className="form-control"
                            value={secondary_phone}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            required
                            type="text"
                            name="alternative_phone"
                            placeholder="Alternative Phone"
                            className="form-control"
                            value={alternative_phone}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            required
                            name="town"
                            type="text"
                            className="form-control"
                            id="town"
                            placeholder="Town"
                            value={town}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                              <div className="input-group">
                                  <select
                                      className="form-control"
                                      name="region"
                                      value={region}
                                      onChange={(e) => onChange(e)}
                                      required
                                  >
                                      <option value="">--- Please Select Region ---</option>
                                      <option value="1">NAIROBI</option>
                                      <option value="2">NYANZA</option>
                                      <option value="3">CENTRAL</option>
                                      <option value="4">COAST</option>
                                      <option value="5">EASTERN</option>
                                      <option value="6">NORTH EASTERN</option>
                                      <option value="7">WESTERN</option>
                                      <option value="8">RIFT VALLEY</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn bg-gradient-dark btn-lg w-100"
                      disabled={isButtonDisabled} // Disable the button while processing
                    >
                      {buttonText}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { saveCustomer })(AddCustomer);
