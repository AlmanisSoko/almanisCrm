import React from "react";
import AutoCompleteOrder from "../../components/AutoCompleteOrder";
import AutoFillBill from "../../components/AutoFillBill";
import APIHandler from "../../utils/APIHandler";
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert2';

class CustomerBillComponent extends React.Component {

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
    invNumber: 0,
    total: 0,
    invoice_details: [
      {
        orders_id: "",
        kgs: "",
        price: "",
        packaging: "",
        comment: "",
        discount: "",
        transport: "",
        vat: "",
        amount: ""
      },
    ],
    customersDetails: [
      {
        id: 0,
        phone: "",
        name: "",
        town: ""
      },
    ],
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.saveInvoiceData(
      event.target.name.value,
      event.target.phone.value,
      event.target.town.value,
      event.target.total.value,
      this.state.invoice_details
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    if (this.state.errorRes === false &&
      this.state.sendData === true) {
        swal.fire('Saved!', '', 'success');
       //window.location.reload();
    }
      
    if (this.state.errorRes === true &&
      this.state.sendData === true) {
        swal.fire('Oops!! Something went wrong', '', 'error')
    }
    this.formRef.current.reset();
  }

  showDataInInputs = (index, item) => {
    console.log(index);
    console.log(item);
    this.state.invoice_details[index].orders_id = item.id;
    this.state.invoice_details[index].kgs = item.kgs;
    this.state.invoice_details[index].price = item.price;
    this.state.invoice_details[index].packaging = item.packaging;
    this.state.invoice_details[index].transport = item.transport;
    this.state.invoice_details[index].rider = item.rider;
    this.state.invoice_details[index].discount = item.discount;
    this.state.invoice_details[index].comment = item.comment;
    this.state.invoice_details[index].vat = item.vat;
    this.state.invoice_details[index].amount =
      parseInt(item.packaging) + parseInt(item.transport) + parseInt(item.rider) + (parseInt(item.kgs) * parseInt(item.price)) - parseInt(item.discount);
    this.setState({});
  };

  showDataInputs = (index, item) => {
    console.log(index);
    console.log(item);
    this.state.customersDetails[index].id = item.id;
    this.state.customersDetails[index].name = item.name;
    this.state.customersDetails[index].phone = item.phone;
    this.state.customersDetails[index].town = item.town;
  }

  AddInvoiceDetails = () => {
    this.state.invoice_details.push({
      orders_id: "",
      kgs: "",
      price: "",
      packaging: "",
      discount: "",
      transport: "",
      comment: "",
      vat: "",
      amount: "",
    });
    this.setState({});
  }; 

  RemoveInvoiceDetails = () => {
    this.state.currentSrno = this.state.currentSrno - 1;
    if (this.state.invoice_details.length > 1) {
      this.state.invoice_details.pop();
    }
    this.setState({});
  };

  billTotal = () => {
    var total = 0;
    for (var i = 0; i < this.state.invoice_details.length; i++) {
      total += parseInt(this.state.invoice_details[i].amount);
    }
    total = this.setState({total: total})
    console.log(total)
  }

  generateInvoiceNumber = () => {
    const uniqueId = uuidv4();
    const invoiceNumber = uniqueId.substr(uniqueId.length - 6); // generates a random 6 digit number
    this.setState({ invNumber: invoiceNumber });
  };

  handleClick = () => {
    this.billTotal();
    this.generateInvoiceNumber();
  }

  render() {
    return (
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
                  <h3 className="page-title">CUSTOMER INVOICE</h3>
              </div>

              <div className="row">
                <div className="col-12 grid-margin">
                  <div className="card">
                    <div className="card-body">
                    <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                      {this.state.customersDetails.map((item, index) => (
                        <div className="row" key={index}>

                          <div className="col-lg-4">
                            <div className="form-group bmd-form-group">
                            <label >
                              Customer Name :{" "}
                            </label>
                                <AutoFillBill
                                  itemPostion={index}
                                  showDataInputs={this.showDataInputs}
                                />
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="form-group bmd-form-group">
                            <label >Phone : </label>
                                <input
                                  type="text"
                                  id="phone"
                                  name="phone"
                                  className="form-control"
                                  placeholder=""
                                  value={item.phone}
                                  data-index={index}
                                />
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="form-group bmd-form-group">
                            <label >Town : </label>
                                <input
                                  type="text"
                                  id="town"
                                  name="town"
                                  className="form-control"
                                  placeholder=""
                                  value={item.town}
                                  data-index={index}
                                />
                            </div>
                          </div>
                        </div>
                      ))}
                      {this.state.invoice_details.map((item, index) => (
                        <div className="row" key={index}>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >
                              Order No :{" "}
                            </label>
                                <AutoCompleteOrder
                                  itemPostion={index}
                                  showDataInInputs={this.showDataInInputs}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Kgs : </label>
                                <input
                                  type="text"
                                  id="kgs"
                                  name="kgs"
                                  className="form-control"
                                  placeholder=""
                                  value={item.kgs}
                                  data-index={index}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Price per Kgs : </label>
                                <input
                                  type="text"
                                  id="price"
                                  name="price"
                                  className="form-control"
                                  placeholder=""
                                  value={item.price}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Packaging : </label>
                                <input
                                  type="text"
                                  id="packaging"
                                  name="packaging"
                                  className="form-control"
                                  placeholder=""
                                  value={item.packaging}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Discount : </label>
                                <input
                                  type="text"
                                  id="discount"
                                  name="discount"
                                  className="form-control"
                                  placeholder=""
                                  value={item.discount}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Transport : </label>
                                <input
                                  type="text"
                                  id="transport"
                                  name="transport"
                                  className="form-control"
                                  placeholder=""
                                  value={item.transport}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Rider : </label>
                                <input
                                  type="text"
                                  id="rider"
                                  name="rider"
                                  className="form-control"
                                  placeholder=""
                                  value={item.rider}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Comment : </label>
                                <input
                                  type="text"
                                  id="comment"
                                  name="comment"
                                  className="form-control"
                                  placeholder=""
                                  value={item.comment}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >V.A.T : </label>
                                <input
                                  type="text"
                                  id="vat"
                                  name="vat"
                                  className="form-control"
                                  placeholder=""
                                  value={item.vat}
                                />
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group bmd-form-group">
                            <label >Amount : </label>
                                <input
                                  type="text"
                                  id="amount"
                                  name="amount"
                                  className="form-control"
                                  placeholder=""
                                  value={item.amount}
                                />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group bmd-form-group">
                              <label >Total Bill : </label>
                                <input
                                  type="text"
                                  id="total"
                                  name="total"
                                  className="form-control"
                                  placeholder=""
                                  value={this.state.total}
                                />
                            </div>
                          </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <button
                            className="btn btn-block btn-success"
                            type="button"
                            onClick={this.AddInvoiceDetails}
                          >
                            ADD ORDER
                          </button>
                        </div>
                        <div className="col-lg-6">
                          <button
                            className="btn btn-block btn-danger"
                            type="button"
                            onClick={this.RemoveInvoiceDetails}
                          >
                            REMOVE ORDER
                          </button>
                        </div>
                        <div className="col-sm-12">
                          <button
                            onClick={this.handleClick}
                            className="btn btn-block btn-warning"
                            type="button"
                          >
                            GENERATE BILL
                          </button>
                        </div>
                        <div className="col-lg-12">
                          <button
                            className="btn btn-block btn-primary"
                            type="submit"
                          >
                            {this.state.btnMessage === 0 ? "save bill" : "saving bill Please Wait.."}
                          </button>
                        </div>
                      </div>
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

export default CustomerBillComponent;