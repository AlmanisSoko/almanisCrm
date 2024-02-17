import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav';
import { fetchCustomerOnly } from '../../actions/auth';
import { connect } from 'react-redux';
import Select from 'react-select';
import navLogo from '../../assets/logo/logo192.png';

const Delivery = ({ isAuthenticated, fetchCustomerOnly }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const desktopStyle = {
        width: 'calc(100% - 265px)',
        marginLeft: '265px',
    };

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const [invoiceData, setInvoiceData] = useState({
        id: 0,
        name: '',
        phone: '',
        town: '',
        inv_date: '',
    });

    useEffect(() => {
        if (!isAuthenticated && !id) {
            navigate('/');
        } else {
            async function fetchData() {
                try {
                    const invoiceData = await fetchCustomerOnly(id);
                    if (invoiceData) {
                        setInvoiceData({
                            id: invoiceData?.id || '',
                            name: invoiceData?.customer?.name || '',
                            phone: invoiceData?.customer?.phone || '',
                            town: invoiceData?.customer?.town || '',
                            inv_date: invoiceData?.added_on || '',
                            invoice_details: invoiceData?.invoice_details || [],
                        });
                    }
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            }
            fetchData();
        }
    }, [isAuthenticated, navigate, fetchCustomerOnly, id]);

    const Print = () => {
        let printContents = document.getElementById('bill').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    const fetchCustomerDetails = async (customerId) => {
        try {
            const customerData = await fetchCustomerOnly(customerId);
            return customerData;
        } catch (error) {
            console.error('Error fetching customer details:', error);
            throw error;
        }
    };

    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid my-5 py-2">
                    <div className="d-sm-flex justify-content-between">
                    <div className="dropdown d-inline">
                            <button
                                type="button"
                                className="btn btn-outline-white"
                            >
                                <i className="fa-solid fa-receipt"></i> Create Delivery Note
                            </button>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-10 mx-auto" >
                            <form className="" action="index.html" method="post" >
                                <div id="bill">
                                    <div className="card my-sm-5 my-lg-0">
                                        <div className="card-header text-center">
                                            <div className="row justify-content-between">
                                                <div className="col-md-4 text-start">
                                                    <img className="mb-2 w-25 p-2" src={navLogo} alt="Logo"/>
                                                    <h6 className='text-lg1 '>
                                                        Almanis Soko, <br/> Mutithi, Kenya
                                                    </h6>
                                                    <p className="d-block text-secondary text-lg1 ">tel: +254 (0) 792 902809</p>
                                                </div>
                                                <div className="col-lg-3 col-md-7 text-md-end text-start mt-5">
                                                    <h6 className="d-block mt-2 mb-0 text-lg1 ">Delivered to: {""}</h6>
                                                    <p className="text-secondary text-lg1 ">
                                                        {""}<br/>
                                                        {""}
                                                    </p>
                                                </div>
                                            </div>

                                            <br/>

                                            <div className="row justify-content-md-between">
                                                <div className="col-md-4 mt-auto">
                                                    <h6 className="mb-0 text-start text-secondary text-lg1 ">
                                                        Delivery on
                                                    </h6>
                                                    <h5 className="text-start mb-0 text-lg1 ">
                                                    {currentDate.toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                    </h5>
                                                </div>
                                                <div className="col-lg-5 col-md-7 mt-auto">
                                                    <div className="row mt-md-5 mt-4 text-md-end text-start">
                                                        <div className="col-md-12">
                                                            <h6 className="text-secondary mb-0 text-lg1 ">Dispatch date:</h6>
                                                        
                                                            <h6 className="text-dark mb-0 text-lg1 ">
                                                                {currentDate.toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="table-responsive border-radius-lg">
                                                        <table className="table text-right">
                                                            <thead className="bg-default">
                                                                <tr>
                                                                    <th scope="col" className="pe-2 text-start ps-2 text-white text-lg1 " colSpan="4">
                                                                        OrderNo
                                                                    </th>
                                                                    <th scope="col" className="pe-2 text-white text-lg1 " colSpan="4">
                                                                        Description
                                                                    </th>
                                                                    <th scope="col" className="pe-2 text-white text-lg1 " colSpan="4">
                                                                        Kilos
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr key={''}>
                                                                    <td className="text-start text-lg1 " colSpan="4">{''}</td>
                                                                    <td className="ps-4 text-lg1 " colSpan="4">{''}</td>
                                                                    <td className="ps-4 text-lg1 " colSpan="4">
                                                                        {''}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-12 text-md-end ">
                            <button className="btn btn-primary mt-lg-7 mb-0" onClick={() => Print()} type="button" name="button">
                            <i className="fa-solid fa-print"></i> Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    invoiceDetails: state.auth.invoiceDetails,
    customer: state.auth.customer
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchCustomerOnly: (customer_id) => dispatch(fetchCustomerOnly(customer_id)),
    fetchCustomerOnly: () => dispatch(fetchCustomerOnly()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Delivery)
