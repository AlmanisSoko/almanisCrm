import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllPayments, deletePayment } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../../components/csv/ExportCSV';

const Payments = ({ isAuthenticated, fetchAllPayments, payments, total, previous, next, deletePayment }) => {
    const navigate = useNavigate();
    const itemsPerPage = 50; // This should match your API's pagination setup
    const totalPages = Math.ceil(total / itemsPerPage);
    const maxPagesDisplayed = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated) {
      //navigate('/');
      } else {
          fetchAllPayments().then(() => {
          setLoading(false);
      });
      }
  }, [isAuthenticated, navigate, fetchAllPayments]);;

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

    const viewPayment = (payments_id) => {
        navigate('/paymentsdetails/' + payments_id);
    };

    const handleDelete = async (payments_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this customer?');

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
        await deletePayment(payments_id);
        await fetchAllPayments();
        swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Payment deleted successfully!',
        });
        } catch (error) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete the Payment. Please try again.',
        });
        }
    };

    if (!payments) {
        payments = []; // Ensure payments is defined even if it's initially undefined
    }

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = (e) => {
      const searchValue = e.target.value;
      setSearchQuery(searchValue);
      setCurrentPage(1);  // Reset to first page when search changes
      fetchAllPayments(1, searchValue);  // Fetch with new search query starting at page 1
    };  

  const handlePageChange = pageNumber => {
    if (!pageNumber) return;
    console.log("Navigating to page:", pageNumber);
    // localStorage.setItem('currentPage', pageNumber);
    setCurrentPage(pageNumber);
    fetchAllPayments(pageNumber, searchQuery);  // Use the current search query with new page number
  };

  useEffect(() => {
    const storedPage =  1;
    setCurrentPage(parseInt(storedPage, 10));
    fetchAllPayments(storedPage, searchQuery);  // Initial fetch with potentially stored search
  }, [isAuthenticated, navigate, fetchAllPayments, searchQuery]);
      
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

    const fileName = "payment_data";

  return (
    <>
      <div className="min-height-300 bg-dark position-absolute w-100"></div>
      <HeaderNav />
      <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
        <div className="container-fluid py-5">
          <div className="d-sm-flex justify-content-between">
            <div className="dropdown d-inline">
              <Link to="/addpayment" className="btn btn-outline-white">
                <i className="ni ni-money-coins"></i> New Payment
              </Link>
            </div>
            <div className="d-flex">
                <ExportCSV csvData={payments} fileName={fileName} />
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
                          <input
                            className="dataTable-input"
                            placeholder="Search..."
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                          />
                      </div>
                    </div>

                    <div className="dataTable-container">
                    {payments.length > 0 ? (  
                      <table className="table table-flush dataTable-table" id="datatable-search">
                        <thead className="thead-light">
                          <tr>
                            <th data-sortable="" style={{ width: '4%' }}>
                              <a href="#" className="dataTable-sorter">
                                Serial No
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '4%' }}>
                              <a href="#" className="dataTable-sorter">
                                Order No
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '19.3657%' }}>
                              <a href="#" className="dataTable-sorter">
                                Name
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '10.6114%' }}>
                              <a href="#" className="dataTable-sorter">
                                Order Amount
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '8.2286%' }}>
                              <a href="#" className="dataTable-sorter">
                                Payment mode
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '16.6114%' }}>
                              <a href="#" className="dataTable-sorter">
                                Payment Source
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '16.6114%' }}>
                              <a href="#" className="dataTable-sorter">
                                Payment Amount
                              </a>
                            </th>

                            <th data-sortable="" style={{ width: '18%' }}>
                              <a href="#" className="dataTable-sorter">
                                Added on
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '8%' }}>
                              <a href="#" className="dataTable-sorter">
                                Action
                              </a>
                            </th>
                            <th data-sortable="" style={{ width: '0' }}>
                              <a href="#" className="dataTable-sorter"></a>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {payments.map((payment) => (
                              <tr key={payment.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <p className="text-xs font-weight-bold ms-2 mb-0">#{payment.id}</p>
                                  </div>
                                </td>
                                <td> 
                                  <div className="d-flex align-items-center">
                                    <p className="text-xs font-weight-bold ms-2 mb-0">{payment.orders_id}</p>
                                  </div>
                                </td>
                                <td className="font-weight-bold">
                                  <span className="my-2 text-xs">{payment.customer.name}</span>
                                </td>
                                <td className="font-weight-bold">
                                  <span className="my-2 text-xs">{payment.amount}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">
                                    {
                                      payment.payment_mode === 1
                                      ? "Cash"
                                      : payment.payment_mode === 2
                                      ? "Mpesa"
                                      : payment.payment_mode === 3
                                      ? "Bank"
                                      : payment.payment_mode === 4
                                      ? "Barter Trade" 
                                      : payment.payment_mode === 5
                                      ? "Promotion"
                                      : payment.payment_mode === 6
                                      ? "Compensation"
                                      : payment.payment_mode === 7
                                      ? "Top Up"
                                      : payment.payment_mode
                                      }
                                  </span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{payment.paying_number}</span>
                                </td>
                                <td className="font-weight-bold">
                                  <span className="my-2 text-xs">{payment.payment}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{new Date(payment.added_on).toLocaleString()}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <div className="d-flex align-items-center">
                                    <button
                                      className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                      onClick={() => viewPayment(payment.id)}
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
                                      onClick={() => handleDelete(payment.id)}
                                    >
                                      <i className="fas fa-times" aria-hidden="true"></i>
                                    </button>
                                    <span className="my-2 text-xs">Delete</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
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
                            Showing  {total} entries
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
  payments: state.auth.payments,
  next: state.auth.next,
  previous: state.auth.previous,
  total: state.auth.count // Total number of items if provided
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPayments: (pageNumber, searchQuery = '') => dispatch(fetchAllPayments(pageNumber, searchQuery)),
    deletePayment: (payments_id) => dispatch(deletePayment(payments_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
