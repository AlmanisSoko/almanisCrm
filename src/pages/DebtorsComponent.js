import React from "react";
import APIHandler from "../utils/APIHandler";
import axios from 'axios';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";

class DebtorsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        CustomerDataList: [],
        filteredData: [],
        searchTerm: "",
        dataLoaded: false,
    };    

    componentDidMount() {
        this.fetchCustomerData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.CustomerDataList !== this.state.CustomerDataList) {
            this.searchData();
        }
        
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.searchData();
        }
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    searchData = () => {
        const { CustomerDataList, searchTerm } = this.state;
        const filteredData = CustomerDataList.filter(customer => {
            return customer.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
        this.setState({ filteredData });
    }    

    async fetchCustomerData() {
        var apihandler = new APIHandler();
        var customerdata = await apihandler.fetchUnderPayment();
        console.log(customerdata);
        this.setState({ CustomerDataList: customerdata.data.data });
        this.setState({ filteredData: customerdata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewCustomerProfile = (customer_id) => {
        console.log(customer_id);
        console.log(this.props);
        this.props.history.push("/customerdetails/" + customer_id);
    }

    viewCustomerDetails = (customer_id) => {
        console.log(customer_id);
        console.log(this.props);
        this.props.history.push("/customerprofile/" +  customer_id );
    }

    viewCustomerStatement = (customer_id) => {
        console.log(customer_id);
        console.log(this.props);
        this.props.history.push("/customerstatement/" + customer_id);
    }

    render() {

        // search customer

        const { filteredData } = this.state;

        return (
            <div className="main-panel">
                <div className="content-wrapper">
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
                        <h3 className="page-title"> ALL DEBTORS</h3>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Manage Debtorskykk99yyy0p0]000000000000o.</h4>
                                    <p className="card-description">
                                        
                                    </p>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div id="order-listing_filter" className="dataTables_filter">
                                                <label>
                                                    <ReactHTMLTableToExcel
                                                        table="order-listing"
                                                        filename="UnderPayment"
                                                        sheet="Sheet"
                                                        buttonText="customer file"
                                                        filetype="xls"
                                                        className="btn btn-success btn-rounded btn-fw"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <div id="order-listing_filter" className="dataTables_filter">
                                                <label>
                                                    <input
                                                        type="text"
                                                        className="form-control bg-transparent border-0"
                                                        value={this.state.searchTerm}
                                                        onChange={this.handleChange}
                                                        placeholder="Search Customer"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-3">
                                            <div id="order-listing_filter" className="dataTables_filter">
                                                
                                            </div>
                                        </div>
                                        
                                    </div>

                                    {this.state.dataLoaded === false ? (
                                        <div className="dot-opacity-loader">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    ) : ""}

                                    <div className="table-responsive">
                                        <table className="table table-hover" id="order-listing">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>NAME</th>
                                                    <th>PHONE</th>
                                                    <th>TOWN</th>
                                                    <th>REGION</th>
                                                    <th>BALANCE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.map((customer) => (
                                                    <tr key={customer.id}>
                                                    <td>{customer.id}</td>
                                                    <td>{customer.name}</td>
                                                    <td>
                                                        {
                                                            customer.phone.substring(0, 5)
                                                        }
                                                    </td>
                                                    <td>
                                                        {customer.town}
                                                    </td>
                                                    <td>
                                                        {
                                                            customer.region === 1
                                                            ? "NAIROBI" 
                                                            : customer.region === 2
                                                            ? "NYANZA"
                                                            : customer.region === 3
                                                            ? "CENTRAL"
                                                            : customer.region === 4
                                                            ? "COAST"
                                                            : customer.region === 5
                                                            ? "EASTERN"
                                                            : customer.region === 6
                                                            ? "NORTH EASTERN"
                                                            : customer.region === 7
                                                            ? "WESTERN"
                                                            : customer.region === 8
                                                            ? "RIFT VALLEY"
                                                            : customer.region
                                                        }
                                                    </td>
                                                    <td>{Number(customer.balance).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                                    
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <br/>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }
} 

export default DebtorsComponent;