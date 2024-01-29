import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDebtors, fetchOverdue } from '../../../actions/auth';

const MDBList = ({ isAuthenticated, fetchDebtors, fetchOverdue }) => {
    const navigate = useNavigate();

    const [underPayment, setUnderPayment] = useState(0);
    const [overPayment, setOverPayments] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

        fetchDebtors().then((response) => {
            setUnderPayment(response.total_balance);
        });

        fetchOverdue().then((response) => {
            setOverPayments(response.total_negative_balance);
        });

    }, [isAuthenticated, navigate, fetchDebtors]);

    const responsiveStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const desktopStyle = {
        width: 'calc(100% - 285px)',
        marginLeft: '285px',
    };

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    // Apply media queries
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    return (
        <>
            <div className="row" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="card  mb-4">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">Under Payment</p>
                                            <h5 className="font-weight-bolder">
                                                {Number(underPayment).toLocaleString('en-KE', {
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

                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="card  mb-4">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm mb-0 text-uppercase font-weight-bold">Over Payment</p>
                                            <h5 className="font-weight-bolder">
                                            {Number(overPayment).toLocaleString('en-KE', {
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
                                            onClick={() => navigate('/overpaid-list')}
                                        >
                                            <i className="fa-solid fa-chart-line text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            
        </>
    )
} 

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDebtors: () => dispatch(fetchDebtors()),
        fetchOverdue: () => dispatch(fetchOverdue())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MDBList);