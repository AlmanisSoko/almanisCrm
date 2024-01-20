import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllPayments, deletePayment } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../../components/csv/ExportCSV';

const Payments = ({ isAuthenticated, fetchAllPayments, payments, deletePayment }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 29;
    const maxPagesDisplayed = 5;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
        //navigate('/');
        } else {
          fetchAllPayments().then(() => setLoading(false));;
        }
    }, [isAuthenticated, navigate]);


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

    const filteredPayment = payments
  ? payments.filter((payment) =>
      payment.paying_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.orders.id &&
        payment.orders.id.toString().toLowerCase().includes(searchQuery.toLowerCase()))
      
    )
  : [];

    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = filteredPayment.slice(indexOfFirstPayment, indexOfLastPayment);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredPayment.length / paymentsPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const fileName = "payment_data";

  return (
    <div>
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                    </div>

                    <div className="dataTable-container">
                    {filteredPayment.length > 0 ? (  
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
                          {currentPayments.length > 0 ? (
                            currentPayments.map((payment) => (
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
                                      : payments.payment_mode === 3
                                      ? "Bank"
                                      : payments.payment_mode === 4
                                      ? "Trade in" 
                                      : payments.payment_mode === 5
                                      ? "Promotion"
                                      : payments.payment_mode === 6
                                      ? "Compensation"
                                      : payments.payment_mode === 7
                                      ? "Top Up"
                                      : payments.payment_mode
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
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7">No records found.</td>
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
                            Showing {filteredPayment.length} entries
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
                            {currentPage + maxPagesDisplayed < Math.ceil(filteredPayment.length / paymentsPerPage) && (
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
                  )}
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
  payments: state.auth.payments,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPayments: () => dispatch(fetchAllPayments()),
    deletePayment: (payments_id) => dispatch(deletePayment(payments_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
