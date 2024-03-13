import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { editOrder, fetchOrdersDetails, fetchFarmerOnly, fetchCustomerOnly } from '../../../actions/auth';
import { toast } from 'react-toastify';
import Select from 'react-select';

const EditOrders = ({ isAuthenticated, fetchOrdersDetails, fetchCustomerOnly, fetchFarmerOnly, editOrder }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    customer_id: '',
    town: '',
    kgs: '',
    packaging: '',
    discount: '',
    transport: '',
    transporters: '',
    rider: '',
    comment: '',
    farmer_id: '',
    rice_type: '',
    vat: 0,
    farmer_price: '',
    price: '',
    amount: '',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [buttonText, setButtonText] = useState('Edit Order');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      customer_id: '',
      town: '',
      kgs: '',
      discount: '',
      vat: 0,
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

      const response = await editOrder(
        formData.name,
        formData.phone,
        formData.customer_id,
        formData.town,
        formData.kgs,
        formData.packaging,
        formData.discount,
        formData.transport,
        formData.transporters,
        formData.rider,
        formData.comment,
        formData.farmer_id,
        formData.rice_type,
        formData.vat,
        formData.farmer_price,
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
          navigate('/orders');

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
      setButtonDisabled(false);
    }
  };

  const handleKgsChange = (e) => {
    const newFormData = { ...formData, kgs: e.target.value };
    setFormData(newFormData);
    calculateAmount(newFormData);
  };

  const handlePackagingChange = (e) => {
    const newFormData = { ...formData, packaging: e.target.value };
    setFormData(newFormData);
    calculateAmount(newFormData);
  };

  const handleTransportChange = (e) => {
    const newFormData = { ...formData, transport: e.target.value };
    setFormData(newFormData);
    calculateAmount(newFormData);
  };

  const handleRiderChange = (e) => {
    const newFormData = { ...formData, rider: e.target.value };
    setFormData(newFormData);
    calculateAmount(newFormData);
  };

  const handleAlmanisPriceChange = (e) => {
    const newFormData = { ...formData, price: e.target.value };
    setFormData(newFormData);
    calculateAmount(newFormData);
  };

  const handleDiscountChange = (e) => {
    const newFormData = { ...formData, discount: e.target.value };
    setFormData(newFormData); 
    calculateAmount(newFormData);
  };

  const handleVATChange = (e) => {
    const newFormData = { ...formData, vat: parseInt(e.target.value) };
    setFormData(newFormData);
    calculateAmount(newFormData);
  };

  const calculateAmount = (data) => {
    const numberOfKilosFloat = parseFloat(data.kgs);
    const trayPriceFloat = parseFloat(data.price);
    const discountFloat = parseFloat(data.discount);
    const packagingFloat = parseFloat(data.packaging);
    const riderFloat = parseFloat(data.rider);
    const transportFloat = parseFloat(data.transport);

    if (!isNaN(numberOfKilosFloat) && !isNaN(trayPriceFloat) && !isNaN(discountFloat)) {
        const subTotal = (numberOfKilosFloat * trayPriceFloat) + packagingFloat + riderFloat + transportFloat - discountFloat;
        const vatAmount = (subTotal * data.vat) / 100;
        const calculatedAmount = subTotal + vatAmount;
        const newFormData = { ...data, amount: isNaN(calculatedAmount) ? '' : calculatedAmount.toFixed(2) };
        setFormData(newFormData);
    } else {
        const newFormData = { ...data, amount: '' };
        setFormData(newFormData);
    }
};

  const handleAmountChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      amount: value,
    });
  };

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
              name: order ?.name || '',
              phone: order ?.phone || '',
              customer_id: order ?.customer_id || '',
              town: order ?.town || '',
              kgs: order ?.kgs || '',
              packaging: order ?.packaging || '',
              rider: order ?.rider || '',
              transport: order ?.transport || '',
              transporters: order ?.transporters || '',
              comment: order ?.comment || '',
              rice_type: order ?.rice_type || '',
              farmer_price: order ?.farmer_price || '',
              farmer_id: order ?.farmer_id || '',
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
  }, [id, isAuthenticated, navigate, fetchOrdersDetails]);

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

  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [farmerOptions, setFarmerOptions] = useState([]);
  const [selectedFarmerOptions, setSelectedFarmerOption] = useState(null);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const farmers = await fetchFarmerOnly();
        console.log(farmers);
        setFarmerOptions(farmers);
      } catch (error) {
        console.error('Error fetching farmer data:', error);
      }
    };

    fetchFarmerData();
  }, [fetchFarmerOnly]);

  const handleFarmerSelect = (selectedOption) => {
    setSelectedFarmerOption(selectedOption);
    if (selectedOption) {
      setFormData({
        ...formData,
        farmer_id: selectedOption.value,
      });
      setSelectedFarmerOption(selectedOption);
    }
  };

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomerOptions, setSelectedCustomerOption] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customers = await fetchCustomerOnly();
        console.log(customers);
        setCustomerOptions(customers);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [fetchCustomerOnly]);

  const handleCustomerSelect = (selectedOption) => {
    setSelectedCustomerOption(selectedOption);
    if (selectedOption) {
      const selectedCustomer = customerOptions.find((customer) => customer.id === selectedOption.value);
      setFormData({
        ...formData,
        customer_id: selectedOption.value,
        name: selectedCustomer.name,
        phone: selectedCustomer.phone,
      });
      setSelectedCustomerOption(selectedOption);
    }
  };

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
                      <div className="col-md-4">
                        <div className="form-group">
                        <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={onChange}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label>Customer Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Customer Name"
                            className="form-control"
                            value={formData.name}
                            onChange={onChange}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
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
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                          <div className="form-group">
                          <label>Town</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="town"
                                  name='town'
                                  value={formData.town}
                                  placeholder="Town"
                                  onChange={(e) => onChange(e)}
                                  required
                              />
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                            <label>Kgs</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="Kgs"
                                  placeholder="Kgs"
                                  value={formData.kgs}
                                  onChange={handleKgsChange}
                                  required
                              />
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                            <label>Packaging</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  id="packaging"
                                  placeholder="Packaging"
                                  value={formData.packaging}
                                  onChange={handlePackagingChange}
                                  required
                              />
                          </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                        <label>Discount</label>
                            <input
                                type="text"
                                className="form-control"
                                id="discount"
                                placeholder="Discount"
                                value={formData.discount}
                                onChange={handleDiscountChange}
                                required
                            />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Transport</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="transport"
                                    placeholder="Transport"
                                    value={formData.transport}
                                    onChange={handleTransportChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Transporters</label>
                                <div className="input-group">
                                    <select
                                        className="form-control"
                                        name="transporters"
                                        value={formData.transporters}
                                        onChange={(e) => onChange(e)}
                                        required
                                    >
                                        <option value="">Transporters</option>
                                        <option value="1">Others</option>
                                        <option value="2">Inhouse</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Rider</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rider"
                                    placeholder="Rider"
                                    value={formData.rider}
                                    onChange={handleRiderChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Comments</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="comment"
                                    name='comment'
                                    placeholder="Comment"
                                    value={formData.comment}
                                    onChange={(e) => onChange(e)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Farmer</label>
                                <div className="input-group">
                                  <Select
                                      id="farmer_id"
                                      name="farmer_id"
                                      className="form-control"
                                      value={{
                                          value: formData && formData.farmer_id,
                                          label: formData && farmerOptions.find(farmer => farmer.id === formData.farmer_id)?.name
                                      }}
                                      options={farmerOptions && farmerOptions.map(farmer => ({
                                          value: farmer.id,
                                          label: farmer.name
                                      }))}
                                      onChange={handleFarmerSelect}
                                      placeholder="--- Search Farmer ---"
                                      isClearable
                                  />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Rice Type</label>
                                <div className="input-group">
                                    <select
                                        className="form-control"
                                        name="rice_type"
                                        value={formData.rice_type}
                                        onChange={(e) => onChange(e)}
                                        required
                                    >
                                        <option value="">Rice Type</option>
                                        <option value="1">Pishori</option>
                                        <option value="3">Brown</option>
                                        <option value="2">Komboka</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>V.A.T</label>
                                <div className="input-group">
                                    <select
                                        className="form-control"
                                        name="vat"
                                        value={formData.vat}
                                        onChange={handleVATChange}
                                        required
                                    >
                                        <option value={0}>0%</option>
                                        <option value={14}>14%</option>
                                        <option value={16}>16%</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Farmer Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="farmer_price"
                                    id="discount"
                                    placeholder="Farmer Price"
                                    value={formData.farmer_price}
                                    onChange={(e) => onChange(e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Almanis Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder="Almanis Price"
                                    value={formData.price}
                                    onChange={handleAlmanisPriceChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Amount</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="amount"
                                    placeholder="Amount"
                                    value={formData.amount}
                                    onChange={handleAmountChange}
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
  fetchFarmerOnly: () => dispatch(fetchFarmerOnly()),
  fetchCustomerOnly: () => dispatch(fetchCustomerOnly()),
  fetchOrdersDetails: (orders_id) => dispatch(fetchOrdersDetails(orders_id)),
  editOrder: (orders_id, name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount) =>
    dispatch(editOrder(orders_id, name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrders);
