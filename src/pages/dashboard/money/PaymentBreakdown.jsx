import React, { useEffect, useState } from 'react'
import HeaderNav from '../../../components/HeaderNav'
import { Link, useNavigate } from 'react-router-dom';
import { fetchPaymentBreakdown } from '../../../actions/auth'
import { connect } from 'react-redux';

const PaymentBreakdown = ({ isAuthenticated, fetchPaymentBreakdown }) => {
    const navigate = useNavigate();
    
    const [mpesaPayment, setMpesaPayment] = useState(0);
    const [cashayment, setCashPayment] = useState(0);
    const [BankPayment, setBankPayment] = useState(0);
    const [promotionPayment, setPromotionPayment] = useState(0);
    const [tradePayment, setTradePayment] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

        fetchPaymentBreakdown().then((response) => {
            setMpesaPayment(response.paid_mpesa);
            setCashPayment(response.paid_mpesa);
            setBankPayment(response.paid_mpesa);
            setPromotionPayment(response.paid_mpesa);
            setTradePayment(response.paid_mpesa);
        });

    }, [isAuthenticated, navigate, fetchPaymentBreakdown]);


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

    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div className="row" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header pb-0 p-3">
                            <h6 className="mb-0">Break down</h6>
                        </div>
                        <div className="card-body p-3">
                            <ul className="list-group">
                                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                    <div className="d-flex align-items-center">
                                        <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                            <i className="ni ni-mobile-button text-white opacity-10"></i>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <h6 className="mb-1 text-dark text-sm">Mpesa</h6>
                                            <span className="text-xs">{mpesaPayment} Transactions, <span className="font-weight-bold"> open</span></span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
                                            <i className="ni ni-bold-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                    <div className="d-flex align-items-center">
                                        <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                            <i className="ni ni-tag text-white opacity-10"></i>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <h6 className="mb-1 text-dark text-sm">Cash</h6>
                                            <span className="text-xs">{cashayment} Transactions, <span className="font-weight-bold">open</span></span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
                                            <i className="ni ni-bold-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                                    <div className="d-flex align-items-center">
                                        <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                            <i className="ni ni-box-2 text-white opacity-10"></i>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <h6 className="mb-1 text-dark text-sm">Bank</h6>
                                            <span className="text-xs">{BankPayment} Transactions, <span className="font-weight-bold">open</span></span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
                                            <i className="ni ni-bold-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                                    <div className="d-flex align-items-center">
                                        <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                            <i className="ni ni-satisfied text-white opacity-10"></i>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <h6 className="mb-1 text-dark text-sm">Promotion</h6>
                                            <span className="text-xs">{promotionPayment} Transactions, <span className="font-weight-bold">open</span></span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
                                            <i className="ni ni-bold-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                                    <div className="d-flex align-items-center">
                                        <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                            <i className="ni ni-satisfied text-white opacity-10"></i>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <h6 className="mb-1 text-dark text-sm">Trade In</h6>
                                            <span className="text-xs">{tradePayment} Transactions, <span className="font-weight-bold">open</span></span>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
                                            <i className="ni ni-bold-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPaymentBreakdown: () => dispatch(fetchPaymentBreakdown())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBreakdown)
