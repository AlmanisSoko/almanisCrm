import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchCustomerDetails, editCustomer } from '../../../actions/auth';
import { toast } from 'react-toastify'; 
import avatar from '../../../assets/svgs/undraw_male_avatar_g98d.svg'

const EditCustomer = ({ isAuthenticated, fetchCustomerDetails, customerDetails, editCustomer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { id } = useParams();
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12;
  const maxPagesDisplayed = 5;
  const [customers, setCustomers] = useState({});

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrder = Array.isArray(orders) ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
  const endPage = Math.min(
      Math.ceil(orders.length / ordersPerPage),
      startPage + maxPagesDisplayed - 1
  );

  const [payments, setPayments] = useState([]);// Initialize orders as an empty array
  const [currentPaymentPage, setCurrentPaymentPage] = useState(1);
  const paymentPerPage = 12;
  const maxPaymentPagesDisplayed = 5;

  const indexOfLastPayment = currentPaymentPage * paymentPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentPerPage;
  const currentPayment = Array.isArray(payments) ? payments.slice(indexOfFirstPayment, indexOfLastPayment) : [];

  const paginatePayment = (pagePNumber) => {
    setCurrentPaymentPage(pagePNumber);
  };

  const startPaymentPage = Math.max(1, currentPaymentPage - Math.floor(maxPaymentPagesDisplayed / 2));
  const endPaymentPage = Math.min(
      Math.ceil(orders.length / paymentPerPage),
      startPage + maxPagesDisplayed - 1
  ); 

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    secondary_phone: '',
    town: '',
    region: '',
  });
  
  useEffect(() => { 
    console.log('Selected ID:', id);
    if (!isAuthenticated && !id) {
      navigate('/');
    } else {
      // Fetch customer details here using the 'fetchCustomerDetails' function
      async function fetchData() {
        try {
          const customerData = await fetchCustomerDetails(id);
          console.log('Customer Data:', customerData); // Debugging statement
  
          if (customerData && customerData) {
            const customer = customerData.data; // Access the correct structure
            console.log('Fetched Data:', customer); // Debugging statement
            
            const customers = customerData; 
            console.log('All data: ', customers)
            setCustomers(customers)
  
            setFormData({
              name: customer?.name || '',
              phone: customer?.phone || '',
              secondary_phone: customer?.secondary_phone || '',
              town: customer?.town || '',
              region: customer?.region || '',
            });

            setOrders(
              customer.orders
            )

            setPayments(
              customer.payments
            )
          }
          // Additional logic to set other state variables if needed
          
        } catch (error) {
          console.error('Error fetching customer data:', error);
          // Handle error, e.g., show an error message to the user
        }
      }
      fetchData();
    }
  }, [isAuthenticated, navigate, id]);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [buttonText, setButtonText] = useState('Edit Customer'); // Initial button text
  const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setButtonDisabled(true); // Disable the button during submission
      const response = await editCustomer(
        formData.name,
        formData.phone,
        formData.secondary_phone,
        formData.town,
        formData.region,
        id
      );
  
      console.log('API Response:', response);
  
      if (response && response.error !== undefined) {
        console.log('Error Value:', response.error);
        console.log('Message:', response.message);
  
        if (response.error === false) {
          toast.success(response.message, { toastId: 'success' });
          setButtonText('Customer Edited Successfully');
          setSubmitSuccess(true);

          setTimeout(() => {
            setButtonText('Edit Customer')
            setButtonDisabled(false)
            setSubmitSuccess(false)
          }, 2000);
        } else {
          toast.error(response.message, { toastId: 'error' });
        }
      } else {
        toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
      }
    } catch (error) {
      console.log('Error during form submission:', error);
      toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
    } finally {
      setButtonDisabled(false); // Re-enable the button
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const [activeTab, setActiveTab] = useState('orders');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const viewCustomerDash = (id) => {
    navigate('/customerdetails/' + id + '/dashboard', { state: { id: id } });
};

  return (
    <>
      <div className="min-height-300 bg-dark position-absolute w-100"></div>
      <HeaderNav />
      <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
        <div className="container-fluid mt-6">
          <div className="d-sm-flex justify-content-between">
              <div className="dropdown d-inline">
                <Link to={'/customer'} className="btn btn-outline-white">
                  <i className="ni ni-curved-next"></i> Back to Customers
                </Link>
              </div>
            </div>
        </div>

        <div className="card shadow-lg mx-4 card-profile">
          <div className="card-body ">
            <div className="row gx-4">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  <img src={avatar} alt="profile_image" className="w-100 border-radius-lg "/>
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">
                              {customerDetails ? customerDetails.name: ''}
                  </h5>
                  <p className="mb-0 font-weight-bold text-sm">
                              {customerDetails ? customerDetails.town: ''}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                <div className="nav-wrapper position-relative end-0">

                  <ul className="nav nav-pills nav-fill p-1" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center" data-bs-toggle="tab" href="#tab1" role="tab" aria-selected="false" tabindex="-1">
                        <i className="ni ni-single-02"></i>
                        <span className="ms-2">Info</span>
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center`}
                        style={{ background: activeTab === 'orders' ? 'white' : 'none' }}
                        onClick={() => handleTabClick('orders')} href='#tab2'
                      >
                        <i className="ni ni-cart"></i>
                        <span className="ms-2">Orders</span>
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center`}
                        style={{ background: activeTab === 'payments' ? 'white' : 'none' }}
                        onClick={() => handleTabClick('payments')} href='#tab3'
                      >
                        <i className="ni ni-money-coins"></i>
                        <span className="ms-2">Payments</span>
                      </a>
                    </li>
                    
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid py-2">
          
          <div className="row mb-5 mt-2">

            <div className='col-lg-3'>
              <div className="card position-sticky top-1" id='tab1'>
                <div className="card-body">
                  <ul className="nav flex-column bg-white border-radius-lg">
                    <li className="nav-item">
                      <a className="nav-link text-body d-flex align-items-center" data-scroll="" href="#profile">
                        <i className="ni ni-spaceship me-2 text-dark opacity-6"></i>
                        Orders <span className="text-sm font-weight-bolder">: {customers? customers.orders_count: 0}</span>
                      </a>
                    </li>
                    <li className="nav-item pt-2">
                      <a className="nav-link text-body d-flex align-items-center" data-scroll="" href="#basic-info">
                        <i className="ni ni-books me-2 text-dark opacity-6"></i>
                        Kilos <span className="text-sm font-weight-bolder"> : {customers? customers.kgs: 0} Kgs</span>
                      </a>
                    </li>
                    <li className="nav-item pt-2">
                      <a className="nav-link text-body d-flex align-items-center" data-scroll="" href="#password">
                        <i className="ni ni-atom me-2 text-dark opacity-6"></i>
                        Discount <span className="text-sm font-weight-bolder">: {Number(customers? customers.discount: 0).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </a>
                    </li>
                    <li className="nav-item pt-2">
                      <a className="nav-link text-body d-flex align-items-center" data-scroll="" href="#2fa">
                        <i className="ni ni-ui-04 me-2 text-dark opacity-6"></i>
                        Payments <span className="text-sm font-weight-bolder">: {Number(customers? customers.payed_total: 0).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </a>
                    </li>
                    <li className="nav-item pt-2">
                      <a className="nav-link text-body d-flex align-items-center" data-scroll="" href="#2fa">
                        <i className="ni ni-ui-04 me-2 text-dark opacity-6"></i>
                        Balance <span className="text-sm font-weight-bolder">: {Number(customers? customers.balance: 0).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </a>
                    </li>
                    <li className="nav-item pt-2">
                      <div className="text-body d-flex align-items-center" data-scroll="" href="#2fa">
                        <button 
                          className="btn bg-gradient-dark btn-lg w-100"
                          onClick={() => navigate('/addPayment', { state: { from: location } })}
                        >
                          Add Payment
                        </button>
                      </div>
                      <div className="text-body d-flex align-items-center" data-scroll="" href="#2fa">
                        <button 
                          className="btn bg-gradient-dark btn-lg w-100"
                          onClick={() => navigate('/neworders')}
                        >
                          Place Order
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <div className="col-lg-9 mt-lg-0 mt-2">

              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bolder">Edit Customer</h5>
                  <form method="POST" onSubmit={onSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Customer Name"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-control"
                            id="phone"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                        <label>Secondary Phone</label>
                          <input
                            type="text"
                            name="secondary_phone"
                            value={formData.secondary_phone}
                            onChange={handleInputChange}
                            placeholder="Alternative Phone"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                        <label>Town</label>
                          <input
                            type="text"
                            name="town"
                            value={formData.town}
                            onChange={handleInputChange}
                            className="form-control"
                            id="town"
                            placeholder="Town"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                        <label>Region</label>
                          <select
                              className="form-control"
                              name="region"
                              value={formData.region}
                              onChange={handleInputChange}
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
                      <div className="col-md-6">
                        <button
                          type="submit"
                          className="btn bg-gradient-dark mt-4 btn-lg w-100"
                          disabled={isButtonDisabled} // Disable the button while processing
                        >
                          {buttonText}
                        </button>
                      </div>
                    </div>

                    <button
                      className="btn bg-gradient-dark btn-lg w-100"
                      onClick={() => viewCustomerDash(id)}
                    >
                      View Dashboard <i className="fa-solid fa-chart-simple"></i>
                    </button>
                  </form>
                </div>
              </div>

            </div>

          </div>

          <div className="row mt-4">
            <div className='col-12'>
            {activeTab === 'orders' && (
              <div className='card mb-4' id='tab2'>
                <div className='card-body p-3'>
                <p className="font-weight-bolder">Orders</p>
                  <div className="table-responsive">
                    <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                      <div className="dataTable-top">
                        <div className="dataTable-search">
                          {/* <input className="dataTable-input" placeholder="Search..." type="text" /> */}
                        </div>
                      </div>

                      <div className="dataTable-container">
                        <table className="table table-flush dataTable-table" id="datatable-search">
                          <thead className="thead-light">
                            <tr>
                              <th data-sortable="" style={{ width: '18%' }}>
                                <a href="#" className="dataTable-sorter">
                                  order No
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  Kilos
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  Price Per kg
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  Farmer
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  comment
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  Amount
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '24%' }}>
                                <a href="#" className="dataTable-sorter">
                                  Added on
                                </a>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {currentOrder.length > 0 ? (
                              currentOrder.map((order) => (
                                <tr key={order.id}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <p className="text-xs font-weight-bold ms-2 mb-0">#{order.id}</p>
                                    </div>
                                  </td>
                                  <td className="font-weight-bold">
                                    <span className="my-2 text-xs">{order.kgs}</span>
                                  </td>
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">{order.price}</span>
                                  </td>
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">{order.farmer.name}</span>
                                  </td>
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">{order.comment}</span>
                                  </td>
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">{order.amount}</span>
                                  </td>
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">{new Date(order.added_on).toLocaleString()}</span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="5">No orders found.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination controls */}
                      <div className="dataTable-bottom">
                        <div className="dataTable-info">
                            Showing {orders.length} entries
                        </div>
                        <nav className="dataTable-pagination">
                            <ul className="dataTable-pagination-list">
                            <li className="pager">
                                <a
                                href="#"
                                data-page="1"
                                onClick={() => paginate(1)}
                                >
                                ‹
                                </a>
                            </li>
                            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                                <li
                                key={index}
                                className={currentPage === startPage + index ? 'active' : ''}
                                >
                                <a
                                    href="#"
                                    data-page={startPage + index}
                                    onClick={() => paginate(startPage + index)}
                                >
                                    {startPage + index}
                                </a>
                                </li>
                            ))}
                            {currentPage + maxPagesDisplayed < Math.ceil(orders.length / ordersPerPage) && (
                                <li className="pager">
                                <a
                                    href="#"
                                    data-page={currentPage + 1}
                                    onClick={() => paginate(currentPage + 1)}
                                >
                                    ›
                                </a>
                                </li>
                            )}
                            </ul>
                        </nav>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
          
          <div className="row mt-0">
            <div className='col-12'>
            {activeTab === 'payments' && (
              <div className='card mb-4' id='tab3'>
                <div className='card-body p-3'>
                <p className="font-weight-bolder">Payments</p>
                <div className="table-responsive">
                  <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div className="dataTable-top">
                      <div className="dataTable-search">
                        {/* <input className="dataTable-input" placeholder="Search..." type="text" /> */}
                      </div>
                    </div>

                    <div className="dataTable-container">
                      <table className="table table-flush dataTable-table" id="datatable-search">
                        <thead className="thead-light">
                          <tr>
                            <th data-sortable="" style={{ width: '9%' }}>
                              <a href="#" className="dataTable-sorter">
                                Serial No
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '9%' }}>
                              <a href="#" className="dataTable-sorter">
                                order No
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '15%' }}>
                              <a href="#" className="dataTable-sorter">
                                payment
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '17%' }}>
                              <a href="#" className="dataTable-sorter">
                                Payment mode
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '17%' }}>
                              <a href="#" className="dataTable-sorter">
                                Payment source
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '17%' }}>
                              <a href="#" className="dataTable-sorter">
                                order Amount
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '20%' }}>
                              <a href="#" className="dataTable-sorter">
                                Added on
                              </a>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentPayment.length > 0 ? (
                            currentPayment.map((payments) => (
                              <tr key={payments.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <p className="text-xs font-weight-bold ms-2 mb-0">#{payments.id}</p>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <p className="text-xs font-weight-bold ms-2 mb-0">#{payments.orders_id}</p>
                                  </div>
                                </td>
                                <td className="font-weight-bold">
                                  <span className="my-2 text-xs">{payments.payment}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">
                                    {
                                      payments.payment_mode === 1
                                      ? "Cash"
                                      : payments.payment_mode === 2
                                      ? "Mpesa"
                                      : payments.payment_mode === 3
                                      ? " Bank"
                                      : payments.payment_mode
                                    }
                                  </span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{payments.paying_number}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{payments.amount}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{new Date(payments.added_on).toLocaleString()}</span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5">No payments found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination controls */}
                    <div className="dataTable-bottom">
                      <div className="dataTable-info">
                          Showing {payments.length} entries
                      </div>
                      <nav className="dataTable-pagination">
                          <ul className="dataTable-pagination-list">
                          <li className="pager">
                              <a
                              href="#"
                              data-page="1"
                              onClick={() => paginatePayment(1)}
                              >
                              ‹
                              </a>
                          </li>
                          {Array.from({ length: endPaymentPage - startPaymentPage + 1 }).map((_, index) => (
                              <li
                              key={index}
                              className={currentPaymentPage === startPaymentPage + index ? 'active' : ''}
                              >
                              <a
                                  href="#"
                                  data-page={startPaymentPage + index}
                                  onClick={() => paginatePayment(startPaymentPage + index)}
                              >
                                  {startPaymentPage + index}
                              </a>
                              </li>
                          ))}
                          {currentPaymentPage + maxPaymentPagesDisplayed < Math.ceil(payments.length / paymentPerPage) && (
                              <li className="pager">
                              <a
                                  href="#"
                                  data-page={currentPaymentPage + 1}
                                  onClick={() => paginatePayment(currentPaymentPage + 1)}
                              >
                                  ›
                              </a>
                              </li>
                          )}
                          </ul>
                      </nav>
                    </div>
                   
                  </div>
                </div>
                </div>
              </div>
            )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  customerDetails: state.auth.customerDetails,
  customers: state.auth.customers
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomerDetails: (customer_id) => dispatch(fetchCustomerDetails(customer_id)),
  editCustomer: (customer_id, name, phone, secondary_phone, town, region) =>
    dispatch(editCustomer(customer_id, name, phone, secondary_phone, town, region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
