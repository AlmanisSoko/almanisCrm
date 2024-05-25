import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllCustomer, deleteCustomer } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../../components/csv/ExportCSV';

const Customer = ({ isAuthenticated, fetchAllCustomer, customers, deleteCustomer,  total, previous, next, isSidebarOpen, user }) => {
    const navigate = useNavigate();
    const itemsPerPage = 50; // This should match your API's pagination setup
    const totalPages = Math.ceil(total / itemsPerPage);
    const maxPagesDisplayed = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

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
        if (!isAuthenticated) {
        //navigate('/');
        } else {
            fetchAllCustomer().then(() => {
            setLoading(false);
        });
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

    if (!customers) {
        customers = []; // Ensure customers is defined even if it's initially undefined
    }

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

    const handleSearchQueryChange = (e) => {
        const searchValue = e.target.value;
        setSearchQuery(searchValue);
        setCurrentPage(1);  // Reset to first page when search changes
        fetchAllCustomer(1, searchValue);  // Fetch with new search query starting at page 1
      };

    const handlePageChange = pageNumber => {
        if (!pageNumber) return;
        console.log("Navigating to page:", pageNumber);
        // localStorage.setItem('currentPage', pageNumber);
        setCurrentPage(pageNumber);
        fetchAllCustomer(pageNumber, searchQuery);
    };
    
    useEffect(() => {
        const storedPage =  1;
        setCurrentPage(parseInt(storedPage, 10));
        fetchAllCustomer(storedPage, searchQuery);  // Initial fetch with potentially stored search
      }, [isAuthenticated, navigate, fetchAllCustomer, searchQuery]);
        
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

    useEffect(() => {
        console.log("Customers:", customers);
      }, [customers]);

    const fileName = 'customer_data';

    return (
        <>
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
                                                {customers.length > 0 ? (
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
                                                                <th data-sortable="" style={{ width: '10.6114%' }}>
                                                                    <a href="#" className="dataTable-sorter">
                                                                        Region
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
                                                            {customers.map((customer) => (
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
                                                                            {
                                                                                customer.region === 1
                                                                                ? "NAIROBI" 
                                                                                : customer.region === 2
                                                                                ? "NYANZA"
                                                                                : customer.region === 3
                                                                                ? "CENTRAL"
                                                                                : customer.region === 4
                                                                                ? "COAST"
                                                                                : customer.region === 5
                                                                                ? "EASTERN"
                                                                                : customer.region === 6
                                                                                ? "NORTH EASTERN"
                                                                                : customer.region === 7
                                                                                ? "WESTERN"
                                                                                : customer.region === 8
                                                                                ? "RIFT VALLEY"
                                                                                : customer.region
                                                                            }
                                                                            </span>
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
    customers: state.auth.customers,
    user: state.auth.user,
    next: state.auth.next,
    previous: state.auth.previous,
    total: state.auth.count
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCustomer: (pageNumber, searchQuery = '') => dispatch(fetchAllCustomer(pageNumber, searchQuery)),
        deleteCustomer: (customer_id) => dispatch(deleteCustomer(customer_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
