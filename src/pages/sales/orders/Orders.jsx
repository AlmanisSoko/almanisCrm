import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllOrders, deleteOrder } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportDailyCSV } from '../../../components/csv/ExportDailyCSV';

const Orders = ({ isAuthenticated, fetchAllOrders, orders, deleteOrder, dailyKilos, total, previous, next }) => {
    const navigate = useNavigate();
    const itemsPerPage = 50; // This should match your API's pagination setup
    const totalPages = Math.ceil(total / itemsPerPage);
    const maxPagesDisplayed = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
        //navigate('/');
        } else {
        fetchAllOrders().then(() => {
          setLoading(false);
        });
        }
    }, [isAuthenticated, navigate, fetchAllOrders]);

    if (!isAuthenticated) { 
        navigate('/');
    } 

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

    const viewOrder = (orders_id) => {
        navigate('/ordersdetails/' + orders_id);
    };

    const handleDelete = async (orders_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this order?');

        if (!confirmed) {
        // Show a SweetAlert message when the operation is canceled
        swal.fire({
            icon: 'info',
            title: 'Operation Aborted',
            text: 'Deletion has been canceled.',
        });
        return;
        }

        try {
        await deleteOrder(orders_id);
        await fetchAllOrders();
        swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Order deleted successfully!',
        });
        } catch (error) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete the order. Please try again.',
        });
        }
    };

    if (!orders) {
        orders = []; // Ensure orders is defined even if it's initially undefined
    }

    const filteredOrders = orders
    ? orders.filter((order) => {
          const orderDate = new Date(order.added_on);
          const startDateFilter = !startDate || new Date(startDate) <= orderDate;
          const endDateFilter = !endDate || new Date(endDate) >= orderDate;
          const matchesSearch =
              order.town.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order.name.toLowerCase().includes(searchQuery.toLowerCase());
          return startDateFilter && endDateFilter && matchesSearch;
      })
    : [];

    const handlePageChange = pageNumber => {
      if (!pageNumber) return;
      console.log("Navigating to page:", pageNumber);
      localStorage.setItem('currentPage', pageNumber);
      setCurrentPage(pageNumber);
      fetchAllOrders(pageNumber, searchQuery);  // Use the current search query with new page number
    };
    
    const handleSearchQueryChange = (e) => {
      const searchValue = e.target.value;
      setSearchQuery(searchValue);
      setCurrentPage(1);  // Reset to first page when search changes
      fetchAllOrders(1, searchValue);  // Fetch with new search query starting at page 1
    };  
  
    // useEffect to handle initial load or authentication changes
    useEffect(() => {
      const storedPage = localStorage.getItem('currentPage') || 1;
      setCurrentPage(parseInt(storedPage, 10));
      fetchAllOrders(storedPage, searchQuery);  // Initial fetch with potentially stored search
    }, [isAuthenticated, navigate, fetchAllOrders, searchQuery]);
     
    function getPageRange(current, total) {
      const sidePages = Math.floor(maxPagesDisplayed / 2);
      let start = Math.max(current - sidePages, 1);
      let end = Math.min(start + maxPagesDisplayed - 1, total);
    
      // Adjust the range if we're at the edge
      if ((end - start + 1) < maxPagesDisplayed) {
        start = Math.max(1, end - maxPagesDisplayed + 1);
      }
    
      return Array.from({ length: (end - start + 1) }, (_, i) => start + i);
    }

    const fileName = 'daily_data';

  return (
    <>
      <div className="min-height-300 bg-dark position-absolute w-100"></div>
      <HeaderNav />
      <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
        <div className="container-fluid py-5">
          <div className="d-sm-flex justify-content-between">
            <div className="dropdown d-inline">
              <Link to="/neworders" className="btn btn-outline-white">
                <i className="fi fi-sr-bags-shopping"></i> New Order
              </Link>
            </div>
            <div className="d-flex">
              <button className="btn btn-icon btn-outline-white ms-2 export dropdown d-inline" >
                  <span className="btn-inner--icon">
                      <i className="fa-solid fa-weight-scale"></i>
                  </span>
                  <span className="btn-inner--text"> Today kilos {dailyKilos ? dailyKilos.daily_kgs: 0}</span>
              </button>

              <ExportDailyCSV csvData={filteredOrders} fileName={fileName} />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                {loading ? (
                  <div className="dataTable-container">
                    <div className="text-center py-4">
                      <p>Loading...</p>
                    </div>
                  </div>  
                  ) : (
                  <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div className="dataTable-top">
                      <div className="dataTable-search">
                        <div className="d-flex">
                            <label htmlFor="start-date">Start Date:</label>
                            <input
                                type="date"
                                id="start-date"
                                onChange={(event) => setStartDate(new Date(event.target.value))}
                            />
                            <label htmlFor="end-date">End Date:</label>
                            <input
                                type="date"
                                id="end-date"
                                className='me-2'
                                onChange={(event) => setEndDate(new Date(event.target.value))}
                            /> 
                            <input
                                className="dataTable-input"
                                placeholder="Search..."
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                        </div>
                      </div>
                    </div>

                    <div className="dataTable-container">
                    {filteredOrders.length > 0 ? (
                      <table className="table table-flush dataTable-table" id="datatable-search">
                        <thead className="thead-light">
                          <tr>
                            <th data-sortable="" style={{ width: '2.6514%' }}>
                              <a href="#" className="dataTable-sorter">
                                Id
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '10.' }}>
                              <a href="#" className="dataTable-sorter">
                                Customer
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '10' }}>
                              <a href="#" className="dataTable-sorter">
                                Town
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '10' }}>
                              <a href="#" className="dataTable-sorter">
                                Kgs
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                packaging
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                discount
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Transport
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Farmer
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '10.6114%' }}>
                              <a href="#" className="dataTable-sorter">
                                Amount
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '14%' }}>
                              <a href="#" className="dataTable-sorter">
                                Added on
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5%' }}>
                              <a href="#" className="dataTable-sorter">
                                Action
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter"></a>
                            </th>
                            <th data-sortable="" style={{ width: '12' }}>
                              <a href="#" className="dataTable-sorter">
                                Agent
                              </a>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredOrders.length > 0 ? (
                            filteredOrders.map((orders) => (
                              <tr key={orders.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <p className="text-xs font-weight-bold ms-2 mb-0">#{orders.id}</p>
                                  </div>
                                </td>
                                <td className="font-weight-bold">
                                  <span className="my-2 text-xs">{orders.name}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.town}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.kgs}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.packaging}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.discount}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.transport}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.farmer.name}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.amount}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{new Date(orders.added_on).toLocaleString()}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <div className="d-flex align-items-center">
                                    <button
                                      className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                      onClick={() => viewOrder(orders.id)}
                                    >
                                      <i className="fas fa-eye" aria-hidden="true"></i>
                                    </button>
                                    <span>View</span>
                                  </div>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <div className="d-flex align-items-center">
                                    <button
                                      className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                      onClick={() => handleDelete(orders.id)}
                                    >
                                      <i className="fas fa-times" aria-hidden="true"></i>
                                    </button>
                                    <span className="my-2 text-xs">Delete</span>
                                  </div>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.user}</span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7">No records available.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      ) : (
                        <div className="text-center py-4">
                            <p>No records found.</p>
                        </div>
                    )}
                    </div>

                    {/* Pagination controls */}
                    <div className="dataTable-bottom">
                      <div className="dataTable-info">
                        Showing {orders.length} of {total} entries
                      </div>
                      <nav className="dataTable-pagination">
                        <ul className="dataTable-pagination-list">
                          {previous && (
                            <li className="pager">
                              <a href="#" data-page="1" >
                                ‹ 
                              </a>
                            </li>
                          )}
                          {getPageRange(currentPage, totalPages).map(page => (
                            <li key={page} className={` ${page === currentPage ? 'active' : ''}`}>
                           
                           <a onClick={() => handlePageChange(page.toString())}>
                              {page}
                            </a>
                            </li>
                          ))}
                          {next && (
                            <li className="pager">
                              <a href="#" data-page="1" > 
                               ›
                              </a>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>

                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  orders: state.auth.orders,
  dailyKilos: state.auth.dailyKilos,
  next: state.auth.next,
  previous: state.auth.previous,
  total: state.auth.count // Total number of items if provided

});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOrders: (pageNumber, searchQuery = '') => dispatch(fetchAllOrders(pageNumber, searchQuery)),
    deleteOrder: (orders_id) => dispatch(deleteOrder(orders_id)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);