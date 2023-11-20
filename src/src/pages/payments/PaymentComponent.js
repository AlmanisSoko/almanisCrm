import React from "react";
import APIHandler from "../../utils/APIHandler";
import { Link } from "react-router-dom";
import swal from 'sweetalert2';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class PaymentComponent extends React.Component {

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        PaymentsDataList: [],
        filteredData: [],
        searchTerm: "",
        dataLoaded: false,
    };
    
    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchPaymentData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.PaymentsDataList !== this.state.PaymentsDataList) {
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
        const { PaymentsDataList, searchTerm } = this.state;
        const filteredData = PaymentsDataList.filter(payments => {
            return payments.paying_number.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
        this.setState({ filteredData });
    } 

    // searchData = () => {
    //     const { PaymentsDataList, searchTerm, orderNoSearchTerm } = this.state;
    //     const filteredData = PaymentsDataList.filter((payments) => {
    //         const matchesPaymentSource = payments.paying_number.toLowerCase().includes(searchTerm.toLowerCase());
    //         const matchesOrderNo = payments.orders_id?.toString().includes(orderNoSearchTerm.toLowerCase());
    //         // Return results that match either payment source or order number
    //         return matchesPaymentSource || matchesOrderNo;
    //     });
    //     this.setState({ filteredData });
    // };
    
    

    async fetchPaymentData() {
        var apihandler = new APIHandler();
        var paymentsdata = await apihandler.fetchAllPayment();
        console.log(paymentsdata);
        this.setState({ PaymentsDataList: paymentsdata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewPaymentDetails = (payments_id) => {
        console.log(payments_id);
        console.log(this.props);
        this.props.history.push("/paymentdetails/" + payments_id);
    };

    deletePayments = async (payments_id) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            try {
                var apihandler = new APIHandler();
                const response = await apihandler.deletePayment(payments_id);

                // If the delete was successful, update the state to remove the deleted payment
                if (response && response.data && response.data.error === false) {
                    this.setState((prevState) => ({
                        PaymentsDataList: prevState.PaymentsDataList.filter((payment) => payment.id !== payments_id),
                    }));

                    // Show success notification using swal
                    swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Payment deleted successfully!",
                    });
                } else {
                    // Show error notification using swal
                    swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to delete the payment. Please try again.",
                    });
                }
            } catch (error) {
                // Show error notification using swal
                swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while deleting the payment. Please try again.",
                });
            }
        }
    };

    render() { 
        // get paymentss per page

        const { filteredData } = this.state;

        return(
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
                        <h3 className="page-title"> ALL PAYMENTS</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Manage Payments</h4>
                                    <p className="card-description">
                                        
                                    </p>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div id="order-listing_filter" className="dataTables_filter">
                                                <Link to={"/addpayment"}>
                                                    <button type="button" className="btn btn-info btn-rounded btn-fw">
                                                        Add Payment<div className="ripple-container"></div>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <div id="order-listing_filter" className="dataTables_filter">
                                                <label>
                                                    <input 
                                                         type="text"
                                                         className="form-control"
                                                         onChange={this.handleChange}
                                                         placeholder="Search Payments.."
                                                         aria-controls="order-listing"
                                                    />
                                                    <ReactHTMLTableToExcel
                                                        table="order-listing"
                                                        filename="payment_report"
                                                        sheet="Sheet"
                                                        buttonText="excel file"
                                                        filetype="xls"
                                                        className="btn btn-info btn-rounded btn-fw"
                                                    />
                                                </label>
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
                                                    <th>#SRNO</th>
                                                    <th>#ORDNO</th>
                                                    <th>PAYMENT SOURCE.</th>
                                                    <th>AMOUNT</th>
                                                    <th>PAYMENT MODE</th>
                                                    <th>PAYMENT</th>
                                                    <th>CUSTOMER</th>
                                                    <th>PAYED ON</th>
                                                    <th>ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.map((payments) => (
                                                    <tr key={payments.id}>
                                                    <td>{payments.id}</td>
                                                    <td>{payments.orders_id}</td>
                                                    <td>{payments.paying_number}</td>
                                                    <td>{payments.amount}</td>
                                                    <td>
                                                        {payments.payment_mode === 1
                                                        ? "Cash" 
                                                        : payments.payment_mode === 2
                                                        ? "Mpesa"
                                                        : payments.payment_mode === 3
                                                        ? "Bank"
                                                        : payments.payment_mode === 4
                                                        ? "Trade in" 
                                                        : payments.payment_mode === 5
                                                        ? "Promotion"
                                                        : payments.payment_mode
                                                        }
                                                    </td>
                                                    <td>{payments.payment}</td>
                                                    <td>{payments.customer.name}</td>
                                                    <td>{new Date(payments.added_on).toLocaleString()}</td>
                                                    <td>
                                                        <button
                                                        className="btn btn-block btn-success"
                                                        onClick={() =>
                                                            this.viewPaymentDetails(payments.id)
                                                        }
                                                        >
                                                        Repossess
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-block btn-danger"
                                                            onClick={() =>
                                                            this.deletePayments(payments.id)
                                                        }>
                                                        <i className="ti-trash">delete</i>
                                                        </button>
                                                    </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <br/>
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

export default PaymentComponent;