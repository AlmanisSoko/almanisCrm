import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../../actions/auth';

const MoneyCard = ({ isAuthenticated, fetchDashboard }) => {
    const navigate = useNavigate();

    const [grossSales, setGrossSales] = useState(0);
    const [grossProfit, setGrossProfits] = useState(0);
    const [piadFarmers, setPaidFarmers] = useState(0);
    const [totalOverhead, setTotalOverhead] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

        fetchDashboard().then((response) => {
            setGrossSales(response.buy_total);
            setGrossProfits(response.profit);
            setPaidFarmers(response.rice);
            setTotalOverhead(response.overhead)
        });

    }, [isAuthenticated, navigate, fetchDashboard]);

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="card  mb-4">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Gross Sales</p>
                                                <h5 className="font-weight-bolder">
                                                    {Number(grossSales).toLocaleString('en-KE', {
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
                                            <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                                <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="card  mb-4">
                                <div className="card-body p-3">
                                    <div className="row cursor-pointer" onClick={() => navigate('/profit')}>
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Gross profit</p>
                                                <h5 className="font-weight-bolder">
                                                {Number(grossProfit).toLocaleString('en-KE', {
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
                                            >
                                                <i className="fa-solid fa-chart-line text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="card  mb-4">
                                <div className="card-body p-3">
                                    <div className="row cursor-pointer" onClick={() => navigate('/paidfarmers')}>
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Paid To Farmers</p>
                                                <h5 className="font-weight-bolder">
                                                    {Number(piadFarmers).toLocaleString('en-KE', {
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
                                            >
                                                <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="card  mb-4">
                                <div className="card-body p-3">
                                    <div className="row cursor-pointer" onClick={() => navigate('/overheads')}>
                                        <div className="col-8">
                                            <div className="numbers">
                                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Overheads</p>
                                                <h5 className="font-weight-bolder">
                                                    {Number(totalOverhead).toLocaleString('en-KE', {
                                                        style: 'currency',
                                                        currency: 'KES',
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </h5>
                                                <p className="mb-0">
                                                    <span className="text-danger text-sm font-weight-bolder"></span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <div 
                                                className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle"
                                            >
                                                <i className="fa-solid fa-truck-fast text-lg opacity-10" aria-hidden="true"></i>
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
        fetchDashboard: () => dispatch(fetchDashboard()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoneyCard);