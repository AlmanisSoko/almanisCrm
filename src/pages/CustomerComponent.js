import React from "react";
import APIHandler from "../utils/APIHandler";
import AuthHandler from "../utils/AuthHandler";
import { Link } from "react-router-dom";

class CustomerComponent extends React.Component {

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
            event.target.address.value,
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
        return (
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
                                        ALL CUSTOMERS
                                    </h2>
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
                                                <th>#</th>
                                                <th>NAME</th>
                                                <th>PHONE</th>
                                                <th>TOWN</th>
                                                <th>REGION</th>
                                                <th>ADDED ON</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {this.state.CustomerDataList.map((customer) => (
                                               <tr key={customer.id}>
                                                   <td>{customer.id}</td>
                                                   <td>{customer.name}</td>
                                                   <td>{customer.phone}</td>
                                                   <td>{customer.town}</td>
                                                   <td>{customer.region}</td>
                                                   <td>{new Date(customer.added_on).toLocaleString()}</td>
                                                   <td>
                                                   <button
                                                    className="btn btn-block btn-warning"
                                                    onClick={() =>
                                                        this.viewCustomerDetails(customer.id)
                                                    }
                                                    >
                                                    View
                                                    </button>
                                                   </td>
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

export default CustomerComponent;