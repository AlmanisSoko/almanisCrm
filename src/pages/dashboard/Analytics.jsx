import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllOrders, deleteOrder } from '../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../components/csv/ExportCSV';

const Analytics = ({ isAuthenticated, fetchAllOrders, orders, deleteOrder }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 9;
    const maxPagesDisplayed = 5;

    useEffect(() => {
        if (!isAuthenticated) {
        //navigate('/');
        } else {
        fetchAllOrders();
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
    
    if (!orders) {
        orders = []; // Ensure orders is defined even if it's initially undefined
    }
    
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

    const filteredOrders = orders
    ? orders.filter((order) => {
        const orderDate = new Date(order.added_on);
        return (
          (!startDate || orderDate >= startDate) &&
          (!endDate || orderDate <= endDate)
        );
      })
    : [];

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredOrders.length / ordersPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const fileName = "orders_data";

    console.log("start", startDate)
    console.log("end", endDate)

    const [filteredOrdersCount, setFilteredOrdersCount] = useState(0);

    useEffect(() => {
      // Update filteredOrdersCount when orders or date filters change
      setFilteredOrdersCount(
        orders.filter((order) => {
          const orderDate = new Date(order.added_on);
          return (
            (!startDate || orderDate >= startDate) &&
            (!endDate || orderDate <= endDate)
          );
        }).length
      );
    }, [orders, startDate, endDate]);


  

  return (
    <div>
      <div className="min-height-300 bg-dark position-absolute w-100"></div>
      <HeaderNav />
      <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
        <div className="container-fluid py-5">
          <div className="d-sm-flex justify-content-between">
            <div className="dropdown d-inline">
                <ExportCSV csvData={orders} fileName={fileName} />
            </div>
            <div className="d-flex">
              <div className='dropdown d-inline text-white'>
                <label className='text-white'>Start Date</label>
                <input
                    className="dataTable-input"
                    placeholder="Search..."
                    type="date"
                    onChange={(event) => setStartDate(new Date(event.target.value))}
                />
              </div>
              <div className='dropdown d-inline text-white'>
                <label className='text-white'>End Date</label>
                <input
                    className="dataTable-input"
                    placeholder="Search..."
                    type="date"
                    onChange={(event) => setEndDate(new Date(event.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                  <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div className="dataTable-top">
                      
                    </div>

                    <div className="dataTable-container">
                    {filteredOrders.length > 0 ? (
                      <table className="table table-flush dataTable-table" id="datatable-search">
                        <thead className="thead-light">
                          <tr>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Id
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '7.' }}>
                              <a href="#" className="dataTable-sorter">
                                Customer
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '10' }}>
                              <a href="#" className="dataTable-sorter">
                                Packaging
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '10' }}>
                              <a href="#" className="dataTable-sorter">
                                Rice Type
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Farmer
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Kgs
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Transport
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Rider
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Farmer Price
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5%' }}>
                              <a href="#" className="dataTable-sorter">
                                Almanis Price
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5%' }}>
                              <a href="#" className="dataTable-sorter">
                                Discount
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '5' }}>
                              <a href="#" className="dataTable-sorter">
                                Ordered on
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '12' }}>
                              <a href="#" className="dataTable-sorter">
                                Agent
                              </a>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                        {currentOrders.length > 0 ? (
                          currentOrders.map((orders) => (
                              <tr key={orders.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <p className="text-xs font-weight-bold ms-2 mb-0">#{orders.id}</p>
                                  </div>
                                </td>
                                <td className="font-weight-bold">
                                  <span className="my-2 text-xs">{orders.customer_id}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.packaging}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.rice_type === 1 ? "Pishori" : "Komboka"}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.farmer.name}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.kgs}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.transport}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.rider}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.farmer_price}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.price}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{orders.discount}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{new Date(orders.added_on).toLocaleString()}</span>
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
                            Showing {filteredOrders.length} entries
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
                            {currentPage + maxPagesDisplayed < Math.ceil(filteredOrdersCount / ordersPerPage) && (
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
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  orders: state.auth.orders,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    deleteOrder: (orders_id) => dispatch(deleteOrder(orders_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
