import React from "react";
import AutoCompleteOrder from "../../components/AutoCompleteOrder";
import AutoFillBill from "../../components/AutoFillBill";

class DeliveryNoteComponent extends React.Component {
    constructor(props) {
        super(props);
      }
    
      state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        invDate: new Date(),
        ordersDetails: [
          {
            id: 0,
            kgs: "",
            price: "",
            packaging: "",
            discount: "",
            transport: "",
            amount: "",
            town: "",
            comment: ""
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
    
      showDataInInputs = (index, item) => {
        console.log(index);
        console.log(item);
        this.state.ordersDetails[index].id = item.id;
        this.state.ordersDetails[index].comment = item.comment;
        this.state.ordersDetails[index].kgs = item.kgs;
        this.state.ordersDetails[index].price = item.price;
        this.state.ordersDetails[index].packaging = item.packaging;
        this.state.ordersDetails[index].transport = item.transport;
        this.state.ordersDetails[index].discount = item.discount;
        this.state.ordersDetails[index].amount =
          parseInt(item.packaging) + parseInt(item.transport) + (parseInt(item.kgs) * parseInt(item.price)) - parseInt(item.discount);
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
    
      AddOrdersDetails = () => {
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
    
      billTotal = () => {
        var total = 0;
        for (var i = 0; i < this.state.ordersDetails.length; i++) {
          total += parseInt(this.state.ordersDetails[i].amount);
        }
        total = this.setState({total: total})
        console.log(total)
      }
    
      Print = () => {   
        let printContents = document.getElementById('delivery').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents; 
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
                      <h3 className="page-title">DELIVERY NOTE</h3>
                  </div>
    
                  <div id="delivery" className="row" >
                    <div className="col-lg-12">
                      <div className="card px-2">
                        <div className="card-body">
                          <div className="container-fluid">
                            <h3 className="text-right my-5" >Delivary Note</h3>
                            <hr/>
                          </div>
                          {this.state.customersDetails.map((item, index) => (
                          <div className="container-fluid d-flex justify-content-between" key={index}>
                            <div className="col-lg-3 pl-0">
                              <p className="mt-5 mb-2"><b>Almanis Enterprise</b></p>
                              <img className="text-left" src="../../assets/images/logo192.png" alt="logo"/>
                              <p>P.O BOX 217,<br/>Wang'uru,<br/>Mwea, Kirinyaga.</p>
                              <p>0711461666</p>
                            </div>
                            <div className="col-lg-3 pr-0">
                              <p className="mt-5 mb-2 text-right"><b>Dispatch to</b></p>
                              <p className="text-right">{item.name},<br/> {item.phone},<br/> {item.town}.</p>
                            </div>
                          </div>
                          ))}
                          <div className="container-fluid d-flex justify-content-between">
                            <div className="col-lg-3 pl-0">
                              <p className="mb-0 mt-5">Dispatch Date : {this.state.invDate.toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="container-fluid mt-5 d-flex justify-content-center w-100">
                            <div className="table-responsive w-100">
                              <table className="table">
                                <thead>
                                  <tr className="bg-dark text-dark">
                                    <th>#ORDNO</th>
                                    <th>DESCRIPTION</th>
                                    <th className="text-right">KILOS</th>
                                  </tr>
                                </thead>
                                {this.state.ordersDetails.map((item, index) => (
                                <tbody data-index={index}>
                                  <tr className="text-right">
                                    <td className="text-left">{item.id}</td>
                                    <td className="text-left">{item.comment}</td>
                                    <td>{item.kgs.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} Kgs</td>
                                  </tr>
                                </tbody>
                                ))}
                              </table>
                            </div>
                          </div>
                          <div className="row" >
                            <div className="col-lg-6">
                              <div className="container-fluid mt-5 w-100" >
                                <p className="text-left mb-2">Delivered By:</p>
                                <p className="text-left mb-5">Signature: ...................................................</p>
                                <h4 className="text-left mb-5">Almanis Enterprise</h4>
                                <hr/>
                              </div>
                            </div>
                            <div className="col-lg-6">
                            {this.state.customersDetails.map((item, index) => (
                              <div className="container-fluid mt-5 w-100" key={index} >
                                <p className="text-right mb-2">Recived By:</p>
                                <p className="text-right mb-5">......................................................:Signature</p>
                                
                                <h4 className="text-right mb-5" > {item.name}</h4>
                                
                                <hr/>
                              </div>
                            ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div className="page-header">
                    
                  </div>
    
                  <div className="row">
                    <div className="col-12 grid-margin">
                      <div className="card">
                        <div className="card-body">
                        {this.state.customersDetails.map((item, index) => (
                          <div className="row" key={index}>
    
                            <div className="col-lg-6">
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
    
                            <div className="col-lg-6">
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
                          </div>
                        ))}
                        {this.state.ordersDetails.map((item, index) => (
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
                            <div className="col-lg-6">
                              <button
                                className="btn btn-block btn-success"
                                type="button"
                                onClick={this.AddOrdersDetails}
                              >
                                ADD ORDER
                              </button>
                            </div>
                            <div className="col-lg-6">
                              <button
                                className="btn btn-block btn-danger"
                                type="button"
                                onClick={this.RemoveOrdersDetails}
                              >
                                REMOVE ORDER
                              </button>
                            </div>
                            <div className="col-sm-12">
                              <button
                                onClick={this.Print}
                                className="btn btn-block btn-primary"
                                type="button"
                              >
                                GENERATE NOTE
                              </button>
                            </div>
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

export default DeliveryNoteComponent;