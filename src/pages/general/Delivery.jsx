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

    const [orderNos, setOrderNos] = useState([{ id: 1, value: '' }]);
    const [selectedInvoiceOptions, setSelectedInvoiceOption] = useState(null);
    const [invoiceOptions, setInvoiceOptions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Add Delivery'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

    const [formData, setFormData] = useState({
        customer_id: '',
    });

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const invoices = await fetchCustomerOnly();
                setInvoiceOptions(invoices);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchInvoiceData();
    }, [fetchCustomerOnly]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setFormData({
            customer_id: '',
        });
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assuming you have a function to fetch data based on customer_id and orders
            // Modify this part based on your actual implementation
            const customerData = await fetchCustomerDetails(formData.customer_id);
            setInvoiceData({
                id: customerData.id || '',
                name: customerData.name || '',
                phone: customerData.phone || '',
                town: customerData.town || '',
            });
            closeModal();
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

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

    const addOrderNo = () => {
        const newOrderNos = [...orderNos, { id: orderNos.length + 1, value: '' }];
        setOrderNos(newOrderNos);
    };

    const removeOrderNo = () => {
        if (orderNos.length > 1) {
            const newOrderNos = orderNos.slice(0, -1);
            setOrderNos(newOrderNos);
        }
    };
    

    const handleBatchSelect = async (selectedOption) => {
        setSelectedInvoiceOption(selectedOption);
        if (selectedOption) {
            try {
                const customerData = await fetchCustomerDetails(selectedOption.value);
                setInvoiceData({
                    id: customerData.id || '',
                    name: customerData.name || '',
                    phone: customerData.phone || '',
                    town: customerData.town || '',
                });
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        }
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

    const handleOrderNoChange = (e, orderId) => {
        const newOrderNos = orderNos.map((orderNo) =>
            orderNo.id === orderId ? { ...orderNo, value: e.target.value } : orderNo
        );
        setOrderNos(newOrderNos);

        const updatedInvoiceDetails = newOrderNos.map((orderNo) => ({
            orders_id: orderNo.value,
        }));

        setInvoiceData({
            ...invoiceData,
            invoice_details: updatedInvoiceDetails,
        });
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
                                onClick={openModal}
                            >
                                <i className="fa-solid fa-receipt"></i> Create Delivery Note
                            </button>
                            {isModalOpen && (
                                <div
                                    className="modal fade show"
                                    id="modal-form"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-modal="true"
                                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                    onClick={closeModal}
                                >
                                    <div
                                        className="modal-dialog modal-dialog-centered modal-md"
                                        role="document"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="modal-content">
                                            <div className="modal-body p-0">
                                                <div className="card card-plain">
                                                    <div className="card-header pb-0 text-left">
                                                        <span className="close" onClick={closeModal}>
                                                        &times;
                                                        </span>
                                                        <h3 className="font-weight-bolder text-dark text-gradient">
                                                          New Delivery
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <form role="form text-left" method="POST" >
                                                            <label>Cutomer Name</label>
                                                            <div className="input-group mb-3">
                                                                <Select
                                                                    id="customer_id"
                                                                    name="customer_id"
                                                                    className="form-control"
                                                                    value={selectedInvoiceOptions}
                                                                    onChange={handleBatchSelect}
                                                                    options={invoiceOptions && invoiceOptions.map((batch) => ({
                                                                        value: batch.id,
                                                                        label: batch.name,
                                                                    }))}
                                                                    placeholder="--- Search Customer ---"
                                                                    isClearable
                                                                />
                                                            </div>
                                                           
                                                            <button
                                                                className="btn btn-icon-only btn-rounded btn-outline-danger btn-sm"
                                                                onClick={removeOrderNo}
                                                            >
                                                                <i className="fa-solid fa-minus"></i>
                                                            </button>
                                                            <label>Order No :</label>
                                                            <button
                                                                className="btn btn-icon-only btn-rounded btn-outline-success btn-sm"
                                                                onClick={addOrderNo}
                                                            >
                                                                <i className="fa-solid fa-plus"></i>
                                                            </button>
                                                            {orderNos.map((orderNo) => (
                                                                <div key={orderNo.id} className="input-group mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name={`order_no_${orderNo.id}`}
                                                                        placeholder={`Order No ${orderNo.id}`}
                                                                        value={orderNo.value}
                                                                        onChange={(e) => handleOrderNoChange(e, orderNo.id)}
                                                                        required
                                                                    />
                                                                </div>
                                                            ))}
                                                            
                                                            <div className="text-center">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-round bg-gradient-dark btn-lg w-100 mt-4 mb-0"
                                                                    disabled={isButtonDisabled}
                                                                    onClick={handleModalSubmit}
                                                                >
                                                                    {buttonText}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                                    <h6 className="d-block mt-2 mb-0 text-lg1 ">Delivered to: {invoiceData.name}</h6>
                                                    <p className="text-secondary text-lg1 ">
                                                        {invoiceData.phone}<br/>
                                                        {invoiceData.town}
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
                                                        {invoiceData.invoice_details > 0 && (
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
                                                                    {invoiceData.invoice_details.map((detail) => (
                                                                        <tr key={detail.id}>
                                                                            <td className="text-start text-lg1 " colSpan="4">{detail.orders?.id || ''}</td>
                                                                            <td className="ps-4 text-lg1 " colSpan="4"> {detail.orders?.comment || ''}</td>
                                                                            <td className="ps-4 text-lg1 " colSpan="4">
                                                                            {detail.orders?.kgs || ''}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        )}
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
