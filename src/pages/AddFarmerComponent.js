import React from "react";
import APIHandler from "../utils/APIHandler";

class AddFarmerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
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
    }

    componentDidMount() {
        this.fetchFarmerData();
    }

    async fetchFarmerData() {
        var apihanler = new APIHandler();
        var farmerdata = await apihanler.fetchAllFarmer();
        console.log(farmerdata);
        this.setState({ FarmerDataList: farmerdata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewFarmerDetails = (farmer_id) => {
        console.log(farmer_id);
        console.log(this.props);
        this.props.history.push("/farmerdetails/" + farmer_id);
    }
    render() {
        return (
            <section className="content">
                <div className="container-fluid">

                    <div className="block-header">
                        <h2>MANAGE FARMERS</h2>
                    </div>
                                
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        ADD FARMER
                                    </h2>
                                    
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>

                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" name="name" className="form-control" placeholder="Enter Farmer Name" />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Phone</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="contact" name="phone" className="form-control" placeholder="Enter Farmer contact" />
                                            </div>
                                        </div>

                                        <br/>
                                        <button
                                            type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true}
                                            >
                                            {this.state.btnMessage === 0
                                                ? "Add Farmer"
                                                : "Adding Farmer Please Wait.."}
                                        </button>
                                            <br />
                                            {this.state.errorRes === false &&
                                            this.state.sendData === true ? (
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> {this.state.errorMessage}.
                                            </div>
                                            ) : (
                                            ""
                                            )}
                                            {this.state.errorRes === true &&
                                            this.state.sendData === true ? (
                                            <div className="alert alert-danger">
                                                <strong>Failed!</strong>
                                                {this.state.errorMessage}.
                                            </div>
                                            ) : (
                                            ""
                                            )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>        
        )
    }
}

export default AddFarmerComponent;