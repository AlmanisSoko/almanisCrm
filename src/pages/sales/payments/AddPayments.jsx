import React, { useEffect, useState, useRef  } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import AutoCompleteOrder from '../../../components/order/AutoCompleteOrder';
import { savePayment } from '../../../actions/auth';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer

const AddPayments = ({ isAuthenticated, savePayment }) => {
    const navigate = useNavigate(); // Get the navigate function
    const location = useLocation();

    const [formData, setFormData] = useState({
        orders_id: '',
        paying_number: '',
        amount: '',
        payment_mode: '',
        payment: '',
        customer_id: ''
    })

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const formRef = useRef(null); // Create a ref for the form
    const [buttonText, setButtonText] = useState('Add Payment'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} to ${value}`);
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const [ordersDetails, setOrdersDetails] = useState([
        {
            id: 0,
            customer_id: '', 
            amount: ''
        }
    ])

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formData.payment || isNaN(parseFloat(formData.payment))) {
            toast.error('Payment amount is required and must be a valid number', { toastId: 'error' });
            return;
        }

        try {
            setButtonDisabled(true);
            console.log("form data" ,formData);
            const response = await savePayment(
                formData.orders_id, 
                formData.paying_number,
                formData.amount, 
                formData.payment_mode,
                formData.payment,
                formData.customer_id,
            );
            
            console.log(response);

            if (response.data.error) {
                toast.error(response.data.error, { toastId: 'error' });
                setButtonDisabled(false);
            } else {
                toast.success('Payment Added Successfully', { toastId: 'success' });
                setButtonText('Payment Added Successfully');
                setButtonDisabled(true)

                setTimeout(() => {
                    setFormData({
                        orders_id: '',
                        paying_number: '',
                        amount: '',
                        payment_mode: '',
                        payment: '',
                        customer_id: ''
                    });
                    formRef.current.reset()
                    setButtonText('Add Payment')
                    setButtonDisabled(false)
                    setSubmitSuccess(false)
                    const redirectTo = location.state?.from || '/';
                    navigate(redirectTo, { replace: true });
                }, 500);
            }
        } catch (error) {
            console.log('Error during form submission', error)
            toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
            setButtonDisabled(false); // Re-enable the button
        }
    }

    const showDataInInputs = (index, item) => {
        if (item) {
            const updatedDetails = [...ordersDetails];
            if (updatedDetails[index]) {
                updatedDetails[index].orders_id = item.orders_id;
                updatedDetails[index].amount = item.amount;
                updatedDetails[index].customer_id = item.customer_id;
                setOrdersDetails(updatedDetails);
    
                // Update the formData state with the received data
                const newFormData = { ...formData };
                newFormData.customer_id = item.customer_id;
                newFormData.orders_id = item.id;
                newFormData.amount = item.amount;
                setFormData(newFormData);
            }
        }
    };

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

    // Apply media queries
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to={'/payments'} className="btn btn-outline-white">
                                <i className="ni ni-curved-next"></i> Back to Payments
                            </Link>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                               <div className="card-body">
                                    <h5 className="font-weight-bolder">Add New Payment</h5>
                                    <form ref={formRef} method="POST" onSubmit={onSubmit}>
                                        {ordersDetails.map((item, index) => (
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <AutoCompleteOrder
                                                            itemPosition={index}
                                                            name="orders_id"
                                                            showDataInInputs={showDataInInputs}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                    <label>Amount</label>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name='amount' 
                                                            id="amount" 
                                                            placeholder="Order Amount"
                                                            value={item.amount}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div className="row">
                                            {ordersDetails.map((item, index) => (
                                                <div className="col-md-6" key={index}>
                                                    <div className="form-group">
                                                    <label>Customer</label>
                                                        <input
                                                            type="text" 
                                                            name='customer_id' 
                                                            placeholder="Customer" 
                                                            className="form-control"
                                                            value={item.customer_id} 
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Payment Source</label>
                                                    <input 
                                                        type="text" 
                                                        name='paying_number' 
                                                        className="form-control" 
                                                        id="paying_number" 
                                                        placeholder="Payment Source"
                                                        value={formData.paying_number}
                                                        onChange={(e) => onChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Payment Mode</label>
                                                    <div className='input-group'>
                                                        <select 
                                                            className='form-control' 
                                                            name='payment_mode' 
                                                            placeholder='Payment Mode'
                                                            value={formData.payment_mode}
                                                            onChange={(e) => onChange(e)}
                                                        >
                                                            <option value="">--- Payment Mode ---</option>
                                                            <option value="1">Cash</option>
                                                            <option value="2">Mpesa</option>
                                                            <option value="3">Bank</option>
                                                            <option value="4">Barter Trade</option>
                                                            <option value="5">Promotion</option>
                                                            <option value="6">Compensation</option>
                                                            <option value="7">Top UP</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Payment Amount</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="payment" 
                                                        name='payment'
                                                        placeholder="Payment Amount"
                                                        value={formData.payment}
                                                        onChange={(e) => onChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit" 
                                            className="btn bg-gradient-dark btn-lg w-100"
                                            disabled={isButtonDisabled}
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
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { savePayment })(AddPayments)
