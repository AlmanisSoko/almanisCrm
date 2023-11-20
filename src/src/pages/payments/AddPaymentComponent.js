import React from "react";
import APIHandler from "../../utils/APIHandler";
import AutoCompleteOrder from "../../components/AutoCompleteOrder";
import swal from 'sweetalert2';

class AddPaymentComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.formRef = React.createRef();
      }
  
      state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        remainingBalance: 0,
        sendData: false,
        customerlist: [],
        ordersDetails: [
          {
            id: 0,
            customer_id: "",
            amount: "",
          },
        ],
        dataLoaded: false,
      };
    
    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
    
        const orderAmount = parseFloat(this.state.ordersDetails[0].amount);
        const paymentAmount = parseFloat(event.target.payment.value);
    
        if (isNaN(paymentAmount) || paymentAmount <= 0) {
          this.setState(
            {
              errorRes: true,
              errorMessage: "Invalid payment amount. Please enter a valid amount.",
              btnMessage: 0,
            },
            () => {
              // Display error message using sweetalert2
              swal.fire("Error", this.state.errorMessage, "error");
            }
          );
        } else if (paymentAmount > orderAmount) {
          this.setState(
            {
              errorRes: true,
              errorMessage: "Payment amount cannot exceed the order amount.",
              btnMessage: 0,
            },
            () => {
              // Display error message using sweetalert2
              swal.fire("Error", this.state.errorMessage, "error");
            }
          );
        } else {
          // If payment amount is valid, proceed with form submission
          var apiHandler = new APIHandler();
          var response = await apiHandler.savePaymentsData(
            event.target.orders_id.value,
            event.target.paying_number.value,
            event.target.amount.value,
            event.target.payment_mode.value,
            event.target.payment.value,
            event.target.customer_id.value
          );
    
          console.log(response);
          this.setState({ btnMessage: 0 });
          this.setState({ errorRes: response.data.error });
          this.setState({ errorMessage: response.data.message });
          this.setState({ sendData: true });
    
          if (this.state.errorRes === false && this.state.sendData === true) {
            // Set the remainingBalance state here
            this.setState({ remainingBalance: response.data.remaining_balance });
          
            // Include remainingBalance in the success message
            swal.fire(this.state.errorMessage, `Remaining Balance: ${this.state.remainingBalance}`, "success");
            window.location.reload();
          } else {
            // Include remainingBalance in the error message
            swal.fire("Error", `${this.state.errorMessage}\nRemaining Balance: ${this.state.remainingBalance}`, "error");
          }
          
    
        }
    }
    //.......
  
      showDataInInputs = (index, item) => {
        console.log(index);
        console.log(item);
        this.state.ordersDetails[index].id = item.id;
        this.state.ordersDetails[index].amount = item.amount;
        this.state.ordersDetails[index].customer_id = item.customer_id;
        this.setState({})
      } 

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
                        <h3 className="page-title"> MANAGE PAYMENT</h3>
                    </div>
                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    
                                    <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                        <p className="card-description"> 
                                            Add Payment
                                        </p>
                                        {this.state.ordersDetails.map((item, index) => (
                                        <div className="row" key={index}>
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group">
                                        <label >Order No:{" "}</label>
                                                    <AutoCompleteOrder
                                                    itemPostion={index}
                                                    showDataInInputs={this.showDataInInputs}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group">
                                                    <label >Payment Source:</label>
                                                    <input type="text" id="paying_number" name="paying_number"  className="form-control" required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group">
                                                    <label >Amount:</label>
                                                    <input type="text" id="amount" name="amount" defaultValue={item.amount} className="form-control" required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group is-filled">
                                                    <label >Payment Mode</label>
                                                    <select id="payment_mode" name="payment_mode" className="form-control show-tick" required>
                                                        <option value="">--- Select Payment option ---</option>
                                                        <option value="1">Cash</option>
                                                        <option value="2">Mpesa</option>
                                                        <option value="3">Bank</option>
                                                        <option value="4">Barter Trade</option>
                                                        <option value="5">Promotion</option>
                                                        <option value="6">Compensation</option>
                                                        <option value="7">Top UP</option>
                                                    </select>    
                                                </div>
                                            </div>
                                        </div>
                                        ))}

                                        {this.state.ordersDetails.map((item, index) => (
                                        <div className="row" key={index}>

                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group">
                                                    <label >Payment:</label>
                                                    <input type="text" id="payment" name="payment"  className="form-control" required/>
                                                </div>
                                            </div>
                                        
                                        
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group is-filled">
                                                    <label >Customer No:</label>
                                                    <input
                                                    type="text"
                                                    id="customer_id"
                                                    name="customer_id"
                                                    className="form-control"
                                                    placeholder=""
                                                    defaultValue={item.customer_id}
                                                    required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        ))}
                                        <br/>
                                        <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                            {this.state.btnMessage === 0 ? "Add Payment" : "Adding Payment Please Wait.."}<div className="ripple-container"></div>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPaymentComponent;