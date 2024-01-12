import React, { useState, useEffect } from 'react'
import HeaderNav from '../../components/HeaderNav';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import MoneyCard from '../dashboard/cards/MoneyCard';
import DashboardCard from '../dashboard/cards/DashboardCard';
import SaleMonthChart from '../dashboard/SaleMonthChart';
import TFCcard from '../dashboard/cards/TFCcard';
import SaleYearChart from '../dashboard/SaleYearChart';

const Home = ({ isAuthenticated, user }) => {
    const navigate = useNavigate();

    const desktopStyle = {
        width: 'calc(100% - 265px)',
        marginLeft: '265px',
    };

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    useEffect(() => {

        if (!isAuthenticated) {
            navigate('/')
        }
    
        if (isAuthenticated && user && user.user_type === 'normal') {
          navigate('/neworders');
        }

        // Use the loading state to determine when to display the data
    }, [isAuthenticated, user, Navigate]);

    // Apply media queries
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav/>
                <div className="container-fluid py-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>

                    <MoneyCard/>

                    <DashboardCard/>

                    <SaleMonthChart/>

                    <TFCcard/>
                    
                    <SaleYearChart/>
                    
                </div>
            
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});
  
export default connect(mapStateToProps)(Home)  
