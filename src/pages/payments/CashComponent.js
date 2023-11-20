import React from "react";
import APIHandler from "../../utils/APIHandler";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class CashComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        PaymentsDataList: [],
        dataLoaded: false
    }

    // This method works when the page loads
    componentDidMount() {
        this.fetchPaymentData();
    }

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

    render() {

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
                        <h3 className="page-title"> CASH PAYMENTS</h3>
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
                                            <div className="dataTables_length" id="order-listing_length">
                                                <label>
                                                <ReactHTMLTableToExcel
                                                    table="cash"
                                                    filename="cash_list"
                                                    sheet="Sheet"
                                                    buttonText="excel file"
                                                    filetype="xls"
                                                    className="btn btn-info btn-rounded btn-fw"
                                                />
                                                </label>
                                            </div>
                                        </div> 
                                        <div className="col-sm-12 col-md-6">
                                            <div id="order-listing_filter" className="dataTables_filter">
                                                <label><input type="search" className="form-control" placeholder="Search" aria-controls="order-listing"/></label>
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
                                        <table className="table table-hover" id="cash">
                                            <thead>
                                                <tr>
                                                    <th>#SRNO</th>
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
                                                {this.state.PaymentsDataList.filter((payments) => {
                                                return payments.payment_mode === 1
                                                }).map((payments) => (
                                                    <tr key={payments.id}>
                                                    <td>{payments.id}</td>
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
                                                        : "Promo"
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
                                        <div class="dataTables_paginate paging_simple_numbers" id="order-listing_paginate">
                                            
                                        </div>
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

export default CashComponent;