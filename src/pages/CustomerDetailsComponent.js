import React from "react";
import APIHandler from "../utils/APIHandler";

class CustomerDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        console.log(props.match.params.id);
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        orders: [],
        payments: [],
        CustomerDataList: [],
        name: "",
        phone: "",
        town: "",
        region: "",
        dataLoaded: false,

    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.editCustomerData(
            event.target.name.value,
            event.target.phone.value,
            event.target.town.value,
            event.target.region.value,
            this.props.match.params.id
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    componentDidMount() {
        this.fetchCustomerData();
    }

    async fetchCustomerData() {
        var apihandler = new APIHandler();
        var customerdata = await apihandler.fetchCustomerDetails(this.props.match.params.id);
        console.log(customerdata);
        this.setState({ orders: customerdata.data.data.orders });
        this.setState({ payments: customerdata.data.data.payments });
        this.setState({ name: customerdata.data.data.name });
        this.setState({ phone: customerdata.data.data.phone });
        this.setState({ town: customerdata.data.data.town });
        this.setState({ region: customerdata.data.data.region });
        this.setState({ dataLoaded: true });
       // this.setState({ customerdata:data.data });
    }

    viewCustomerDetails = (customer_id) => {
        console.log(customer_id);
        console.log(this.props);
        this.props.history.push("/customerdetails/" + customer_id);
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">

                    <div className="block-header">
                        <h2>MANAGE CUSTOMERS</h2>
                    </div>
                                
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        EDIT CUSTOMER
                                    </h2>

                                    {this.state.dataLoaded === false ? (
                                    <div className="text-center">
                                        <div className="preloader pl-size-xl">
                                            <div className="spinner-layer">
                                                <div className="circle-clipper left">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="circle-clipper right">
                                                    <div className="circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ) : ""}
                                    
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>
                                        <div className="row"> 
                                            <div className="col-lg-6">
                                                    <label htmlFor="email_address">Name</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="name" name="name" className="form-control" placeholder="Enter Customer Name" defaultValue={this.state.name} />
                                                        </div>
                                                    </div>
                                            </div>        

                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Phone</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="phone" name="phone" className="form-control" placeholder="Enter Customer phone" defaultValue={this.state.phone} />
                                                        </div>
                                                    </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Town</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="town" name="town" className="form-control" placeholder="Enter Customer town" defaultValue={this.state.town} />
                                                        </div>
                                                    </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <label htmlFor="email_address">Region</label>
                                                    <div className="form-group">
                                                        <div className="form-line">
                                                            <input type="text" id="region" name="region" className="form-control" placeholder="Enter Customer region" defaultValue={this.state.region} />
                                                        </div>
                                                    </div>
                                            </div>

                                        </div>        

                                        <br/>
                                        <button
                                            type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true}
                                            >
                                            {this.state.btnMessage === 0
                                                ? "Edit Customer"
                                                : "Editing Customer Please Wait.."}
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

                    <div className="row clearfix">
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                            <div className="card">
                            <div className="header">
                            </div>
                                {this.state.dataLoaded === false ? (
                                    <div className="text-center">
                                        <div className="preloader pl-size-xl">
                                            <div className="spinner-layer">
                                                <div className="circle-clipper left">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="circle-clipper right">
                                                    <div className="circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                        
                            <div className="body table-responsive">
                                <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th>#ORDER NO</th>
                                    <th>AMOUNT</th>
                                    <th>COMMENT</th>
                                    <th>ORDERED ON</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.orders.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.amount}</td> 
                                        <td>{customer.comment}</td>
                                        <td>{new Date(customer.added_on).toLocaleString()}</td>
                                    </tr>  
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="header">
                                </div>
                                {this.state.dataLoaded === false ? (
                                    <div className="text-center">
                                        <div className="preloader pl-size-xl">
                                            <div className="spinner-layer">
                                                <div className="circle-clipper left">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="circle-clipper right">
                                                    <div className="circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ""}
                                <div className="body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#ORDER NO</th>
                                                <th>PAYMENT</th>
                                                <th>BALANCE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.payments.map((customer) => (
                                            <tr key={customer.id}>
                                                <td>{customer.orders_id}</td>
                                                <td>{customer.payment}</td> 
                                                <td>{customer.balance}</td>
                                            </tr>  
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        );
    }

}

export default CustomerDetailsComponent;
