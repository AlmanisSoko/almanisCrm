import React from 'react';
import HeaderNav from '../../../components/HeaderNav';
import YearlyOrdersChart from './charts/YearlyOrdersChart';
import YearlyPaymentChart from './charts/YearlyPaymentChart';
import { useLocation, Link } from 'react-router-dom';
import MonthlyOrdersChart from './charts/MonthlyOrdersChart';
import MonthlyPaymentsChart from './charts/MonthlyPaymentsChart';

const CustomerDashboard = () => {
    const location = useLocation();
    const { id } = location.state;

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

    return (
        <>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div className="container-fluid py-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid mt-6">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to={`/customerdetails/${id}`} className="btn btn-outline-white">
                            <i className="ni ni-curved-next"></i> Back 
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Monthly Orders Overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">Graphical Analysis</span> 
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <MonthlyOrdersChart 
                                        className="chart-canvas" 
                                        height="100" width="3992" 
                                        id={id}
                                        style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Yearly Orders Overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">Graphical Analysis</span> 
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <YearlyOrdersChart 
                                        className="chart-canvas" 
                                        height="100" width="3992" 
                                        id={id}
                                        style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-4">
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Yearly Payment Overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">Graphical Analysis</span> 
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <YearlyPaymentChart 
                                        className="chart-canvas" 
                                        height="100" width="3992" 
                                        id={id}
                                        style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Monthly payment Overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">Graphical Analysis</span> 
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <MonthlyPaymentsChart 
                                        className="chart-canvas" 
                                        height="100" width="3992" 
                                        id={id}
                                        style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default CustomerDashboard;
