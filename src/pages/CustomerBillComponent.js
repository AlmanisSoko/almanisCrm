import React from "react";
import APIHandler from "../utils/APIHandler";
import AutoCompleteOrder from "../components/AutoCompleteOrder";

class CustomerBillComponent extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    ordersDetails: [
      {
        id: 0,
        kgs: "",
        price: "",
        packaging: "",
        discount: "",
        transport: "",
        amount: "",
      },
    ],
  };

  async formSubmit(event) {
    event.preventDefault();
    console.log(this.state.ordersDetails);
    console.log(event.target.customer_name.value);
    console.log(event.target.phone.value);

    this.setState({ btnMessage: 1 });

    var customer_name = event.target.customer_name.value;
    var phone = event.target.phone.value;

    var apiHandler = new APIHandler();
    var response = await apiHandler.generateBill(
      event.target.customer_name.value,
      event.target.phone.value,
      this.state.ordersDetails
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });

    this.billGeneratePrint(
      customer_name,
      phone,
      this.state.ordersDetails
    );
  }

  billGeneratePrint(customer_name, phone, ordersDetails) {
    var billDetails =
      "<style> table{ width:100%;border-collapse:collapse; } td{ padding:5px } th { padding:5px } </style><div>";
    billDetails += "<table border='1'>";
    billDetails += "<tr>";
    billDetails += "<td style='text-align:center' colspan='7'>";
    billDetails += "Bill For Customer";
    billDetails += "</td>";
    billDetails += "</tr>";
    billDetails += "<tr>";
    billDetails += "<td colspan='4'>";
    billDetails += "NAME : " + customer_name;
    billDetails += "</td>";
    billDetails += "<td colspan='4'>";
    billDetails += "PHONE : " + phone;
    billDetails += "</td>";
    billDetails += "</tr>";
    billDetails += "<tr>";
    billDetails += "<th>";
    billDetails += "ORDER NO .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "KGS .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "PRICE PER KG .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "PACKAGING .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "DISCOUNT .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "TRANSPORT .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "AMOUNT .";
    billDetails += "</th>";
    billDetails += "</tr>";
    var totalamt = 0;

    for (var i = 0; i < ordersDetails.length; i++) {
      billDetails += "<tr>";
      billDetails += "<td>";
      billDetails += "" + ordersDetails[i].id;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + ordersDetails[i].kgs;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + ordersDetails[i].price;
      billDetails += "</td>";
	  billDetails += "<td>";
      billDetails += "" + ordersDetails[i].packaging;
      billDetails += "</td>";
	  billDetails += "<td>";
      billDetails += "" + ordersDetails[i].discount;
      billDetails += "</td>";
	  billDetails += "<td>";
      billDetails += "" + ordersDetails[i].transport;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + ordersDetails[i].amount;
      billDetails += "</td>";
      billDetails += "</tr>";

      totalamt += parseInt(ordersDetails[i].amount);
    }

    billDetails += "<tr>";
    billDetails +=
      "<td colspan='6' style='text-align:right;font-weight:bold;background:green;color:white'>";
    billDetails += "Total : " + totalamt;
    billDetails += "<td>";
    billDetails += "</tr>";
    billDetails += "</table>";
    billDetails += "</div>";

    var mywindow = window.open(
      "",
      "Bill Print",
      "height=650&width=900&top=100&left=100"
    );

    mywindow.document.write(billDetails);
    mywindow.print();
  }

  AddOrdersDetails = () => {
    // this.state.currentSrno = this.state.currentSrno + 1;
    // var srno = this.state.currentSrno;
    this.state.ordersDetails.push({
      order_no: "",
      kgs: "",
      price: "",
      packaging: "",
      discount: "",
      transport: "",
      amount: "",
    });
    this.setState({});
  }; 

  RemoveOrdersDetails = () => {
    this.state.currentSrno = this.state.currentSrno - 1;
    if (this.state.ordersDetails.length > 1) {
      this.state.ordersDetails.pop();
    }
    this.setState({});
  };

  showDataInInputs = (index, item) => {
    console.log(index);
    console.log(item);
    this.state.ordersDetails[index].id = item.id;
    this.state.ordersDetails[index].id = item.id;
    this.state.ordersDetails[index].kgs = item.kgs;
    this.state.ordersDetails[index].price = item.price;
    this.state.ordersDetails[index].packaging = item.packaging;
    this.state.ordersDetails[index].discount = item.discount;
    this.state.ordersDetails[index].transport = item.transport;
    this.state.ordersDetails[index].phone = item.phone;
    this.state.ordersDetails[index].town = item.town;
    this.state.ordersDetails[index].region = item.region;
    this.state.ordersDetails[index].amount =
      parseInt(item.packaging) + parseInt(item.transport) + (parseInt(item.kgs) * parseInt(item.price)) - parseInt(item.discount);
    this.setState({});
  };

  qtyChangeUpdate = (event) => {
    var value = event.target.value;
    var index = event.target.dataset.index;

    this.state.ordersDetails[index].amount =
      (parseInt(this.state.ordersDetails[index].unit_price) +
        parseInt(this.state.ordersDetails[index].c_gst) +
        parseInt(this.state.ordersDetails[index].s_gst)) *
      value;
    this.state.ordersDetails[index].qty = value;
    this.setState({});
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Generate Bill</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Generate Bill for Customers</h2>
                </div>
                <div className="body">
                  
                  <form onSubmit={this.formSubmit}>
                  
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Customer Name :</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="customer_name"
                              name="customer_name"
                              className="form-control"
                              placeholder="Enter Customer Name "
                              
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="email_address">Phone :</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="form-control"
                              placeholder="Enter Customer Phone "
                              
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  

                    <br />
                    <h4>Order Details</h4>

                    <br />
                    {this.state.ordersDetails.map((item, index) => (
                      <div className="row" key={index}>

                        <div className="col-lg-2">
                          <label htmlFor="email_address">
                            Order No :{" "}
                          </label>
                          <div className="form-group">
                            <div className="form-line">
                              <AutoCompleteOrder
                                itemPostion={index}
                                showDataInInputs={this.showDataInInputs}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="email_address">Kgs : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="kgs"
                                name="kgs"
                                className="form-control"
                                placeholder="Enter Quantity."
                                defaultValue={item.kgs}
                                data-index={index}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="email_address">Price per Kgs : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="price"
                                name="price"
                                className="form-control"
                                placeholder="Enter Unit Price."
                                defaultValue={item.price}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="email_address">Packaging : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="packaging"
                                name="packaging"
                                className="form-control"
                                placeholder="Enter Packaging."
                                defaultValue={item.packaging}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="email_address">Discount : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="discount"
                                name="discount"
                                className="form-control"
                                placeholder="Enter Discount."
                                defaultValue={item.discount}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="email_address">Transport : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="transport"
                                name="transport"
                                className="form-control"
                                placeholder="Enter Transport."
                                defaultValue={item.transport}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="email_address">Amount : </label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="amount"
                                name="amount"
                                className="form-control"
                                placeholder="Enter Amount"
                                defaultValue={item.amount}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col-lg-6">
                        <button
                          onClick={this.AddOrdersDetails}
                          className="btn btn-block btn-success"
                          type="button"
                        >
                          ADD ORDER DETAILS
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          onClick={this.RemoveOrdersDetails}
                          className="btn btn-block btn-warning"
                          type="button"
                        >
                          REMOVE ORDER DETAILS
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage === 0 ? false : true}
                    >
                      {this.state.btnMessage === 0
                        ? "Generate Bill"
                        : "Generating Bill Please Wait.."}
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

export default CustomerBillComponent;
