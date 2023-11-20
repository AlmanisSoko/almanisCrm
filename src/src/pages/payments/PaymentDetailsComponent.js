import React from "react";
import APIHandler from "../../utils/APIHandler";
import Select from 'react-select';
import swal from 'sweetalert2';

class PaymentDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        console.log(props.match.params.id);
        this.formRef = React.createRef();
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        customerlist: [],
        selectedCustomer: null,
        orders_id: "",
        paying_number: "",
        amount: "",
        payment_mode: "",
        payment: "",
        customer_id: "",
        dataLoaded: false,
    };

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        const willEdit = await swal.fire({
          title: "Do you want to save changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        });
      
        if (willEdit.isConfirmed) {
          swal.fire('Saved!', '', 'success');
          var apiHandler = new APIHandler(); 
          var response = await apiHandler.editPaymentData(
            event.target.orders_id.value,
            event.target.paying_number.value,
            event.target.amount.value,
            event.target.payment_mode.value,
            event.target.payment.value,
            event.target.customer_id.value,
            this.props.match.params.id 
          );
          console.log(response);
          this.setState({ erroRes: response.data.error });
          this.setState({ errorMessage: response.data.message });
          window.location.replace("/payments");
        } else if (willEdit.isDenied) {
          swal.fire('Changes are not saved', '', 'info');
        }
      
        this.setState({ btnMessage: 0 });
        this.setState({ sendData: true });
      }
      

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchPaymentData();
        this.LoadCustomer();
    }
    
    async fetchPaymentData() {
        var apihandler = new APIHandler();
        var paymentsdata = await apihandler.fetchPaymentDetails(this.props.match.params.id);
        console.log(paymentsdata);
        this.setState({ orders_id: paymentsdata.data.data.orders_id });
        this.setState({ paying_number: paymentsdata.data.data.paying_number });
        this.setState({ amount: paymentsdata.data.data.amount });
        this.setState({ payment_mode: paymentsdata.data.data.payment_mode });
        this.setState({ payment: paymentsdata.data.data.payment });
        this.setState({ customer_id: paymentsdata.data.data.customer_id });
        this.setState({ dataLoaded: true });
    }

    async LoadCustomer() {
        var apihandler = new APIHandler();
        var customerdata = await apihandler.fetchCustomerOnly();
        this.setState({ customerlist: customerdata.data });
    }

    handleChange = (event) => {
        this.setState({
            payment_mode: event.target.value
        })
    }

    handleCustomerSelect = (selectedoption) => {
        this.setState({
            selectedCustomer: selectedoption
        })
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
                                    
                                    <form className="form-sample" onSubmit={this.formSubmit}>
                                        <p className="card-description"> 
                                            Edit Payment
                                        </p>
                                    
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group">
                                                    <label  >Order No:</label>
                                                    <input type="text" id="orders_id" name="orders_id" className="form-control" defaultValue={this.state.orders_id} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group">
                                                    <label  >Payment Source:</label>
                                                    <input type="text" id="paying_number" name="paying_number" defaultValue={this.state.paying_number} className="form-control" required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group">
                                                    <label  >Amount:</label>
                                                    <input type="text" id="amount" name="amount" defaultValue={this.state.amount} className="form-control" required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group is-filled">
                                                    <label  >Payment Mode</label>
                                                    <select id="payment_mode" name="payment_mode" className="form-control show-tick" value={this.state.payment_mode} onChange={this.handleChange}>
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
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group bmd-form-group">
                                                        <label  >Payment:</label>
                                                        <input type="text" id="payment" name="payment" defaultValue={this.state.payment} className="form-control" required/>
                                                    </div>
                                                </div>
                                        
                                        
                                            <div className="col-md-6">
                                                <div className="form-group bmd-form-group is-filled">
                                                    <label  >Customer:</label>
                                                    <Select
                                                        id="customer_id"
                                                        name="customer_id"
                                                        value={{ value: this.state.customer_id, 
                                                            label: this.state.customerlist.find(customer => customer.id === this.state.customer_id)?.name
                                                        }}
                                                        options={this.state.customerlist.map(customer => ({
                                                            value: customer.id,
                                                            label: customer.name
                                                        }))}
                                                        onChange={selectedOption => this.setState({ customer_id: selectedOption.value })}
                                                        placeholder="--- Search customer ---"
                                                        isClearable
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                            {this.state.btnMessage === 0 ? "Edit Payment" : "Editing Payment Please Wait.."}<div className="ripple-container"></div>
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

export default PaymentDetailsComponent;