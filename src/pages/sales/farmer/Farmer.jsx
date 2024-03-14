import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchAllFarmer, deleteFarmer, saveFarmer } from '../../../actions/auth';
import swal from 'sweetalert2';
import { ExportCSV } from '../../../components/csv/ExportCSV';
import { toast } from 'react-toastify'; // Import ToastContainer

const Farmer = ({ isAuthenticated, fetchAllFarmer, farmer, deleteFarmer, saveFarmer, isSidebarOpen, user }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const farmersPerPage = 9;
    const maxPagesDisplayed = 5;

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
                    fetchAllFarmer();
            } else {
                // navigate('/');
            }
    }, [isAuthenticated, navigate, fetchAllFarmer]);

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

    const viewCustomer = (farmer_id) => {
        navigate('/farmerdetails/' + farmer_id);
    };

    const handleDelete = async (farmer_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this farmer?');

        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }

        try {
            await deleteFarmer(farmer_id);
            await fetchAllFarmer();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'farmer deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete the farmer. Please try again.',
            });
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const filteredFarmers = farmer
        ? farmer.filter((farmer) =>
              farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              farmer.phone.toLowerCase().includes(searchQuery.toLowerCase()) 

          )
        : [];

    const indexOfLastFarmer = currentPage * farmersPerPage;
    const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
    const currentFarmers = filteredFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredFarmers.length / farmersPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const fileName = 'farmer_data';

    const [isModalOpen, setModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    })

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        setFormData({
            name: '',
            Phone: '',
        });
    };

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const formRef = useRef(null); // Create a ref for the form
    const [buttonText, setButtonText] = useState('Add Farmer'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} to ${value}`);
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const { name, phone } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setButtonDisabled(true); // Disable the button during submission
    
            // Call your API function to save the batch
            const response = await saveFarmer(name, phone);
    
            console.log('API Response:', response);
            if (response && response.error !== undefined) {
                if (response.error === false) {
                    toast.success('Farmer Added Successfully', { toastId: 'success' });
                    setButtonText('Farmer Added Successfully'); // Change button text
                    setSubmitSuccess(true);
    
                    // Fetch the updated batch list after successful addition
                    await fetchAllFarmer();
    
                    setTimeout(() => {
                    // Reset form fields
                    setFormData({
                        name: '',
                        Phone: '',
                    });
    
                    // Reset the form using the ref
                    formRef.current.reset();
                    setButtonText('Add Farmer');
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

    return (
        <>
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
                                <i className="fa-solid fa-tractor"></i> New Farmer
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
                                                         Add Farmer
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <form role="form text-left" ref={formRef} method="POST" onSubmit={onSubmit}>
                                                            <label>Farmer Name</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="name"
                                                                    placeholder="name"
                                                                    aria-label="name"
                                                                    aria-describedby="password-addon"
                                                                    value={name}
                                                                    onChange={(e) => onChange(e)}
                                                                    required
                                                                />
                                                            </div>
                                                            <label>Phone Number</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="phone"
                                                                    placeholder="0700...."
                                                                    aria-label="phone"
                                                                    aria-describedby="password-addon"
                                                                    value={phone}
                                                                    onChange={(e) => onChange(e)}
                                                                    required
                                                                />
                                                            </div>
                                                            
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
                            <ExportCSV csvData={farmer} fileName={fileName} />
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
                                            {filteredFarmers.length > 0 ? (
                                                <table className="table table-flush dataTable-table" id="datatable-search">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th data-sortable="" style={{ width: '4.6514%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Id
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '26.3657%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Name
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '26.2286%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    contact
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter">
                                                                    Added on
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10%' }}>
                                                              <a href="#" className="dataTable-sorter">
                                                                Action
                                                              </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10' }}>
                                                              <a href="#" className="dataTable-sorter"></a>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {currentFarmers.length > 0 ? (
                                                            currentFarmers.map((farmer) => (
                                                                <tr key={farmer.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{farmer.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{farmer.name}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{farmer.phone}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(farmer.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => viewCustomer(farmer.id)}
                                                                            >
                                                                                <i className="fas fa-eye" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>View</span>
                                                                        </div>
                                                                    </td>
                                                                    {user && user.user_type === 'admin' && (
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => handleDelete(farmer.id)}
                                                                            >
                                                                              <i className="fas fa-times" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Delete</span>
                                                                        </div>
                                                                    </td>
                                                                    )}
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
                                            <div className="dataTable-info">Showing {filteredFarmers.length} entries</div>
                                            <nav className="dataTable-pagination">
                                                <ul className="dataTable-pagination-list">
                                                    <li className="pager">
                                                        <a href="#" data-page="1" onClick={() => paginate(1)}>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredFarmers.length / farmersPerPage) && (
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
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    farmer: state.auth.farmer,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllFarmer: () => dispatch(fetchAllFarmer()),
        deleteFarmer: (farmer_id) => dispatch(deleteFarmer(farmer_id)),
        saveFarmer: (name, phone) =>
            dispatch(saveFarmer(name, phone))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Farmer);
