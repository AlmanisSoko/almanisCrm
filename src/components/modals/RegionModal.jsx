import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify'; // Import ToastContainer
import { saveRegion } from '../../actions/auth';

const RegionModal = ({ closeModal, saveRegion }) => {
    const [buttonText, setButtonText] = useState('Add Region'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false); // Button state
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        region: '',
    })

    const { region } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setButtonDisabled(true); // Disable the button during submission
    
            // Call your API function to save the batch
            const response = await saveRegion(region);
    
            console.log('API Response:', response);
            if (response && response.success !== undefined) {
                if (response.success === true) {
                    toast.success('Region Added Successfully', { toastId: 'success' });
                    setButtonText('Region Added Successfully'); // Change button text
                    setSubmitSuccess(true);
    
                    // Fetch the updated batch list after successful addition
                    await fetchAllRegion();
    
                    setTimeout(() => {
                    // Reset form fields
                    setFormData({
                        region: '',
                    });
    
                    // Reset the form using the ref
                    formRef.current.reset();
                    setButtonText('Add Region');
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

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} to ${value}`);
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    return (
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
                    <div className="model-body p-0">
                        <div className="card card-plain">
                            <div className="card-header pb-0 text-left">
                                <span className="close" onClick={closeModal}>
                                    &times;
                                </span>
                                <h3 className="font-weight-bolder text-dark text-gradient">
                                    New Region
                                </h3>
                            </div>
                            <div className="card-body">
                                <form role="form text-left" ref={formRef} method="POST" onSubmit={onSubmit}>
                                    <label>Region</label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="region"
                                            placeholder="Region"
                                            value={formData.region}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    region: state.auth.region,
});

const mapDispatchToProps = (dispatch) => {
    return {
        saveRegion: (region) =>
            dispatch(saveRegion(region))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionModal)
