import React from "react";
import AuthHandler from "../utils/AuthHandler";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

class PaymentsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
      }

      state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        customerlist: [],
        dataLoaded: false,
      };
    
      async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.savePaymentsData(
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
        this.LoadCustomer();
      }
    
      async LoadCustomer() {
        var apihandler = new APIHandler();
        var customerdata = await apihandler.fetchCustomerOnly();
        this.setState({ customerlist: customerdata.data });
      }
    
      viewPaymentsDetails = (payments_id) => {
        console.log(payments_id);
        console.log(this.props);
        this.props.history.push("/paymentsdetails/" + payments_id);
      };

    render() {
        return(
            <section className="content">
                <div className="container-fluid">

                    <div className="block-header">
                        <h2>MANAGE PAYMENTS</h2>
                    </div>

                    <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="card">
                        <div className="header">
                          
                          <h2>
                            Add Payment
                          </h2>

                        </div>

                        <div className="body">
                          <form onSubmit={this.formSubmit}>

                            <div className="row"> 

                              <div className="col-lg-6"> 
                                    <label htmlFor="email_address">Order No.</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="order_id" name="order_id" className="form-control" placeholder="Enter Order No" />
                                        </div>
                                    </div>
                              </div>             

                              <div className="col-lg-6"> 
                                    <label htmlFor="email_address">Paying No.</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="paying_number" name="paying_number" className="form-control" placeholder="Enter Paying No" />
                                        </div>
                                    </div>
                              </div>

                              <div className="col-lg-6"> 
                                    <label htmlFor="email_address">Amount.</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="amount" name="amount" className="form-control" placeholder="Enter Amount" />
                                        </div>
                                    </div>
                              </div> 

                              <div className="col-lg-6"> 
                                    <label htmlFor="email_address">Payment Mode.</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                          <select id="payment_mode" name="payment_mode" className="form-control show-tick">
                                            <option value="1">Cash</option>
                                            <option value="2">Mpesa</option>
                                          </select>
                                        </div>
                                    </div>
                              </div> 

                              <div className="col-lg-6"> 
                                    <label htmlFor="email_address">Payment.</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="payment" name="payment" className="form-control" placeholder="Enter Payment " />
                                        </div>
                                    </div>
                              </div>      

                              <div className="col-lg-6"> 
                                    <label htmlFor="email_address">Balance.</label>
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" id="balance" name="balance" className="form-control" placeholder="Enter Balance" />
                                        </div>
                                    </div>
                              </div>    

                              <div className="col-lg-6"> 
                                <label htmlFor="email_address">Customer</label>
                                <div className="form-group">
                                  <select className="form-control show-tick" id="customer_id" name="customer_id">
                                    {this.state.customerlist.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
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
                                      ? "Add Payment"
                                      : "Adding Payment Please Wait.."}
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

export default PaymentsComponent;