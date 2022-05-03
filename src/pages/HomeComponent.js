import React from "react";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";
import AutoCompleteCustomer from "../components/AutoCompleteCustomer";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    farmerlist: [],
    customersDetails: [
      {
        id: 0,
        phone: "",
        name: "",
        customer_id: "",
      },
    ],
    dataLoaded: false,
    kgs: "",
    price: "",
    packaging: "",
    discount: "",
    transport: "",
    amount: "",
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
      event.target.region.value,
      event.target.kgs.value,
      event.target.packaging.value,
      event.target.discount.value,
      event.target.transport.value,
      event.target.comment.value,
      event.target.farmer_id.value,
      event.target.price.value,
      event.target.amount.value,
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
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
  }

  qtyChangeUpdate = (event) => {
    var value = event.target.value;

    this.state.total =
      ((parseInt(this.state.packaging) +
        parseInt(this.state.transport) -
        parseInt(this.state.discount)) +
      (parseInt(this.state.kgs) * parseInt(this.state.price))) * value;
    this.state.amount = value;
    this.setState({});
  };


  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>MANAGE ORDERS & CUSTOMERS</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Add Order</h2>
                    <ul className="header-dropdown m-r--5">
                        <Link to="/addcustomer" className="toggled waves-effect waves-block">   
                            <button className="btn btn-primary m-r-15 waves-effect">
                                Add Customer
                            </button>
                        </Link>
                    </ul>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                  {this.state.customersDetails.map((item, index) => (
                    <div className="row" key={index}> 
                        <div className="col-lg-6"> 
                            <label htmlFor="email_address">
                              Phone No.{" "}
                            </label>
                            <div className="form-group">
                              <div className="form-line">
                                <AutoCompleteCustomer
                                  itemPostion={index}
                                  showDataInInputs={this.showDataInInputs}
                                />
                              </div>
                            </div>
                        </div> 

                        <div className="col-lg-5"> 
                          <label htmlFor="email_address">Customer Name</label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter Customer Name"
                                defaultValue={item.name}
                              />
                            </div>
                          </div>
                        </div> 

                        <div className="col-sm-1"> 
                          <label htmlFor="email_address">No</label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="customer_id"
                                name="customer_id"
                                className="form-control"
                                placeholder=""
                                defaultValue={item.customer_id}
                              />
                            </div>
                          </div>
                        </div> 
                    </div>
                  ))}
                    <div className="row">
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
                            />
                          </div>
                        </div>
                      </div> 
                    
                      <div className="col-lg-4"> 
                        <label htmlFor="email_address">Region</label>
                        <div className="form-group">
                          <div className="form-line">
                            <select id="region" name="region" className="form-control show-tick">
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
                              onChange={this.qtyChangeUpdate}
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
                              onChange={this.qtyChangeUpdate}
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
                              onChange={this.qtyChangeUpdate}
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
                              onChange={this.qtyChangeUpdate}
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
                              <option key={item.id} value={item.id}>
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
                              onChange={this.qtyChangeUpdate}
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
                              value={this.state.amount}
                              onChange={this.qtyChangeUpdate}
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
                          ? "Add Order"
                          : "Adding Order Please Wait.."}
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

export default HomeComponent;
