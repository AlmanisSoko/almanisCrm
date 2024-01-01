import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
// import AutoCompleteCustomer from '../../../components/customer/AutoCompleteCustomer';
import { editOrder, fetchOrdersDetails } from '../../../actions/auth';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer

const EditOrders = ({ isAuthenticated, fetchOrdersDetails, editOrder }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    customer_id: '',
    town: '',
    trays: '',
    discount: '',
    vat: 0, // Initialize with 0% VAT
    price: '',
    amount: '',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef(null); // Create a ref for the form
  const [buttonText, setButtonText] = useState('Edit Order'); // Initial button text
  const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

  // Function to reset the form fields
  const resetForm = () => {
    setFormData({
      customer_name: '',
      phone: '',
      customer_id: '',
      town: '',
      trays: '',
      discount: '',
      vat: 0, // Initialize with 0% VAT
      price: '',
      amount: '',
    });
  };

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
        setButtonDisabled(true);
        console.log('form data', formData);

        // Call the editOrder action with the order ID (id) and the updated order data
        const response = await editOrder(
            formData.customer_name,
            formData.phone,
            formData.customer_id,
            formData.town,
            formData.trays,
            formData.discount,
            formData.vat,
            formData.price,
            formData.amount,
            id
        );
        console.log('API Response:', response);

        if (response && response.error !== undefined) {
            console.log('Error Value:', response.error);
            console.log('Message:', response.message);

            if (response.error === false) {
            toast.success(response.message, { toastId: 'success' });
            setButtonText('Order Edited Successfully');
            setSubmitSuccess(true);

            setTimeout(() => {
                setButtonText('Edit Order');
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
        console.log('Error during form submission', error);
        toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
        setButtonDisabled(false); // Re-enable the button
        }
    };
  
  // Update the amount when any of the input fields change
  const handleTraysChange = (e) => {
    const newFormData = { ...formData, trays: e.target.value };
    setFormData(newFormData);
  };

  const handlePricePerTrayChange = (e) => {
    const newFormData = { ...formData, price: e.target.value };
    setFormData(newFormData);
  };

  const handleDiscountChange = (e) => {
    const newFormData = { ...formData, discount: e.target.value };
    setFormData(newFormData);
  };

  const handleVATChange = (e) => {
    const newFormData = { ...formData, vat: parseFloat(e.target.value) };
    setFormData(newFormData);
  };

  // Check if the user is authenticated
  useEffect(() => {
    console.log('Selected ID:', id);
    if (!isAuthenticated && !id) {
      navigate('/');
    } else {
      async function fetchData() {
        try {
          const ordersData = await fetchOrdersDetails(id);
          console.log('Orders Data: ', ordersData);

          if (ordersData && ordersData) {
            const order = ordersData;
            console.log('Fetched Data: ', order);

            setFormData({
              customer_name: order ?.customer_name || '',
              phone: order ?.phone || '',
              customer_id: order ?.customer_id || '',
              town: order ?.town || '',
              trays: order ?.trays || '',
              discount: order ?.discount || '',
              vat: order ?.vat || '',
              price: order ?.price || '',
              amount: order ?.amount || '',
            });
          }
        } catch (error) {
          console.log('Error fetching order data: ', error);
        }
      }
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    // Calculate the amount based on the current VAT value
    const numberOfTraysFloat = parseFloat(formData.trays);
    const trayPriceFloat = parseFloat(formData.price);
    const discountFloat = parseFloat(formData.discount);
  
    if (!isNaN(numberOfTraysFloat) && !isNaN(trayPriceFloat) && !isNaN(discountFloat)) {
      const subTotal = numberOfTraysFloat * trayPriceFloat - discountFloat;
      const vatAmount = (subTotal * formData.vat) / 100;
      const calculatedAmount = subTotal + vatAmount;
      
      setFormData({
        ...formData,
        amount: isNaN(calculatedAmount) ? '' : calculatedAmount.toFixed(2),
      });
    } else {
      setFormData({
        ...formData,
        amount: '',
      });
    }
  }, [formData.trays, formData.price, formData.discount, formData.vat]);
  

  // Styles
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
              <Link to="/orders" className="btn btn-outline-white">
                <i className="ni ni-curved-next"></i> Back to orders
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bolder">Edit Order</h5>
                  <form  method="POST" onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="form-group">
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">
                          <input
                            type="text"
                            name="customer_name"
                            placeholder="Customer Name"
                            className="form-control"
                            value={formData.customer_name}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <input
                            type="text"
                            name="customer_id"
                            placeholder="Customer No"
                            className="form-control"
                            disabled
                            value={formData.customer_id}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="town"
                            name="town"
                            value={formData.town}
                            placeholder="Town"
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="trays"
                            placeholder="Number of Trays"
                            value={formData.trays}
                            onChange={handleTraysChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="discount"
                            placeholder="Discount"
                            value={formData.discount}
                            onChange={handleDiscountChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="input-group">
                            <select
                              className="form-control"
                              name="vat"
                              value={formData.vat}
                              onChange={handleVATChange}
                            >
                              <option value={0}>0%</option>
                              <option value={14}>14%</option>
                              <option value={16}>16%</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="price"
                            placeholder="Price Per Tray"
                            value={formData.price}
                            onChange={handlePricePerTrayChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={onChange}
                            disabled
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  ordersData: state.auth.ordersData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrdersDetails: (orders_id) => dispatch(fetchOrdersDetails(orders_id)),
  editOrder: (orders_id, customer_name, phone, customer_id, town, trays, discount, vat, price, amount) =>
    dispatch(editOrder(orders_id, customer_name, phone, customer_id, town, trays, discount, vat, price, amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrders);
