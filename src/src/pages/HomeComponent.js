import React from "react";
import AutoCompleteCustomer from "../components/AutoCompleteCustomer";
import Select from 'react-select';
import APIHandler from "../utils/APIHandler";
import swal from 'sweetalert2';
import { Link } from "react-router-dom";

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.updateKgs = this.updateKgs.bind(this);
        this.updatePackaging = this.updatePackaging.bind(this);
        this.updateDiscount = this.updateDiscount.bind(this);
        this.updateTransport = this.updateTransport.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateRider = this.updateRider.bind(this);
        this.updateVat = this.updateVat.bind(this);
        this.formRef = React.createRef();
      }
    
      state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        farmerlist: [],
        selectedFarmer: null,
        kgs: "",
        price: "",
        packaging: "",
        discount: "",
        transport: "",
        rider: "",
        amount: "",
        vat: "",
        customersDetails: [
          {
            id: 0,
            phone: "",
            name: "",
            customer_id: "",
          },
        ],
        dataLoaded: false, 
      };
    
      async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveOrdersData(
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
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        if (this.state.errorRes === false &&
          this.state.sendData === true) {
            swal.fire('Saved!', '', 'success');
            window.location.reload();
        }
         
        if (this.state.errorRes === true &&
          this.state.sendData === true) {
            swal.fire('Oops!! Something went wrong', '', 'error')
        }
        this.formRef.current.reset();
      }
    
      //This Method Work When Our Page is Ready
      
      componentDidMount() {
        this.LoadFarmer();
      }
    
      async LoadFarmer() {
        var apihandler = new APIHandler();
        var farmerdata = await apihandler.fetchFarmerOnly();
        this.setState({ farmerlist: farmerdata.data });
      }
    
      showDataInInputs = (index, item) => {
        console.log(index);
        console.log(item);
        this.state.customersDetails[index].id = item.id;
        this.state.customersDetails[index].phone = item.phone;
        this.state.customersDetails[index].name = item.name;
        this.state.customersDetails[index].customer_id = item.id;
        this.setState({})
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
          vat: event.target.value,
        }, () => this.updateAmount());
    }
    
     updateAmount = () => {
      this.setState({
        amount: (Number(this.state.kgs) * Number(this.state.price)) + Number(this.state.packaging) + Number(this.state.rider)
            + Number(this.state.transport) - Number(this.state.discount)// * (Number(this.state.vat)/100)
      });  
     }

     handleFarmerSelect = (selectedoption) => {
        this.setState({
            selectedFarmer: selectedoption
        })
     }
    

    render() {
        const { selectedFarmer, farmerlist } = this.state;
        
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
                            <h3 className="page-title">ADD ORDERS & CUSTOMERS</h3>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            <Link to={"/addcustomer"}>
                                                <button type="button" className="btn btn-info btn-rounded btn-fw">
                                                    Add Customer<div className="ripple-container"></div>
                                                </button>
                                            </Link> 
                                        </h4>
                                        <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                            <p className="card-description">  </p>
                                            {this.state.customersDetails.map((item, index) => (
                                                <div className="row" key={index}> 
                                                    <div className="col-lg-6"> 
                                                        <div className="form-group bmd-form-group">
                                                        <label >
                                                        Phone No.{" "}
                                                        </label>
                                                            <AutoCompleteCustomer
                                                            itemPostion={index}
                                                            showDataInInputs={this.showDataInInputs}
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
                                                            defaultValue={item.name}
                                                            required
                                                        />
                                                    </div>
                                                    </div> 

                                                    <div className="col-sm-1"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >No</label>
                                                        <input
                                                            type="text"
                                                            id="customer_id"
                                                            name="customer_id"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={item.customer_id}
                                                            required
                                                            readOnly
                                                        />
                                                    </div>
                                                    </div> 
                                                </div>
                                            ))}
                                            
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
                                                        <select id="transporters" name="transporters" className="form-control show-tick" required>
                                                            <option value="">--- Please select an option ---</option>
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
                                                        value={selectedFarmer}
                                                        onChange={this.handleFarmerSelect}
                                                        options={farmerlist.map((farmer) => ({
                                                        value: farmer.id,
                                                        label: farmer.name,
                                                        }))}
                                                        placeholder="--- Search farmer ---"
                                                        isClearable
                                                        required
                                                    />
                                                    </div>
                                                </div>
 
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                        <label >Rice Type</label>
                                                        <select id="rice_type" name="rice_type" className="form-control show-tick" required>
                                                            <option value="">--- Please select an option ---</option>
                                                            <option value="1">Pishori</option>
                                                            <option value="2">Komboka</option>
                                                        </select>
                                                    </div>
                                                </div> 

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                        <label >V.A.T</label>
                                                        <select id="vat" name="vat" className="form-control show-tick" 
                                                        defaultValue={this.state.vat } onChange={this.updateVAT} required>
                                                            <option value="">--- Please choose an option ---</option>
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
                                                {this.state.btnMessage === 0 ? "Add Order" : "Adding Order Please Wait.."}<div className="ripple-container"></div>
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

export default HomeComponent;
