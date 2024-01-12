import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllCustomer, deleteCustomer } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../../components/csv/ExportCSV';
import MDBList from '../cards/MDBList';

const Balance = ({ isAuthenticated, fetchAllCustomer, customers, deleteCustomer, isSidebarOpen, user }) => {
    const navigate = useNavigate();

    const desktopStyle = isSidebarOpen
        ? {
            width: 'calc(100% - 110px)',
            marginLeft: '110px',
        }
        : {
            width: 'calc(100% - 265px)',
            marginLeft: '265px',
        }; 

        useEffect(() => {
                if (isAuthenticated) {
                    // Fetch customer data only if authenticated
                     fetchAllCustomer();
                } else {
                    // navigate('/');
                }
        }, [isAuthenticated, navigate, fetchAllCustomer]);

        if (!isAuthenticated) {
            navigate('/');
        } 
        

    const responsiveStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            
            <MDBList/>
            
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    customers: state.auth.customers,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCustomer: () => dispatch(fetchAllCustomer()),
        deleteCustomer: (customer_id) => dispatch(deleteCustomer(customer_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
