import React from "react";
import APIHandler from "../utils/APIHandler";

class InvoiceDetailsComponent extends React.Component {
  
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    invDate: new Date(),
    id: 0,
    name: "",
    phone: "",
    town: "",
    total: "",
    invoice_details: [],
  };

  componentDidMount() {
    this.fetchInvoiceData();
  }

  async fetchInvoiceData() {
    var apihandler = new APIHandler();
    var invoicedata = await apihandler.fetchInvoiceDetails(this.props.match.params.id);
    console.log(invoicedata);
    this.setState({ id: invoicedata.data.data.id })
    this.setState({ name: invoicedata.data.data.name });
    this.setState({ phone: invoicedata.data.data.phone });
    this.setState({ town: invoicedata.data.data.town });
    this.setState({ total: invoicedata.data.data.total });
    this.setState({ invoice_details: invoicedata.data.data.invoice_details })
  }

  Print = () => {   
    let printContents = document.getElementById('bill').innerHTML;
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
                  <h3 className="page-title">CUSTOMER INVOICE</h3>
              </div>
              
              <div id="bill" className="row" >
                <div className="col-lg-12 " >
                  <div className="card px-2">
                    <div className="card-body">
                      <div className="container-fluid">
                        
                        <h3 className="text-right my-5" >Invoice&nbsp;&nbsp;#INV-{this.state.id}</h3>
                        <hr/>
                      </div>
                      
                      <div className="container-fluid d-flex justify-content-between">
                        <div className="col-lg-3 pl-0">
                          <p className="mt-5 mb-2"><b>Almanis Enterprise</b></p>
                          <img className="text-left" src="../../assets/images/logo192.png" alt="logo"/>
                          <p>P.O BOX 217,<br/>Wang'uru,<br/>Mwea, Kirinyaga.</p>
                          <p>0711461666</p>
                        </div>
                        <div className="col-lg-3 pr-0">
                          <p className="mt-5 mb-2 text-right"><b>Invoice to</b></p>
                          <p className="text-right">{this.state.name},<br/> {this.state.phone},<br/> {this.state.town}.</p>
                        </div>
                      </div>
                      
                      <div className="container-fluid d-flex justify-content-between">
                        <div className="col-lg-3 pl-0">
                          <p className="mb-0 mt-5">Invoice Date : {this.state.invDate.toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="container-fluid mt-5 d-flex justify-content-center w-100">
                        <div className="table-responsive w-100">
                          <table className="table">
                            <thead>
                              <tr className="">
                                <th>#ORDNO</th>
                                <th>DESCRIPTION</th>
                                <th className="text-right">KILOS</th>
                              </tr>
                            </thead>
                            {this.state.invoice_details.map((item, index) => (
                            <tbody data-index={index}>
                              <tr className="text-right">
                                <td className="text-left">{item.orders_id}</td>
                                <td className="text-left">{item.comment}</td>
                                <td>{Number(item.kgs).toLocaleString()} Kgs</td>
                              </tr>
                            </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                      <div className="container-fluid mt-5 w-100" >
                        <p className="text-right mb-2">Sub-Total amount :  {Number(this.state.total).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-right">VAT(0%) : Ksh 0.00</p>
                        <h4 className="text-right mb-5">Total : {Number(this.state.total).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                        <hr/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="page-header">
                
              </div>

              <div className="d-sm-flex justify-content-center justify-content-sm-between">
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"></span>
                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                  <button type="button" onClick={this.Print} className="btn btn-outline-primary btn-icon-text">
                      <i className="mdi mdi-download btn-icon-prepend"></i> Download 
                  </button>
                </span>
              </div>
              
            </div>
        </div>
    )
  }
}

export default InvoiceDetailsComponent;