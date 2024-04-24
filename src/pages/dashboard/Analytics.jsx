import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAnalytics } from '../../actions/auth';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Analytics = ({ isAuthenticated, fetchAnalytics, analytics, total, previous, next }) => {
    const navigate = useNavigate();
    const itemsPerPage = 50; // This should match your API's pagination setup
    const totalPages = Math.ceil(total / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const maxPagesDisplayed = 5;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
        //navigate('/');
        } else {
        fetchAnalytics().then(() => {
          setLoading(false);
        });
        }
    }, [isAuthenticated, navigate, fetchAnalytics]);

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
    
    if (!analytics) {
        analytics = []; // Ensure analytics is defined even if it's initially undefined
    }
    
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredAnalytics = analytics
    ? analytics.filter((analytic) => {
        const orderDate = new Date(analytic.added_on);
        return (
          (!startDate || orderDate >= startDate) &&
          (!endDate || orderDate <= new Date(endDate.getTime() + 86400000))
        );
      })
    : [];

    const handlePageChange = pageNumber => {
      if (!pageNumber) return;
      console.log("Navigating to page:", pageNumber);
      localStorage.setItem('currentPage', pageNumber);
      setCurrentPage(parseInt(pageNumber, 10));
      fetchAnalytics(pageNumber).then(() => setLoading(false));
    };
    
    useEffect(() => {
      const storedPage = localStorage.getItem('currentPage') || 1;
      setCurrentPage(parseInt(storedPage, 10));
      fetchAnalytics(storedPage).then(() => setLoading(false));
    }, []);
     
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


    console.log("start", startDate)
    console.log("end", endDate)

    const [filteredAnalyticsCount, setFilteredAnalyticsCount] = useState(0);

    useEffect(() => {
      // Update filteredAnalyticsCount when orders or date filters change
      setFilteredAnalyticsCount(
        analytics.filter((analytic) => {
          const orderDate = new Date(analytic.added_on);
          return (
            (!startDate || orderDate >= startDate) &&
            (!endDate || orderDate <= endDate)
          );
        }).length
      );
    }, [analytics, startDate, endDate]);

    
  
  return (
    <>
      <div className="min-height-300 bg-dark position-absolute w-100"></div>
      <HeaderNav />
      <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
        <div className="container-fluid py-5">
          <div className="d-sm-flex justify-content-between">
            <div className="dropdown d-inline">
              
              <ReactHTMLTableToExcel
                  table="datatable-search"
                  filename="general_report"
                  sheet="Sheet"
                  buttonText="EXPORT CSV"
                  filetype="xls"
                  className="btn btn-icon btn-outline-white ms-2 export dropdown d-inline"
              />
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
                {loading ? (
                  <div className="dataTable-container">
                    <div className="text-center py-4">
                      <p>Loading...</p>
                    </div>
                  </div>  
                  ) : (
                  <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                    <div className="dataTable-top">
                      
                    </div>

                    <div className="dataTable-container">
                    {filteredAnalytics.length > 0 ? (
                      <table className="table table-flush dataTable-table" id="datatable-search" >
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
                        {filteredAnalytics.length > 0 ? (
                          filteredAnalytics.map((analytics) => (
                              <tr key={analytics.id}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <p className="text-xs font-weight-bold ms-2 mb-0">#{analytics.id}</p>
                                  </div>
                                </td>
                                <td className="font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.customer_id}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.packaging}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.rice_type === 1 ? "Pishori" : analytics.rice_type === 2 ? "Komboka" : "Brown"}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.farmer.name}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.kgs}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.transport}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.rider}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.farmer_price}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.price}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.discount}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{new Date(analytics.added_on).toLocaleString()}</span>
                                </td>
                                <td className="text-xs font-weight-bold">
                                  <span className="my-2 text-xs">{analytics.user}</span>
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
                        Showing {analytics.length} of {total} entries
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
  analytics: state.auth.analytics,// Total number of items if provided
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAnalytics: () => dispatch(fetchAnalytics()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
