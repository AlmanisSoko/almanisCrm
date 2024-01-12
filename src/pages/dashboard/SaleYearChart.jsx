import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import YearlySalesChart from '../../components/charts/YearlySalesChart';


const SaleMonthChart = ({ isAuthenticated, fetchCustomerRegion}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

    }, [isAuthenticated, navigate, fetchCustomerRegion])

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
                            <YearlySalesChart className="chart-canvas" height="100" width="3992" style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-5 mt-sm-0 mt-4">
                
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
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleMonthChart)
