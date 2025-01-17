import React, { useEffect, useState, useRef  } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import Select from 'react-select';
import { editPayment, fetchPaymentDetails, fetchCustomerOnly } from '../../../actions/auth';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer

const EditPayments = ({ isAuthenticated, fetchPaymentDetails, fetchCustomerOnly, editPayment }) => {
    const navigate = useNavigate(); // Get the navigate function
    
    const { id } = useParams();
    const [formData, setFormData] = useState({
        orders_id: '',
        paying_number: '',
        amount: '',
        payment_mode: '',
        payment: '',
        customer_id: '',
    }) 

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const formRef = useRef(null); // Create a ref for the form
    const [buttonText, setButtonText] = useState('Edit Payment'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formData.payment || isNaN(parseFloat(formData.payment))) {
            toast.error('Payment amount is required and must be a valid number', { toastId: 'error' });
            return;
        }

        try {
            setButtonDisabled(true);
            console.log("form data" ,formData);
            const response = await editPayment(
                formData.orders_id, // Assuming orders_id is of numeric type
                formData.paying_number,
                formData.amount, // Correcting the order, assuming amount is a numeric field
                formData.payment_mode,
                formData.payment,
                formData.customer_id,
                id
            );
            
            console.log(response);

            if (response && response.error !== undefined) {
                console.log('Error Value:', response.error);
                console.log('Message:', response.message);
    
                if (response.error === false) {
                toast.success(response.message, { toastId: 'success' });
                setButtonText('Payment Edited Successfully');
                setSubmitSuccess(true);
                navigate('/payments')
    
                setTimeout(() => {
                    setButtonText('Edit Payment');
                    setButtonDisabled(false);
                    setSubmitSuccess(false);
                }, 2000);
                } else {
                toast.error(response.message, { toastId: 'error' });
                }
            } else {
                toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
            }
        } catch (error) {
            console.log('Error during form submission', error)
            toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
            setButtonDisabled(false); // Re-enable the button
        }
    }

    // Check if the user is authenticated
    useEffect(() => {
        console.log('Selected ID:', id);
        if (!isAuthenticated && !id) {
          navigate('/');
        } else {
            async function fetchData() {
                try {
                    const paymentsData = await fetchPaymentDetails(id);
                    console.log('Payment Data:', paymentsData);

                    if (paymentsData && paymentsData) {
                        const payment = paymentsData;
                        console.log('Fetched Data:', payment)

                        setFormData({
                            orders_id: payment?.orders_id  || '',
                            paying_number: payment?.paying_number  || '',
                            amount: payment?.amount  || '',
                            payment_mode: payment?.payment_mode  || '',
                            payment: payment?.payment  || '',
                            customer_id: payment?.customer_id  || '',
                        });
                    }
                    
                } catch (error) {
                    console.log('Error fetching payment data:', error)
                } 
            }
            fetchData();   
        }
    }, [isAuthenticated, navigate, id]);

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

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [selectedCustomerOptions, setSelectedCustomerOption] = useState(null);

    // Update your useEffect for fetching batch data
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const customers = await fetchCustomerOnly();
                console.log(customers)
                setCustomerOptions(customers.results);
            } catch (error) {
                console.error('Error fetching batch data:', error);
            }
        };

        fetchCustomerData();
    }, [fetchCustomerOnly]);

    const handleCustomerSelect = (selectedOption) => {
    setSelectedCustomerOption(selectedOption);
    if (selectedOption) {
        const selectedCustomer = customerOptions.find(customer => customer.id === selectedOption.value);
        setFormData({
            ...formData,
            customer_id: selectedOption.value,
        });
        setSelectedCustomerOption(selectedOption);
    }
    };


    return (
        <>
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
                                    <h5 className="font-weight-bolder">Edit Payment</h5>
                                    <form ref={formRef} method="POST" onSubmit={onSubmit}>
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Order Number</label>
                                                    <input
                                                        type="text"
                                                        name="orders_id"
                                                        value={formData.orders_id}
                                                        onChange={onChange}
                                                        placeholder="Order Number"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Order Amount</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name='amount' 
                                                        id="amount" 
                                                        placeholder="Order Amount"
                                                        value={formData.amount}
                                                        onChange={onChange}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Customer Name/Number</label>
                                                    <div className="input-group">
                                                        <Select
                                                            id="customer_id"
                                                            name="customer_id"
                                                            className="form-control"
                                                            value={{
                                                                value: formData && formData.customer_id,
                                                                label: formData && customerOptions.find(customer => customer.id === formData.customer_id)?.name
                                                            }}
                                                            options={customerOptions && customerOptions.map(customer => ({
                                                                value: customer.id,
                                                                label: customer.name
                                                            }))}
                                                            onChange={handleCustomerSelect}
                                                            placeholder="--- Search Customer ---"
                                                            isClearable
                                                        />
                                                    </div>    
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Paying Name/ Number</label>
                                                    <input 
                                                        type="text" 
                                                        name='paying_number' 
                                                        className="form-control" 
                                                        id="paying_number" 
                                                        placeholder="Payment Source"
                                                        value={formData.paying_number}
                                                        onChange={onChange}
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
                                                    <label>Payment</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="payment" 
                                                        name='payment'
                                                        placeholder="Payment Amount"
                                                        value={formData.payment}
                                                        onChange={onChange}
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
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    paymentsData: state.auth.paymentsData,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchCustomerOnly: () => dispatch(fetchCustomerOnly()),
    fetchPaymentDetails: (payments_id) => dispatch(fetchPaymentDetails(payments_id)),
    editPayment: (payments_id, orders_id, paying_number, amount, payment_mode, payment, customer_id,) =>
        dispatch(editPayment(payments_id, orders_id, paying_number, amount, payment_mode, payment, customer_id,)),
});
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditPayments)
