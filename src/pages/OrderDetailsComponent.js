import React from "react";
import APIHandler from "../utils/APIHandler";

class OrderDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        console.log(props.match.params.id);
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        OrdersDataList: [],
        farmerlist:[],
        phone: "",
        name: "",
        customer_id: "",
        town: "",
        region: "",
        kgs: "",
        packaging: "",
        discount: "",
        transport: "",
        comment: "",
        farmer_id: "",
        price: "",
        amount: "",
        dataLoaded: false,
    };

    async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.editOrdersData(
        event.target.phone.value,
        event.target.name.value,
        event.target.customer_id.value,
        event.target.town.value,
        event.target.region.value,
        event.target.kgs.value,
        event.target.packaging.value,
        event.target.discount.value,
        event.target.transport.value,
        event.target.comment.value,
        event.target.farmer_id.value,
        event.target.price.value,
        event.target.amount.value,
        this.props.match.params.id
    );
    console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    //This Method Work When Our Page is Ready
    componentDidMount() {
       this.fetchOrdersData();
       this.LoadFarmer();
    }

    async fetchOrdersData() {
        var apihandler = new APIHandler();
        var ordersdata = await apihandler.fetchOrdersDetails(this.props.match.params.id);
        console.log(ordersdata);
        this.setState({ phone: ordersdata.data.data.phone });
        this.setState({ name: ordersdata.data.data.name });
        this.setState({ customer_id: ordersdata.data.data.customer_id });
        this.setState({ town: ordersdata.data.data.town });
        this.setState({ region: ordersdata.data.data.region });
        this.setState({ kgs: ordersdata.data.data.kgs });
        this.setState({ packaging: ordersdata.data.data.packaging });
        this.setState({ discount: ordersdata.data.data.discount });
        this.setState({ transport: ordersdata.data.data.transport });
        this.setState({ comment: ordersdata.data.data.comment });
        this.setState({ farmer_id: ordersdata.data.data.farmer_id });
        this.setState({ price: ordersdata.data.data.price });
        this.setState({ amount: ordersdata.data.data.amount });
        this.setState({ dataLoaded: true });
    }

    async LoadFarmer() {
        var apihandler = new APIHandler();
        var farmerdata = await apihandler.fetchFarmerOnly();
        this.setState({ farmerlist: farmerdata.data });
    }

    render() {
        return (
            <section className="content">
              <div className="container-fluid">
                <div className="block-header">
                  <h2>MANAGE ORDER</h2>
                </div>
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="card">
                      <div className="header">
                        <h2>Edit Order</h2>
                      </div>
                      <div className="body">
                        <form onSubmit={this.formSubmit}>
                          <div className="row"> 
                            <div className="col-lg-5"> 
                                <label htmlFor="email_address">Phone No.</label>
                                <div className="form-group">
                                  <div className="form-line">
                                    <input
                                      type="text"
                                      id="phone"
                                      name="phone"
                                      className="form-control"
                                      placeholder="Enter Phone No."
                                      defaultValue={this.state.phone}
                                    />
                                  </div>
                                </div>
                            </div>    
                            
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Customer Name</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    placeholder="Enter Customer Name"
                                    defaultValue={this.state.name}
                                  />
                                </div>
                              </div>
                            </div> 

                            <div className="col-sm-3"> 
                              <label htmlFor="email_address">Customer No</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="customer_id"
                                    name="customer_id"
                                    className="form-control"
                                    placeholder="Enter Customer Name"
                                    value={this.state.customer_id}
                                  />
                                </div>
                              </div>
                            </div>  
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Town</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="town"
                                    name="town"
                                    className="form-control"
                                    placeholder="Enter Customer Town"
                                    defaultValue={this.state.town}
                                  />
                                </div>
                              </div>
                            </div> 
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Region</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <select id="region" name="region" className="form-control show-tick" defaultValue="">
                                    <option value="1">Nairobi</option>
                                    <option value="2">Nyanza</option>
                                    <option value="3">Central</option>
                                    <option value="4">Coast</option>
                                    <option value="5">Eastern</option>
                                    <option value="6">North Eastern</option>
                                    <option value="7">Western</option>
                                    <option value="8">Rift Valley</option>
                                  </select>
                                </div>
                              </div>
                            </div> 
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Kgs : </label>
                              <div className="form-group">
                                <div className="form-line">
                                    <input
                                    type="text"
                                    id="kgs"
                                    name="kgs"
                                    className="form-control"
                                    placeholder="Enter Quantity."
                                    defaultValue={this.state.kgs}
                                    />
                                </div>
                              </div>
                            </div>
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Packaging</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="packaging"
                                    name="packaging"
                                    className="form-control"
                                    placeholder="Enter Amount"
                                    defaultValue={this.state.packaging}
                                  />
                                </div>
                              </div>
                            </div>
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Discount.</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="discount"
                                    name="discount"
                                    className="form-control"
                                    placeholder="Enter Discount."
                                    defaultValue={this.state.discount}
                                  />
                                </div>
                              </div>
                            </div> 
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Transport</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="transport"
                                    name="transport"
                                    className="form-control"
                                    placeholder="Enter Transport."
                                    defaultValue={this.state.transport}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Comment</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="comment"
                                    name="comment"
                                    className="form-control"
                                    placeholder="Enter Comment"
                                    defaultValue={this.state.comment}
                                  />
                                </div>
                              </div>
                            </div>  
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Farmer Name</label>
                              <div className="form-group">
                                <select className="form-control show-tick"
                                    id="farmer_id"
                                    name="farmer_id"
                                >
                                  {this.state.farmerlist.map((item) => (
                                    <option key={item.id} value={item.id} selected={
                                      item.id == this.state.farmer_id ? true : false
                                    } >
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>  

                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Price per Kg</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    className="form-control"
                                    placeholder="Enter Price"
                                    defaultValue={this.state.price}
                                  />
                                </div>
                              </div>
                            </div> 
      
                            <div className="col-lg-4"> 
                              <label htmlFor="email_address">Amount</label>
                              <div className="form-group">
                                <div className="form-line">
                                  <input
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    className="form-control"
                                    placeholder="Enter Amount"
                                    defaultValue={this.state.amount}
                                  />
                                </div>
                              </div>
                            </div> 
      
                          </div>  
      
                            <br />
                            <button
                              type="submit"
                              className="btn btn-success m-t-15 waves-effect "
                              disabled={this.state.btnMessage === 0 ? false : true}
                            >
                              {this.state.btnMessage === 0
                                ? "Edit Order"
                                : "Editing Order Please Wait.."}
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
          );
    }
}

export default OrderDetailsComponent;