import React from "react";
import APIHandler from "../utils/APIHandler";

class AddCustomerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        CustomerDataList: [],
        dataLoaded: false,
    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveCustomerData(
            event.target.name.value,
            event.target.phone.value,
            event.target.town.value,
            event.target.region.value,
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }
    
    // works when our page is ready
    componentDidMount() {
        this.fetchCustomerData();
    }

    async fetchCustomerData() {
        var apihanler = new APIHandler();
        var customerdata = await apihanler.fetchAllCustomer();
        console.log(customerdata);
        this.setState({ CustomerDataList: customerdata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewCustomerDetails = (customer_id) => {
        console.log(customer_id);
        console.log(this.props);
        this.props.history.push("/customerdetails/" + customer_id);
    }

    render() {
        return(
            <section className="content">
                <div className="container-fluid">

                    <div className="block-header">
                        <h2>MANAGE CUSTOMER</h2>
                    </div>

                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    
                                    <h2>
                                        ADD CUSTOMER
                                    </h2>
                                    
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>

                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" name="name" className="form-control" placeholder="Enter Customer Name" />
                                            </div>
                                        </div>

                                            <label htmlFor="email_address">Phone</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="phone" name="phone" className="form-control" placeholder="Enter Customer phone" />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Town</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="town" name="town" className="form-control" placeholder="Enter Customer Town" />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Region</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="region" name="region" className="form-control" placeholder="Enter Customer Region" />
                                            </div>
                                        </div>

                                        <br/>
                                        <button
                                            type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true}
                                            >
                                            {this.state.btnMessage === 0
                                                ? "Add Customer"
                                                : "Adding Customer Please Wait.."}
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

export default AddCustomerComponent;