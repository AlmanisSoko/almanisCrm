import React from "react";
import APIHandler from "../../utils/APIHandler";
import swal from 'sweetalert2';

class AddFarmerComponent extends React.Component {

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
        FarmerDataList: [],
        dataLoaded: false,
    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveFarmerData(
            event.target.name.value,
            event.target.phone.value
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });

        if (this.state.errorRes === false &&
            this.state.sendData === true) {
                swal.fire('Farmer Created Successfuly', '', 'success')
          }

        if (this.state.errorRes === true &&
            this.state.sendData === true) {
                swal.fire('Oops! Something went wrong', '', 'error')
        }
        this.formRef.current.reset();
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
                            <h3 className="page-title"> ADD FARMER</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">Add Farmer</h4>
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
                                                    <label >Phone: </label>
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
                                                  

                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                {this.state.btnMessage === 0 ? "Add Farmer" : "Adding Farmer Please Wait.."}<div className="ripple-container"></div>
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

export default AddFarmerComponent;