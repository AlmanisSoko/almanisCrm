import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import AutoCompleteCustomer from '../../../components/customer/AutoCompleteCustomer';
import { saveOrder, fetchFarmerOnly } from '../../../actions/auth';
import { toast } from 'react-toastify'; // Import ToastContainer
import Select from 'react-select';

const AddOrders = ({ isAuthenticated, saveOrder, fetchFarmerOnly }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        customer_id: '',
        town: '',
        Kgs: '',
        packaging: '',
        discount: '',
        transport: '',
        transporters: '',
        rider: '',
        comment: '',
        farmer_id: '',
        rice_type: '',
        vat: 0, // Initialize with 0% VAT
        farmer_price: '',
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
                formData.name,
                formData.phone,
                formData.customer_id,
                formData.town,
                formData.Kgs,
                formData.packaging,
                formData.discount,
                formData.transport,
                formData.transporters,
                formData.rider,
                formData.comment,
                formData.farmer_id,
                formData.rice_type,
                formData.vat,
                formData.farmer_price,
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
                        name: '',
                        phone: '',
                        customer_id: '',
                        town: '',
                        Kgs: '',
                        packaging: '',
                        discount: '',
                        transport: '',
                        transporters: '',
                        rider: '',
                        comment: '',
                        farmer_id: '',
                        rice_type: '',
                        vat: 0, // Initialize with 0% VAT
                        farmer_price: '',
                        price: '',
                        amount: '',
                    });
                    formRef.current.reset()
                    setButtonText('Add Order')
                    setButtonDisabled(false)
                    setSubmitSuccess(false)
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.log('Error during form submission', error)
            toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
            setButtonDisabled(false); // Re-enable the button
        }
    }

    // Update the amount when any of the input fields change
    const handleKgsChange = (e) => {
        const newFormData = { ...formData, Kgs: e.target.value };
        setFormData(newFormData);
    };

    const handlePackagingChange = (e) => {
        const newFormData = { ...formData, packaging: e.target.value };
        setFormData(newFormData);
    };

    const handleTransportChange = (e) => {
        const newFormData = { ...formData, transport: e.target.value };
        setFormData(newFormData);
    };

    const handleRiderChange = (e) => {
        const newFormData = { ...formData, rider: e.target.value };
        setFormData(newFormData);
    };

    const handleAlmanisPriceChange = (e) => {
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
        const numberOfKilosFloat = parseFloat(formData.Kgs);
        const trayPriceFloat = parseFloat(formData.price);
        const discountFloat = parseFloat(formData.discount);
        const packagingFloat = parseFloat(formData.packaging);
        const riderFloat = parseFloat(formData.rider);
        const transportFloat = parseFloat(formData.transport);
    
        if (!isNaN(numberOfKilosFloat) && !isNaN(trayPriceFloat) && !isNaN(discountFloat)) {
            // Calculate the amount based on the current VAT value
            const subTotal = (numberOfKilosFloat * trayPriceFloat) + packagingFloat + riderFloat + transportFloat - discountFloat;
            const vatAmount = (subTotal * formData.vat) / 100;
            const calculatedAmount = subTotal + vatAmount;
            const newFormData = { ...formData, amount: isNaN(calculatedAmount) ? '' : calculatedAmount.toFixed(2) };
            setFormData(newFormData);
        } else {
            const newFormData = { ...formData, amount: '' };
            setFormData(newFormData);
        }
    }, [formData.Kgs, formData.price, formData.discount, formData.vat, formData.rider]);
    

    const showDataInInputs = (index, item) => {
        if (item) {
            const updatedDetails = [...customersDetails];
            if (updatedDetails[index]) {
                updatedDetails[index].phone = item.phone;
                updatedDetails[index].name = item.name;
                updatedDetails[index].customer_id = item.id;
                setCustomersDetails(updatedDetails);
    
                // Update the formData state with the received data
                const newFormData = { ...formData };
                newFormData.name = item.name;
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

    // Update useEffect for fetching farmer data
    useEffect(() => {
        const fetchFamerData = async () => {
            try {
                const farmer = await fetchFarmerOnly();
                console.log(farmer)
                setFarmerOptions(farmer.results);
            } catch (error) {
                console.error('Error fetching Farmer data:', error);
            }
        };

        fetchFamerData();
    }, [fetchFarmerOnly]);

    const handleFarmerSelect = (selectedOption) => {
        setSelectedFarmerOption(selectedOption);
        if (selectedOption) {
            setFormData({
                ...formData,
                farmer_id: selectedOption.value, // Assign the selected farmer's id to customer_id
            });
            setSelectedFarmerOption(selectedOption);
        }
    };

    return (
        <>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/addcustomer" className="btn btn-outline-white">
                                <i className="fa-solid fa-user"></i> New Customer
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
                                                    <label>Customer Name</label>
                                                        <input
                                                            type="text"
                                                            name='name'
                                                            placeholder="Customer Name"
                                                            className="form-control"
                                                            value={item.name}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="form-group">
                                                    <label>Customer No</label>
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
                                                    <label>Town</label>
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
                                                    <label>Kilos</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="Kgs"
                                                        placeholder="Kgs"
                                                        value={formData.Kgs}
                                                        onChange={handleKgsChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Packaging</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="packaging"
                                                        placeholder="Packaging"
                                                        value={formData.packaging}
                                                        onChange={handlePackagingChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Discount</label>
                                                    <input
                                                        type="number"
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
                                                    <label>Transport</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="transport"
                                                        placeholder="Transport"
                                                        value={formData.transport}
                                                        onChange={handleTransportChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Transporters</label>
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            name="transporters"
                                                            value={formData.transporters}
                                                            onChange={(e) => onChange(e)}
                                                            required
                                                        >
                                                            <option value="">-- Transporters --</option>
                                                            <option value="1">Others</option>
                                                            <option value="2">Inhouse</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Rider</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="rider"
                                                        placeholder="Rider"
                                                        value={formData.rider}
                                                        onChange={handleRiderChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Comment</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="comment"
                                                        name='comment'
                                                        placeholder="Comment"
                                                        value={formData.comment}
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Farmer</label>
                                                    <div className="input-group">
                                                        <Select
                                                            id="farmer_id"
                                                            name="farmer_id"
                                                            className="form-control"
                                                            value={selectedFarmerOptions}
                                                            onChange={handleFarmerSelect}
                                                            options={farmerOptions && farmerOptions.map((farmer) => ({
                                                                value: farmer.id,
                                                                label: farmer.name,
                                                            }))}
                                                            placeholder="--- Search Farmer ---"
                                                            isClearable
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Rice Type</label>
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            name="rice_type"
                                                            value={formData.rice_type}
                                                            onChange={(e) => onChange(e)}
                                                            required
                                                        >
                                                            <option value="">-- Rice Type --</option>
                                                            <option value="1">Pishori</option>
                                                            <option value="3">Brown</option>
                                                            <option value="2">Komboka</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>V.A.T</label>
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
                                                    <label>Farmer Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="farmer_price"
                                                        id="farmer_price"
                                                        placeholder="Farmer Price"
                                                        value={formData.farmer_price}
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Almanis Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="price"
                                                        placeholder="Almanis Price"
                                                        value={formData.price}
                                                        onChange={handleAlmanisPriceChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Amount</label>
                                                    <input
                                                        type="number"
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
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    farmer: state.auth.farmer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFarmerOnly: () => dispatch(fetchFarmerOnly()),
        saveOrder: (name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount) =>
            dispatch(saveOrder(name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrders);
