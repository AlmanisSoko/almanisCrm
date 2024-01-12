import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../../actions/auth';
import HeaderNav from '../../../components/HeaderNav'
import YearlyTransport from '../../../components/charts/overheads/YearlyTransport';
import YearlyPackaging from '../../../components/charts/overheads/YearlyPackaging';
import YearlyRider from '../../../components/charts/overheads/YearlyRider';

const Overheads = ({ isAuthenticated, fetchDashboard }) => {
    const navigate = useNavigate();

    const [totalRider, setTotalRider] = useState(0);
    const [totalPackaging, setTotalPackaging] = useState(0);
    const [totalTransport, setTransport] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

        fetchDashboard().then((response) => {
            setTotalRider(response.rider);
            setTotalPackaging(response.packaging);
            setTransport(response.transport)
        });

    }, [isAuthenticated, navigate, fetchDashboard]);

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
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav/>
            <div className="container-fluid py-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="row">
                    <div className="col-12 col-lg-4 col-md-4 col-12">
                        <div className="card  mb-4">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Transport</p>
                                            <h5 className="font-weight-bolder">
                                                {Number(totalTransport).toLocaleString('en-KE', {
                                                    style: 'currency',
                                                    currency: 'KES',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </h5>
                                            <p className="mb-0">
                                                <span className="text-success text-sm font-weight-bolder"></span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="col-4 text-end">
                                        <div 
                                            onClick={() => navigate('/debtors-list')}
                                            className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle"
                                        >
                                            <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4 col-md-4 col-12">
                        <div className="card  mb-4">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Packaing</p>
                                            <h5 className="font-weight-bolder">
                                            {Number(totalPackaging).toLocaleString('en-KE', {
                                                    style: 'currency',
                                                    currency: 'KES',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </h5>
                                            <p className="mb-0">
                                                <span className="text-success text-sm font-weight-bolder"></span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div 
                                            className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle"
                                            onClick={() => navigate('/profit')}
                                        >
                                            <i className="fa-solid fa-chart-line text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div className="col-12 col-lg-4 col-md-4 col-12">
                        <div className="card  mb-4">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Rider</p>
                                            <h5 className="font-weight-bolder">
                                            {Number(totalRider).toLocaleString('en-KE', {
                                                    style: 'currency',
                                                    currency: 'KES',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </h5>
                                            <p className="mb-0">
                                                <span className="text-success text-sm font-weight-bolder"></span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-4 text-end">
                                        <div 
                                            className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle"
                                            onClick={() => navigate('/profit')}
                                        >
                                            <i className="fa-solid fa-chart-line text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="row mt-4">
                    <div className="col-12 col-lg-12 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Yearly Transport overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">4% more</span> in 2023
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <YearlyTransport className="chart-canvas" height="100" width="3992" style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 col-lg-12 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Yearly Packaging overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">4% more</span> in 2023
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <YearlyPackaging className="chart-canvas" height="100" width="3992" style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 col-lg-12 mb-4 mb-lg-0">
                        <div className="card z-index-2 h-100">
                            <div className="card-header pb-0 pt-3 bg-transparent">
                                <h6 className="text-capitalize">Yearly Rider overview</h6>
                                <p className="text-sm mb-0">
                                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                                    <span className="font-weight-bold">4% more</span> in 2023
                                </p>
                            </div>
                            <div className="card-body p-3">
                                <div className="chart">
                                    <YearlyRider className="chart-canvas" height="100" width="3992" style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboard: () => dispatch(fetchDashboard()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overheads)
