import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllInvoice, deleteInvoice, saveInvoice, fetchCustomerOnly } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../../components/csv/ExportCSV';
import { toast } from 'react-toastify'; // Import ToastContainer
import Select from 'react-select';

const Invoice = ({ isAuthenticated, fetchAllInvoice, customer, invoice, saveInvoice, deleteInvoice, fetchCustomerOnly, }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const invoicePerPage = 11;
    const maxPagesDisplayed = 3;

    const [formData, setFormData] = useState({
        customer_id: '',
        invoice_details: [],
    })

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const formRef = useRef(null); // Create a ref for the form
    const [buttonText, setButtonText] = useState('Add Invoice'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state

    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } 
    }, [isAuthenticated, navigate, ]);

    // Update useEffect for fetching custome data
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const invoice = await fetchAllInvoice();
                console.log('All invoice',invoice)
                
            } catch (error) {
                console.error('Error fetching batch data:', error);
            }
        };

        fetchInvoice();
    }, [fetchAllInvoice]);


    const { customer_id, invoice_details } = formData;

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} to ${value}`);
        setFormData({
          ...formData,
          [name]: value,
        });
        setSelectedInvoice({
            ...selectedInvoice,
            [name]: value,
          });
    };

    // submit form to handle saving batch modal

    const [selectedInvoiceOptions, setSelectedInvoiceOption] = useState(null);
    const [invoiceOptions, setInvoiceOptions] = useState([]);

    // Update useEffect for fetching custome data
    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const invoices = await fetchCustomerOnly();
                console.log(invoices)
                setInvoiceOptions(invoices);
            } catch (error) {
                console.error('Error fetching batch data:', error);
            }
        };

        fetchInvoiceData();
    }, [fetchCustomerOnly]);

    const handleBatchSelect = (selectedOption) => {
        setSelectedInvoiceOption(selectedOption);
        if (selectedOption) {
            setFormData({
                ...formData,
                customer_id: selectedOption.value, // Assign the selected batch's id to customer_id
            });
            setSelectedInvoiceOption(selectedOption);
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        setFormData({
            customer_id: '',
            invoice_details: [],
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setButtonDisabled(true); // Disable the button during submission
    
            // Call your API function to save the batch
            const response = await saveInvoice(customer_id, invoice_details);
    
            console.log('API Response:', response);
            if (response && response.error !== undefined) {
                if (response.error === false) {
                    toast.success('Invoice Added Successfully', { toastId: 'success' });
                    setButtonText('Invoice Added Successfully'); // Change button text
                    setSubmitSuccess(true);
    
                    // Fetch the updated batch list after successful addition
                    await fetchAllInvoice();
    
                    setTimeout(() => {
                    // Reset form fields
                    setFormData({
                        customer_id: '',
                        invoice_details: '',
                    });
    
                    // Reset the form using the ref
                    formRef.current.reset();
                    setButtonText('Add Invoice');
                    setButtonDisabled(false);
                    setButtonDisabled(false);
                    }, 200);
                } else {
                    toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
                }
            } else {
                toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
            }
        } catch (error) {
            console.log('Error during form submission:', error);
            toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
        } finally {
            setButtonDisabled(false); // Re-enable the button
        }
    };

    // set responsive styles
    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const desktopStyle =  {
        width: 'calc(100% - 265px)',
        marginLeft: '265px',
    };

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    // handles delete
    const handleDelete = async (invoice_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this Invoice?');

        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }

        try {
            await deleteInvoice(invoice_id);
            await fetchAllInvoice();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Invoice deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete the Invoice. Please try again.',
            });
        }
    };

    // Pagination
    const filteredInvoice = invoice
        ? invoice.filter((invoices) =>
              invoices.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    const indexOfLastInvoice = currentPage * invoicePerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - invoicePerPage;
    const currentInvoice = filteredInvoice.slice(indexOfFirstInvoice, indexOfLastInvoice);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredInvoice.length / invoicePerPage),
        startPage + maxPagesDisplayed - 1
    );

    const fileName = 'egg_data';   

    const [orderNos, setOrderNos] = useState([{ id: 1, value: '' }]); // Initial state for order numbers

    // Function to handle adding a new order number input field
    const addOrderNo = () => {
        const newOrderNos = [...orderNos, { id: orderNos.length + 1, value: '' }];
        setOrderNos(newOrderNos);
    };

    // Function to handle removing the last order number input field
    const removeOrderNo = () => {
        if (orderNos.length > 1) {
            const newOrderNos = orderNos.slice(0, -1);
            setOrderNos(newOrderNos);
        }
    }

     // Function to handle changes in the order number input values
     const handleOrderNoChange = (e, orderId) => {
        const newOrderNos = orderNos.map((orderNo) =>
            orderNo.id === orderId ? { ...orderNo, value: e.target.value } : orderNo
        );
        setOrderNos(newOrderNos);

        // Update invoice_details in the form data
        const updatedInvoiceDetails = newOrderNos.map((orderNo) => ({
            orders_id: orderNo.value,
        }));

        setFormData({
            ...formData,
            invoice_details: updatedInvoiceDetails,
        });
    };

    const downloadInvoice = (invoice_id) => {
        navigate('/download-invoice/' + invoice_id);
    };

    if (!invoice) {
        invoice = []; // Ensure invoice is defined even if it's initially undefined
    }
    
    return (
        <div>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <button
                                type="button"
                                className="btn btn-outline-white"
                                onClick={openModal}
                            >
                                <i className="fa-solid fa-receipt"></i> Create Invoice
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
                                                          New Invoice
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <form role="form text-left" ref={formRef} method="POST" onSubmit={onSubmit}>
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

                        <div className="d-flex">
                            <ExportCSV csvData={invoice} fileName={fileName} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="table-responsive">
                                    <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        <div className="dataTable-top">
                                            <div className="dataTable-search">
                                                <input
                                                    className="dataTable-input"
                                                    placeholder="Search..."
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="dataTable-container">
                                            {filteredInvoice.length > 0 ? (
                                                <table className="table table-flush dataTable-table" id="datatable-search">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th data-sortable="" style={{ width: '4' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Id
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15.5%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                   Name
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15.5%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                   Phone
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15.5%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Town
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15.5%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Added on
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15.5%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Action
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15.5%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10' }}>
                                                                <a href="#" className="dataTable-sorter"></a>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {currentInvoice.length > 0 ? (
                                                            currentInvoice.map((invoices) => (
                                                                <tr key={invoices.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{invoices.id}</p>
                                                                        </div>
                                                                    </td>
                                                                     <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{invoices.customer.name}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{invoices.customer.town}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(invoices.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => downloadInvoice(invoices.id)}
                                                                            >
                                                                                <i className="fa-solid fa-download" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Download</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                            className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                            onClick={() => handleDelete(invoices.id)}
                                                                            >
                                                                            <i className="fas fa-times" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span className="my-2 text-xs">Delete</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="7">No records found.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p>No records found.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="dataTable-bottom">
                                            <div className="dataTable-info">Showing {filteredInvoice.length} entries</div>
                                            <nav className="dataTable-pagination">
                                                <ul className="dataTable-pagination-list">
                                                    <li className="pager">
                                                        <a href="#" data-page="1" onClick={() => paginate(currentPage - 1)}>
                                                            ‹
                                                        </a>
                                                    </li>
                                                    {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                                                        <li
                                                            key={index}
                                                            className={currentPage === startPage + index ? 'active' : ''}
                                                        >
                                                            <a
                                                                href="#"
                                                                data-page={startPage + index}
                                                                onClick={() => paginate(startPage + index)}
                                                            >
                                                                {startPage + index}
                                                            </a>
                                                        </li>
                                                    ))}
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredInvoice.length / invoicePerPage) && (
                                                        <li className="pager">
                                                            <a
                                                                href="#"
                                                                data-page={currentPage + 1}
                                                                onClick={() => paginate(currentPage + 1)}
                                                            >
                                                                ›
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
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
    invoice: state.auth.invoice,
    customer: state.auth.customer
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllInvoice: () => dispatch(fetchAllInvoice()),
        fetchCustomerOnly: () => dispatch(fetchCustomerOnly()),
        deleteInvoice: (invoice_id) => dispatch(deleteInvoice(invoice_id)),
        saveInvoice: (customer_id, invoice_details) =>
            dispatch(saveInvoice(customer_id, invoice_details))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
