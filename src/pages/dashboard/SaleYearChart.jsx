
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import YearlySalesChart from '../../components/charts/YearlySalesChart';
import CustomerRegionChart from '../../components/charts/CustomerRegionChart';

const SaleMonthChart = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="row mt-4">
            <div className="col-lg-7 mb-4 mb-lg-0">
                <div className="card z-index-2 h-100">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <h6 className="text-capitalize">Yearly Sales overview</h6>
                        <p className="text-sm mb-0">
                            <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                            <span className="font-weight-bold">4% more</span> in 2021
                        </p>
                    </div>
                    <div className="card-body p-3">
                        <div className="chart">
                            <YearlySalesChart className="chart-canvas" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-5 mt-lg-0 mt-4">
                <div className="card h-100">
                    <div className="card-header mt-4 pb-0 p-3">
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="mb-0">Customer Location Graph</h6>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end align-items-center">
                                <i className="far fa-calendar-alt me-2" aria-hidden="true"></i>
                                <small>{currentDate.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                                </small>
                            </div>
                        </div>
                    </div> 

                    <div className="card-body p-3">
                        <div className="chart">
                            <CustomerRegionChart 
                                className="chart-canvas" 
                                height="100" width="3992" 
                                style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}
                             />
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleMonthChart);

