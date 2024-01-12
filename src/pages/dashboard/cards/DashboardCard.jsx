import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDiscount, fetchTotalPayments, fetchTotalKilos, fetchUnderPaid } from '../../../actions/auth';

const DashboardCard = ({ isAuthenticated, fetchDiscount, fetchTotalKilos, fetchUnderPaid, fetchTotalPayments }) => {
    const navigate = useNavigate();

    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalKilos, setTotalKilos] = useState(0);
    const [totalUnderPaid, setTotalUnderPaid] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

        fetchDiscount().then((response) => {
            setTotalDiscount(response.total_discount);
        });

        fetchTotalPayments().then((response) => {
            setTotalPayment(response.total_payments);
        });

        fetchTotalKilos().then((response) => {
            setTotalKilos(response.total_kgs);
        });

        fetchUnderPaid().then((response) => {
            setTotalUnderPaid(response.total_balance);
        });

    }, [isAuthenticated, navigate, fetchDiscount]);

    return (
        <>
            <div className="col-xs-12">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">

                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-end text-uppercase font-weight-bold">Total Discount</p>
                                                    <h5 className="font-weight-bolder text-end">
                                                        {Number(totalDiscount).toLocaleString('en-KE', {
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
                                            
                                            <div className="col-4 text-start">
                                                <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                                    <i className="fi fi-rs-badge-percent text-white text-lg opacity-10" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-end text-uppercase font-weight-bold">Total Paid</p>
                                                    <h5 className="font-weight-bolder text-end">
                                                        {Number(totalPayment).toLocaleString('en-KE', {
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
                                            
                                            <div className="col-4 text-start">
                                                <div className="icon icon-shape bg-gradient-success shadow-primary text-center rounded-circle">
                                                    <i className="fa-solid fa-credit-card text-white text-lg opacity-10" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-end text-uppercase font-weight-bold">Total Kilos</p>
                                                    <h5 className="font-weight-bolder text-end">
                                                        {Number(totalKilos).toLocaleString('en-KE', {
                                                            // style: 'currency',
                                                            // currency: 'Kgs',
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })} Kgs
                                                    </h5>
                                                    <p className="mb-0">
                                                        <span className="text-success text-sm font-weight-bolder"></span>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="col-4 text-start">
                                                <div className="icon icon-shape bg-gradient-secondary shadow-primary text-center rounded-circle">
                                                    <i className="fa-solid fa-scale-unbalanced-flip text-white text-lg opacity-10" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-end text-uppercase font-weight-bold">Balance</p>
                                                    <h5 className="font-weight-bolder text-end">
                                                        {Number(totalUnderPaid).toLocaleString('en-KE', {
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
                                            
                                            <div className="col-4 text-start">
                                                <div 
                                                    className="icon icon-shape bg-gradient-warning shadow-primary text-center rounded-circle"
                                                    onClick={() => navigate('/balance')}
                                                >
                                                    <i className="fa-solid fa-building-columns text-white text-lg opacity-10" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            
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
        fetchDiscount: () => dispatch(fetchDiscount()),
        fetchTotalPayments: () => dispatch(fetchTotalPayments()),
        fetchTotalKilos: () => dispatch(fetchTotalKilos()),
        fetchUnderPaid: () => dispatch(fetchUnderPaid())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard);