import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllCustomer, deleteCustomer } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../../components/csv/ExportCSV';

const Customer = ({ isAuthenticated, fetchAllCustomer, customers, deleteCustomer, isSidebarOpen, user }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 9;
    const maxPagesDisplayed = 5;

    const desktopStyle = isSidebarOpen
        ? {
            width: 'calc(100% - 110px)',
            marginLeft: '110px',
        }
        : {
            width: 'calc(100% - 265px)',
            marginLeft: '265px',
        }; 

        useEffect(() => {
                if (isAuthenticated) {
                    // Fetch customer data only if authenticated
                     fetchAllCustomer();
                } else {
                    // navigate('/');
                }
        }, [isAuthenticated, navigate, fetchAllCustomer]);

        if (!isAuthenticated) {
            navigate('/');
        } 
        

    const responsiveStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const viewCustomer = (customer_id) => {
        navigate('/customerdetails/' + customer_id);
    };

    const handleDelete = async (customer_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this customer?');

        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }

        try {
            await deleteCustomer(customer_id);
            await fetchAllCustomer();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Customer deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete the customer. Please try again.',
            });
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const filteredCustomers = customers
        ? customers.filter((customer) =>
              customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) 

          )
        : [];

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredCustomers.length / customersPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const fileName = 'customer_data';

    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/addcustomer" className="btn btn-outline-white">
                                <i className="fa-solid fa-user"></i> New Customer
                            </Link>
                        </div>
                        <div className="d-flex">
                            <ExportCSV csvData={customers} fileName={fileName} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="table-responsive">
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
                                            {filteredCustomers.length > 0 ? (
                                                <table className="table table-flush dataTable-table" id="datatable-search">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th data-sortable="" style={{ width: '4.6514%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Id
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '23.3657%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Name
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '16.2286%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Phone
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10.6114%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Town
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Added on
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10%' }}>
                                                              <a href="#" className="dataTable-sorter">
                                                                Action
                                                              </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10' }}>
                                                              <a href="#" className="dataTable-sorter"></a>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {currentCustomers.length > 0 ? (
                                                            currentCustomers.map((customer) => (
                                                                <tr key={customer.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{customer.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{customer.name}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{customer.phone}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{customer.town}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(customer.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => viewCustomer(customer.id)}
                                                                            >
                                                                                <i className="fas fa-eye" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>View</span>
                                                                        </div>
                                                                    </td>
                                                                    {user && user.user_type === 'admin' && (
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => handleDelete(customer.id)}
                                                                            >
                                                                              <i className="fas fa-times" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Delete</span>
                                                                        </div>
                                                                    </td>
                                                                    )}
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

                                        <div className="dataTable-bottom">
                                            <div className="dataTable-info">Showing {filteredCustomers.length} entries</div>
                                            <nav className="dataTable-pagination">
                                                <ul className="dataTable-pagination-list">
                                                    <li className="pager">
                                                        <a href="#" data-page="1" onClick={() => paginate(1)}>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredCustomers.length / customersPerPage) && (
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
    customers: state.auth.customers,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCustomer: () => dispatch(fetchAllCustomer()),
        deleteCustomer: (customer_id) => dispatch(deleteCustomer(customer_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
