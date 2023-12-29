import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import AutoCompleteCustomer from '../../../components/customer/AutoCompleteCustomer';
import { saveOrder, fetchCustomerOnly } from '../../../actions/auth';
import { toast } from 'react-toastify'; // Import ToastContainer
import Select from 'react-select';

const AddOrders = ({ isAuthenticated, saveOrder, fetchCustomerOnly }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        customer_id: '',
        town: '',
        Kgs: '',
        discount: '',
        vat: 'V.A.T', // Initialize with 0% VAT
        price: '',
        amount: '',
    });

    const [customersDetails, setCustomersDetails] = useState([
        {
            id: 0,
            phone: '',
            name: '',
            customer_id: '',
        },
    ]);
    
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const formRef = useRef(null); // Create a ref for the form
    const [buttonText, setButtonText] = useState('Add Order'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} to ${value}`);
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setButtonDisabled(true);
            console.log("form data" ,formData);
            const response = await saveOrder(
                formData.customer_name,
                formData.phone,
                formData.customer_id,
                formData.town,
                formData.Kgs,
                formData.discount,
                formData.vat,
                formData.price,
                formData.amount
            );
            console.log(response);
    
            if (response.data.error) {
                toast.error(response.data.message, { toastId: 'error' });
                setButtonDisabled(false);
            } else {
                toast.success('Order Added Successfully', { toastId: "success" });
                setButtonText('Order Added Successfully')
                setButtonDisabled(true)
    
                setTimeout(() => {
                    setFormData({
                        customer_name: '',
                        phone: '',
                        customer_id: '',
                        town: '',
                        Kgs: '',
                        discount: '',
                        vat: 0, // Initialize with 0% VAT
                        price: '',
                        amount: '',
                    });
                    formRef.current.reset()
                    setButtonText('Add Order')
                    setButtonDisabled(false)
                    setSubmitSuccess(false)
                }, 2000);
            }
        } catch (error) {
            console.log('Error during form submission', error)
            toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
            setButtonDisabled(false); // Re-enable the button
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
           // navigate('/');
        } else {
            //
        }
    }, [isAuthenticated]);
    
    if (!isAuthenticated) {
        navigate('/');
    } 

    // Update the amount when any of the input fields change
    const handleTraysChange = (e) => {
        const newFormData = { ...formData, Kgs: e.target.value };
        setFormData(newFormData);
    };

    const handlePricePerTrayChange = (e) => {
        const newFormData = { ...formData, price: e.target.value };
        setFormData(newFormData);
    };

    const handleDiscountChange = (e) => {
        const newFormData = { ...formData, discount: e.target.value };
        setFormData(newFormData);
    };

    const handleVATChange = (e) => {
        const newFormData = { ...formData, vat: parseFloat(e.target.value) };
        setFormData(newFormData);
    };

    // Calculate total amount
    useEffect(() => {
        const numberOfTraysFloat = parseFloat(formData.Kgs);
        const trayPriceFloat = parseFloat(formData.price);
        const discountFloat = parseFloat(formData.discount);
    
        if (!isNaN(numberOfTraysFloat) && !isNaN(trayPriceFloat) && !isNaN(discountFloat)) {
            // Calculate the amount based on the current VAT value
            const subTotal = numberOfTraysFloat * trayPriceFloat - discountFloat;
            const vatAmount = (subTotal * formData.vat) / 100;
            const calculatedAmount = subTotal + vatAmount;
            const newFormData = { ...formData, amount: isNaN(calculatedAmount) ? '' : calculatedAmount.toFixed(2) };
            setFormData(newFormData);
        } else {
            const newFormData = { ...formData, amount: '' };
            setFormData(newFormData);
        }
    }, [formData.Kgs, formData.price, formData.discount, formData.vat]);
    

    const showDataInInputs = (index, item) => {
        if (item) {
            const updatedDetails = [...customersDetails];
            if (updatedDetails[index]) {
                updatedDetails[index].phone = item.phone;
                updatedDetails[index].customer_name = item.name;
                updatedDetails[index].customer_id = item.id;
                setCustomersDetails(updatedDetails);
    
                // Update the formData state with the received data
                const newFormData = { ...formData };
                newFormData.customer_name = item.name;
                newFormData.customer_id = item.id;
                newFormData.phone = item.phone;
                setFormData(newFormData);
            }
        }
    };
    

    // Styles
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

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const [selectedFarmerOptions, setSelectedFarmerOption] = useState(null);
    const [farmerOptions, setFarmerOptions] = useState([]);

    // Update useEffect for fetching custome data
    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const farmer = await fetchCustomerOnly();
                console.log(farmer)
                setFarmerOptions(farmer);
            } catch (error) {
                console.error('Error fetching Farmer data:', error);
            }
        };

        fetchInvoiceData();
    }, [fetchCustomerOnly]);

    const handleFarmerSelect = (selectedOption) => {
        setSelectedFarmerOption(selectedOption);
        if (selectedOption) {
            setFormData({
                ...formData,
                customer_id: selectedOption.value, // Assign the selected batch's id to customer_id
            });
            setSelectedFarmerOption(selectedOption);
        }
    };

    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/addcustomer" className="btn btn-outline-white">
                                <i className="fa-solid fa-arrow-right"></i> New Customer
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="font-weight-bolder">Add New Order</h5>
                                    <form  ref={formRef} method="POST" onSubmit={onSubmit}>
                                        {customersDetails.map((item, index) => (
                                            <div className="row" key={index}>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <AutoCompleteCustomer
                                                            itemPosition={index}
                                                            name="phone"
                                                            showDataInInputs={showDataInInputs}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name='customer_name'
                                                            placeholder="Customer Name"
                                                            className="form-control"
                                                            value={item.customer_name}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name='customer_id'
                                                            placeholder="Customer No"
                                                            className="form-control"
                                                            disabled
                                                            value={item.customer_id}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="town"
                                                        name='town'
                                                        value={formData.town}
                                                        placeholder="Town"
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Kgs"
                                                        placeholder="Kgs"
                                                        value={formData.Kgs}
                                                        onChange={handleTraysChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Kgs"
                                                        placeholder="Packaging"
                                                        value={formData.Kgs}
                                                        onChange={handleTraysChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="discount"
                                                        placeholder="Discount"
                                                        value={formData.discount}
                                                        onChange={handleDiscountChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="discount"
                                                        placeholder="Transport"
                                                        value={formData.discount}
                                                        onChange={handleDiscountChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            name="vat"
                                                            value={formData.vat}
                                                            onChange={handleVATChange}
                                                            required
                                                        >
                                                            <option value="">Transporters</option>
                                                            <option value={14}>Others</option>
                                                            <option value={16}>Inhouse</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="discount"
                                                        placeholder="Rider"
                                                        value={formData.discount}
                                                        onChange={handleDiscountChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="discount"
                                                        placeholder="Comment"
                                                        value={formData.discount}
                                                        onChange={handleDiscountChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <Select
                                                            id="customer_id"
                                                            name="customer_id"
                                                            className="form-control"
                                                            value={selectedFarmerOptions}
                                                            onChange={handleFarmerSelect}
                                                            options={farmerOptions && farmerOptions.map((batch) => ({
                                                                value: batch.id,
                                                                label: batch.name,
                                                            }))}
                                                            placeholder="--- Search Customer ---"
                                                            isClearable
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            name="vat"
                                                            value={formData.vat}
                                                            onChange={handleVATChange}
                                                            required
                                                        >
                                                            <option value={0}>0%</option>
                                                            <option value={14}>14%</option>
                                                            <option value={16}>16%</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="price"
                                                        placeholder="Price Per Tray"
                                                        value={formData.price}
                                                        onChange={handlePricePerTrayChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="amount"
                                                        placeholder="Amount"
                                                        value={formData.amount}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn bg-gradient-dark btn-lg w-100"
                                            disabled={isButtonDisabled}
                                        >
                                            {buttonText}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    farmer: state.auth.farmer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomerOnly: () => dispatch(fetchCustomerOnly()),
        saveOrder: (customer_id, product, invoice_details) =>
            dispatch(saveOrder(customer_id,  product, invoice_details))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrders);
