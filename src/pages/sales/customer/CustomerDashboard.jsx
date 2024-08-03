import React from 'react';
import HeaderNav from '../../../components/HeaderNav';
import YearlyOrdersChart from './charts/YearlyOrdersChart';
import YearlyPaymentChart from './charts/YearlyPaymentChart';

const CustomerDashboard = () => {

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
                <div className="row mt-4">
                    <div className="col-12 col-lg-12 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Yearly Orders Overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">Grahpical Analysis</span> 
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <YearlyOrdersChart className="chart-canvas" height="100" width="3992" style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 col-lg-12 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Yearly Payment Overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">Grahpical Analysis</span> 
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <YearlyPaymentChart className="chart-canvas" height="100" width="3992" style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default CustomerDashboard
