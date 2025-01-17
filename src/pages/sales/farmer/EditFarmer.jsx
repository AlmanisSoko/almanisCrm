import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchFarmerDetails, editFarmer } from '../../../actions/auth';
import { toast } from 'react-toastify'; 
import avatar from '../../../assets/svgs/undraw_male_avatar_g98d.svg'

const EditFarmer = ({ isAuthenticated, fetchFarmerDetails, farmerDetails, editFarmer }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const maxPagesDisplayed = 5;
  const [farmers, setFarmers] = useState({});

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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  
  useEffect(() => { 
    console.log('Selected ID:', id);
    if (!isAuthenticated && !id) {
      navigate('/');
    } else {
      // Fetch customer details here using the 'fetchFarmerDetails' function
      async function fetchData() {
        try {
          const farmerData = await fetchFarmerDetails(id);
          console.log('Customer Data:', farmerData); // Debugging statement
  
          if (farmerData && farmerData) {
            const farmer = farmerData.data; // Access the correct structure
            console.log('Fetched Data:', farmer); // Debugging statement
            
            const farmers = farmerData; 
            console.log('All data: ', farmers)
            setFarmers(farmers)
  
            setFormData({
              name: farmer?.name || '',
              phone: farmer?.phone || '',
            });

            setOrders(
              farmer.orders
            )
          }
          // Additional logic to set other state variables if needed
          
        } catch (error) {
          console.error('Error fetching farmer data:', error);
          // Handle error, e.g., show an error message to the user
        }
      }
      fetchData();
    }
  }, [isAuthenticated, navigate, id]);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [buttonText, setButtonText] = useState('Edit Farmer'); // Initial button text
  const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setButtonDisabled(true); // Disable the button during submission
      const response = await editFarmer(
        formData.name,
        formData.phone,
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

  const viewFarmerDash = (id) => {
    navigate('/farmerdetails/' + id + '/dashboard', { state: { id: id } });
  };

  return (
    <>
      <div className="min-height-300 bg-dark position-absolute w-100"></div>
      <HeaderNav />
      <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
        <div className="container-fluid mt-6">
          <div className="d-sm-flex justify-content-between">
              <div className="dropdown d-inline">
                <Link to={'/farmer'} className="btn btn-outline-white">
                  <i className="ni ni-curved-next"></i> Back to Farmers
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
                              {farmerDetails ? farmerDetails.name: ''}
                  </h5>
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
                        Orders <span className="text-sm font-weight-bolder">: {farmers? farmers.orders_count: 0}</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-body d-flex align-items-center" data-scroll="" href="#profile">
                        <i className="ni ni-spaceship me-2 text-dark opacity-6"></i>
                        Processed Kilos <span className="text-sm font-weight-bolder">: {farmers? farmers.kgs: 0}</span>
                      </a>
                    </li>
                    <li className="nav-item pt-2">
                      <div className="text-body d-flex align-items-center" data-scroll="" href="#2fa">
                        <button 
                          className="btn bg-gradient-dark btn-lg w-100"
                          onClick={() => viewFarmerDash(id)}
                        >
                          View Dashboard <i className="fa-solid fa-chart-simple"></i>
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
                          <label>Farmer Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Farmer Name"
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
                                  rice type
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  kgs
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  Customer
                                </a>
                              </th>
                              <th data-sortable="" style={{ width: '19%' }}>
                                <a href="#" className="dataTable-sorter">
                                  Farmer Price
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
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">
                                      {order.rice_type === 1
                                        ? "Pishori" : "Kwamboka"
                                      }
                                    </span>
                                  </td>
                                  <td className="font-weight-bold">
                                    <span className="my-2 text-xs">{order.kgs}</span>
                                  </td>
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">{order.customer.name}</span>
                                  </td>
                                  <td className="text-xs font-weight-bold">
                                    <span className="my-2 text-xs">{order.farmer_price}</span>
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
          
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    farmerDetails: state.auth.farmerDetails,
    farmers: state.auth.farmers
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchFarmerDetails: (farmer_id) => dispatch(fetchFarmerDetails(farmer_id)),
    editFarmer: (farmer_id, name, phone, secondary_phone, town) =>
      dispatch(editFarmer(farmer_id, name, phone, secondary_phone, town)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditFarmer);
