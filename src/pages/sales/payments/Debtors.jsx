import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchDebtorsList } from '../../../actions/auth';
import { useDownloadExcel } from 'react-export-table-to-excel';

const Debtors = ({ isAuthenticated, fetchDebtorsList, debtors, isSidebarOpen, user }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const debtorsPerPage = 50;
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
                     fetchDebtorsList();
                } else {
                    // navigate('/');
                }
        }, [isAuthenticated, navigate, fetchDebtorsList]);

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

    const filtereddebtors = debtors
        ? debtors.filter((debtor) =>
              debtor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              debtor.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
              debtor.town.toLowerCase().includes(searchQuery.toLowerCase()) 
          )
        : [];

    const indexOfLastdebtor = currentPage * debtorsPerPage;
    const indexOfFirstdebtor = indexOfLastdebtor - debtorsPerPage;
    const currentdebtors = filtereddebtors.slice(indexOfFirstdebtor, indexOfLastdebtor);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filtereddebtors.length / debtorsPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'General Report',
        sheet: 'Analytics'
    })


    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            
                        </div>
                        <div className="d-flex">
                        <button 
                            onClick={onDownload}
                            className="btn btn-icon btn-outline-white ms-2 export dropdown d-inline" 
                            data-type="csv"
                        >
                            <span className="btn-inner--icon">
                                <i className="fa-regular fa-file-excel"></i>
                            </span>
                            <span className="btn-inner--text"> Export CSV</span>
                        </button>
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
                                            {filtereddebtors.length > 0 ? (
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
                                                        {currentdebtors.length > 0 ? (
                                                            currentdebtors.map((debtor) => (
                                                                <tr key={debtor.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{debtor.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{debtor.name}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{debtor.phone}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{debtor.town}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                        {debtor.balance}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(debtor.added_on).toLocaleString()}
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
                                            <div className="dataTable-info">Showing {filtereddebtors.length} entries</div>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filtereddebtors.length / debtorsPerPage) && (
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
    debtors: state.auth.debtors,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDebtorsList: () => dispatch(fetchDebtorsList()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Debtors);
