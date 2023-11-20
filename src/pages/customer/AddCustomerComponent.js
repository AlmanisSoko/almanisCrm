import React from "react";
import APIHandler from "../../utils/APIHandler";
import swal from 'sweetalert2';

class AddCustomerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.formRef = React.createRef();
    }

    state = {
        errorRes: false, 
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        regionlist: [],
        dataLoaded: false,
    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCustomerData(
            event.target.name.value,
            event.target.phone.value,
            event.target.secondary_phone.value,
            event.target.alternative_phone.value,
            event.target.town.value,
            event.target.region.value,
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });

        if (this.state.errorRes === false &&
            this.state.sendData === true) {
                swal.fire('Customer Created Successfuly!', '', 'success');
          }

        if (this.state.errorRes === true &&
            this.state.sendData === true) {
                swal.fire('Customer Already Exist!', '', 'error');
        }
        this.formRef.current.reset();
    }
    
    // works when our page is ready
    componentDidMount() {
        this.LoadRegion();
    }

    async LoadRegion() {
        var apihandler = new APIHandler();
        var regiondata = await apihandler.fetchRegionOnly();
        this.setState({ regionlist: regiondata.data });
    }
    
    render() {
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
                            </div>
                        </div>
                        <div className="page-header">
                            <h3 className="page-title"> ADD CUSTOMER</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">Add Customer</h4>
                                        <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                            <p className="card-description">  </p>
                                            
                                            <div className="row">
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Name</label>
                                                        <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                        />
                                                    </div>
                                                </div> 
                                                
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Primary No: </label>
                                                        <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Secondary No:</label>
                                                        <input
                                                        type="text"
                                                        id="secondary_phone"
                                                        name="secondary_phone"
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Alternative No:</label>
                                                        <input
                                                        type="text"
                                                        id="alternative_phone"
                                                        name="alternative_phone"
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                        />
                                                    </div>
                                                </div> 

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Town</label>
                                                        <input
                                                        type="text"
                                                        id="town"
                                                        name="town"
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Region</label>
                                                    <select id="region" name="region" className="form-control show-tick" required>
                                                        <option value="">--- Please Select Region ---</option>
                                                        <option value="1">NAIROBI</option>
                                                        <option value="2">NYANZA</option>
                                                        <option value="3">CENTRAL</option>
                                                        <option value="4">COAST</option>
                                                        <option value="5">EASTERN</option>
                                                        <option value="6">NORTH EASTERN</option>
                                                        <option value="7">WESTERN</option>
                                                        <option value="8">RIFT VALLEY</option>
                                                    </select>
                                                    </div>
                                                </div>

                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                {this.state.btnMessage === 0 ? "Add Customer" : "Adding Customer Please Wait.."}<div className="ripple-container"></div>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCustomerComponent;