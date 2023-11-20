import React from "react";
import APIHandler from "../../utils/APIHandler";
import Select from 'react-select';
import swal from 'sweetalert2';

class OrderDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.updateKgs = this.updateKgs.bind(this);
        this.updatePackaging = this.updatePackaging.bind(this);
        this.updateDiscount = this.updateDiscount.bind(this);
        this.updateTransport = this.updateTransport.bind(this);
        this.updateRider = this.updateRider.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateVat = this.updateVat.bind(this);
        console.log(props.match.params.id);
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        farmerlist:[],
        customerlist: [],
        selectedFarmer: null,
        selectedCustomer: null,
        selectedCustomerName: "",
        selectedCustomerPhone: "",
        phone: "",
        name: "",
        customer_id: "",
        town: "",
        kgs: "",
        packaging: "",
        discount: "",
        transport: "",
        transporters: "",
        rider: "",
        comment: "",
        farmer_id: "",
        rice_type: "",
        vat: "",
        farmer_price: "",
        price: "",
        amount: "",
        dataLoaded: false, 
    };

    // This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchOrdersData();
        this.LoadFarmer();
      
        // Manually set initial values based on customer_id
        const initialCustomer = this.state.customerlist.find(
          (customer) => customer.id === this.state.customer_id
        );
      
        if (initialCustomer) {
          this.setState({
            selectedCustomer: initialCustomer,
            selectedCustomerName: initialCustomer.name
          });
        }
      }      

    async fetchOrdersData() {
        var apihandler = new APIHandler();
        var ordersdata = await apihandler.fetchOrdersDetails(this.props.match.params.id);
        console.log(ordersdata)
        
        /// Assuming that the selected customer's id is available in ordersdata.data.data.customer_id
        const selectedCustomer = this.state.customerlist.find(
            (customer) => customer.id === ordersdata.data.data.customer_id
        );
    
        this.setState({
            phone: ordersdata.data.data.phone,
            name: ordersdata.data.data.name,
            customer_id: ordersdata.data.data.customer_id,
            town: ordersdata.data.data.town,
            region: ordersdata.data.data.region,
            kgs: ordersdata.data.data.kgs,
            packaging: ordersdata.data.data.packaging,
            discount: ordersdata.data.data.discount,
            transport: ordersdata.data.data.transport,
            transporters: ordersdata.data.data.transporters,
            rider: ordersdata.data.data.rider,
            comment: ordersdata.data.data.comment,
            farmer_id: ordersdata.data.data.farmer_id,
            rice_type: ordersdata.data.data.rice_type,
            farmer_price: ordersdata.data.data.farmer_price,
            price: ordersdata.data.data.price,
            amount: ordersdata.data.data.amount,
            dataLoaded: true,
            selectedCustomer: selectedCustomer, // Add this line to set the selected customer
            selectedCustomerName: selectedCustomer ? selectedCustomer.name : "",
            selectedCustomerPhone: selectedCustomer ? selectedCustomer.phone : "",
        });
    }

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
          var response = await apiHandler.editOrdersData(
            event.target.phone.value,
            event.target.name.value,
            event.target.customer_id.value,
            event.target.town.value,
            event.target.kgs.value,
            event.target.packaging.value,
            event.target.discount.value,
            event.target.transport.value,
            event.target.transporters.value,
            event.target.rider.value,
            event.target.comment.value,
            event.target.farmer_id.value,
            event.target.rice_type.value,
            event.target.vat.value,
            event.target.farmer_price.value,
            event.target.price.value,
            event.target.amount.value,
            this.props.match.params.id
          );
          console.log(response);
          this.setState({ erroRes: response.data.error });
          this.setState({ errorMessage: response.data.message });
          window.location.replace("/orders");
        } else if (willEdit.isDenied) {
          swal.fire('Changes are not saved', '', 'info');
        }
      
        this.setState({ btnMessage: 0 });
        this.setState({ sendData: true });
    }
      

    async LoadFarmer() {
        var apihandler = new APIHandler();
        var farmerdata = await apihandler.fetchFarmerOnly();
        var customerdata = await apihandler.fetchCustomerOnly();
        this.setState({ farmerlist: farmerdata.data });
        this.setState({ customerlist: customerdata.data });
    }

    updateKgs = (event) => {
      this.setState({
        kgs: event.target.value
      }, () => this.updateAmount());
     }
    
     updatePackaging = (event) => {
      this.setState({
        packaging: event.target.value
      }, () => this.updateAmount());
     }
    
     updateDiscount = (event) => {
      this.setState({
        discount: event.target.value
      }, () => this.updateAmount());
     }
    
     updateTransport = (event) => {
      this.setState({
        transport: event.target.value
      }, () => this.updateAmount());
     }

     updateRider = (event) => {
      this.setState({
        rider: event.target.value
      }, () => this.updateAmount());
     }
    
     updatePrice = (event) => {
      this.setState({
        price: event.target.value
      }, () => this.updateAmount());
     }
    
     updateVat = (event) => {
        this.setState({
          vat: event.target.value
        }, () => this.updateAmount());
       }
    
     updateAmount = () => {
      this.setState({
        amount: (Number(this.state.kgs) * Number(this.state.price)) + Number(this.state.packaging) + Number(this.state.rider)
            + Number(this.state.transport) - Number(this.state.discount)// * (Number(this.state.vat)/100)
      });  
     }

     handleChange = (event) => {
        this.setState({
            rice_type: event.target.value,
        })
     }

     handleChange1 = (event) => {
        this.setState({
            transporters: event.target.value
        })
     }

     handleFarmerSelect = (selectedoption) => {
        this.setState({
            selectedFarmer: selectedoption
        })
     }

     handleCustomerSelect = (selectedoption1) => {
        this.setState({
            selectedCustomer: selectedoption1
        })
     }
    
     render() {
        
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="container-fluid">
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
                            <h3 className="page-title"> MANAGE ORDER</h3>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">

                                        </h4>
                                        <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                            <p className="card-description"> Edit Order </p>
                                            <div className="row" > 
                                                    <div className="col-lg-3"> 
                                                        <div className="form-group bmd-form-group">
                                                            <label >
                                                            Phone No
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="phone"
                                                                name="phone"
                                                                className="form-control"
                                                                placeholder="edit name to pupulate"
                                                                //defaultValue={ this.state.phone}
                                                                value={
                                                                    this.state.selectedCustomerPhone ||
                                                                    (this.state.selectedCustomer
                                                                      ? this.state.selectedCustomer.phone
                                                                      : this.state.phone)
                                                                  }
                                                                required
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div> 

                                                    <div className="col-lg-5"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Customer Name</label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            className="form-control"
                                                            placeholder=""
                                                            //value={this.state.selectedCustomerName}
                                                            value={
                                                                this.state.selectedCustomerName ||
                                                                (this.state.selectedCustomer
                                                                  ? this.state.selectedCustomer.name
                                                                  : this.state.name)
                                                              }
                                                            required
                                                            readOnly
                                                        />
                                                    </div>
                                                    </div> 

                                                    <div className="col-md-4">
                                                        <div className="form-group bmd-form-group">
                                                            <label>No/Name</label>
                                                    
                                                            <Select
                                                            id="customer_id"
                                                            name="customer_id"
                                                            value={{
                                                                value: this.state.customer_id,
                                                                label: this.state.customerlist.find(customer => customer.id === this.state.customer_id)?.name
                                                            }}
                                                            options={this.state.customerlist.map((customer) => ({
                                                                value: customer.id,
                                                                label: customer.name,
                                                            }))}
                                                            onChange={(selectedOption1) => {
                                                                const selectedCustomerId = selectedOption1.value;
                                                                const selectedCustomer = this.state.customerlist.find(
                                                                (customer) => customer.id === selectedCustomerId
                                                                );

                                                                this.setState({
                                                                customer_id: selectedCustomerId,
                                                                selectedCustomer: selectedCustomer,
                                                                selectedCustomerName: selectedCustomer ? selectedCustomer.name : "",
                                                                selectedCustomerPhone: selectedCustomer ? selectedCustomer.phone : "", 
                                                                });
                                                            }}
                                                            placeholder="--- Search farmer ---"
                                                            isClearable
                                                            />

                                                        </div>
                                                    </div>
                                                
                                            </div>


                                            <div className="row">
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Town</label>
                                                        <input
                                                        type="text"
                                                        id="town"
                                                        name="town"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.town}
                                                        required
                                                        />
                                                    </div>
                                                </div> 
                                                
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Kgs : </label>
                                                        <input
                                                        type="text"
                                                        id="kgs"
                                                        name="kgs"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.kgs}
                                                        onChange={this.updateKgs}
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Packaging</label>
                                                        <input
                                                        type="text"
                                                        id="packaging"
                                                        name="packaging"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.packaging}
                                                        onChange={this.updatePackaging}
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Discount.</label>
                                                        <input
                                                        type="text"
                                                        id="discount"
                                                        name="discount"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.discount}
                                                        onChange={this.updateDiscount}
                                                        required
                                                        />
                                                    </div>
                                                </div> 

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Transport</label>
                                                        <input
                                                        type="text"
                                                        id="transport"
                                                        name="transport"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.transport}
                                                        onChange={this.updateTransport}
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                        <label >Transporters</label>
                                                        <select id="transporters" name="transporters" className="form-control show-tick" value={this.state.transporters} onChange={this.handleChange1}>
                                                            <option value="1">Others</option>
                                                            <option value="2">In-house</option>
                                                        </select>
                                                    </div>
                                                </div> 

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Rider</label>
                                                        <input
                                                        type="text"
                                                        id="rider"
                                                        name="rider"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.rider}
                                                        onChange={this.updateRider}
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Comment</label>
                                                        <input
                                                        type="text"
                                                        id="comment"
                                                        name="comment"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.comment}
                                                        required
                                                        />
                                                    </div>
                                                </div> 

                                                <div className="col-md-6">
                                                    <div className="form-group bmd-form-group">
                                                        <label>Farmer Name</label>
                                                        <Select
                                                        id="farmer_id"
                                                        name="farmer_id"
                                                        value={{ value: this.state.farmer_id, 
                                                            label: this.state.farmerlist.find(farmer => farmer.id === this.state.farmer_id)?.name
                                                        }}
                                                        options={this.state.farmerlist.map(farmer => ({
                                                            value: farmer.id,
                                                            label: farmer.name
                                                        }))}
                                                        onChange={selectedOption => this.setState({ farmer_id: selectedOption.value })}
                                                        placeholder="--- Search farmer ---"
                                                        isClearable
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                        <label >Rice Type</label>
                                                        <select id="rice_type" name="rice_type" className="form-control show-tick" value={this.state.rice_type} onChange={this.handleChange}>
                                                            <option value="1">Pishori</option>
                                                            <option value="2">Komboka</option>
                                                        </select>
                                                    </div>
                                                </div> 

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                        <label >V.A.T</label>
                                                        <select id="vat" name="vat" className="form-control show-tick" 
                                                        defaultValue={this.state.vat } onChange={this.updateVAT}>
                                                            <option value="100">0%</option>
                                                            <option value="114">14%</option>
                                                            <option value="116">16%</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Farmer Price</label>
                                                        <input
                                                        type="text"
                                                        id="farmer_price"
                                                        name="farmer_price"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.farmer_price}
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Almanis Price</label>
                                                        <input
                                                        type="text"
                                                        id="price"
                                                        name="price"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.price}
                                                        onChange={this.updatePrice}
                                                        required
                                                        />
                                                    </div>
                                                </div>   

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Amount</label>
                                                        <input
                                                        type="text"
                                                        id="amount"
                                                        name="amount"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.amount}
                                                        readOnly
                                                        />
                                                    </div>
                                                </div> 
                                                
                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                {this.state.btnMessage === 0 ? "Edit Order" : "Editing Order Please Wait.."}<div className="ripple-container"></div>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetailsComponent;