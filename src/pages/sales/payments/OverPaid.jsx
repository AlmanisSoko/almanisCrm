import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchOverdueList } from '../../../actions/auth';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const OverPaid = ({ isAuthenticated, fetchOverdueList, overpaid, isSidebarOpen, user }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const overpaidPerPage = 50;
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
                    // Fetch debtor data only if authenticated
                     fetchOverdueList();
                } else {
                    // navigate('/');
                }
        }, [isAuthenticated, navigate, fetchOverdueList]);

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

    const [searchQuery, setSearchQuery] = useState('');

    const filteredOverpaid = overpaid
        ? overpaid.filter((overpaid) =>
              overpaid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              overpaid.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
              overpaid.town.toLowerCase().includes(searchQuery.toLowerCase()) 
          )
        : [];

    const indexOfLastOverpaid = currentPage * overpaidPerPage;
    const indexOfFirstOverpaid = indexOfLastOverpaid - overpaidPerPage;
    const currentOverpaid = filteredOverpaid.slice(indexOfFirstOverpaid, indexOfLastOverpaid);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredOverpaid.length / overpaidPerPage),
        startPage + maxPagesDisplayed - 1
    );

    return (
        <>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to={'/balance'} className="btn btn-outline-white">
                                <i className="ni ni-curved-next"></i> Back
                            </Link>
                        </div>
                        <div className="d-flex">
                            <ReactHTMLTableToExcel
                                table="datatable-search"
                                filename="debtors_list"
                                sheet="Sheet"
                                buttonText="EXPORT CSV"
                                filetype="xls"
                                className="btn btn-icon btn-outline-white ms-2 export dropdown d-inline"
                            />
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
                                            {filteredOverpaid.length > 0 ? (
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
                                                                    Balance
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
                                                        {currentOverpaid.length > 0 ? (
                                                            currentOverpaid.map((overpaid) => (
                                                                <tr key={overpaid.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{overpaid.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{overpaid.name}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{overpaid.phone}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{overpaid.town}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                        {overpaid.balance}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(overpaid.added_on).toLocaleString()}
                                                                        </span>
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

                                        <div className="dataTable-bottom">
                                            <div className="dataTable-info">Showing {filteredOverpaid.length} entries</div>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredOverpaid.length / overpaidPerPage) && (
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
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    overpaid: state.auth.overpaid,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOverdueList: () => dispatch(fetchOverdueList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverPaid);
