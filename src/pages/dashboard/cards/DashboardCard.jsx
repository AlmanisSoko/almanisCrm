import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDashboard } from '../../../actions/auth';

const DashboardCard = ({ isAuthenticated, fetchDashboard }) => {
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
            <div className="col-xs-12">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">

                                    <div className="col-3">
                                        
                                    </div>

                                    <div className="col-3 text-end">
                                        
                                    </div>

                                    <div className="col-3 text-end">
                                       
                                    </div>

                                    <div className="col-3 text-end">
                                        
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard);