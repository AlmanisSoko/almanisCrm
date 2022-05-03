import React from "react";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

class PaymentComponent extends React.Component {

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
        PaymentsDataList: [],
        dataLoaded: false,
      };
    
      async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.savePaymentData(
          event.target.order_id.value,
          event.target.paying_number.value,
          event.target.amount.value,
          event.target.payment_mode.value,
          event.target.payment.value,
          event.target.balance.value,
          event.target.customer_id.value
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
      }
    
      //This Method Work When Our Page is Ready
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
            <section className="content">
                <div className="container-fluid">

                    <div className="block-header">
                        <h2>MANAGE PAYMENT</h2>
                    </div>

                    <div className="row clearfix">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                          <div className="header">
                            
                            <h2>
                              All Payment
                            </h2>

                            <ul className="header-dropdown m-r--5">
                                <Link to="/addpayment" className="toggled waves-effect waves-block">   
                                    <button className="btn btn-primary m-r-15 waves-effect">
                                        Add Payment
                                    </button>
                                </Link>
                            </ul>

                          </div>
                          <div className="body table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>ORDER NO</th>
                                  <th>PAYING NO.</th>
                                  <th>AMOUNT</th>
                                  <th>PAYMENT MODE</th>
                                  <th>PAYMENT</th>
                                  <th>BALANCE</th>
                                  <th>CUSTOMER</th>
                                  <th>PAYED ON</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.PaymentsDataList.map((payments) => (
                                  <tr key={payments.id}>
                                    <td>{payments.id}</td>
                                    <td>{payments.orders_id}</td>
                                    <td>{payments.paying_number}</td>
                                    <td>{payments.amount}</td>
                                    <td>
                                      {payments.payment_mode === 1
                                        ? "Cash" : "Mpesa"
                                      }
                                    </td>
                                    <td>{payments.payment}</td>
                                    <td>{payments.balance}</td>
                                    <td>{payments.customer.name}</td>
                                    <td>{new Date(payments.added_on).toLocaleString()}</td>
                                    
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
        )
    }
}

export default PaymentComponent;