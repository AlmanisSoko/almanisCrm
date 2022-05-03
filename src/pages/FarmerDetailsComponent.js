import React from "react";
import APIHandler from "../utils/APIHandler";
import AuthHandler from "../utils/AuthHandler";

class FarmerDetailsComponent extends React.Component {

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
        orders: [],
        name: "",
        phone: "",
        dataLoaded: false,
    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.editFarmerData(
            event.target.name.value,
            event.target.phone.value,
            this.props.match.params.id
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
    }

    componentDidMount() {
        this.fetchFarmerData();
    }

    async fetchFarmerData() {
        var apihandler = new APIHandler();
        var farmerdata = await apihandler.fetchFarmerDetails(this.props.match.params.id);
        console.log(farmerdata);
        this.setState({ orders: farmerdata.data.data.orders });
        this.setState({ name: farmerdata.data.data.name });
        this.setState({ phone: farmerdata.data.data.phone });
        this.setState({ dataLoaded: true });
       // this.setState({ farmerdata:data.data });
    }

    viewFarmerDetails = (farmer_id) => {
        console.log(farmer_id);
        console.log(this.props);
        this.props.history.push("/farmerdetails/" + farmer_id);
    }

    render() {
        return (
            <section className="content">
                <div className="container-fluid">

                    <div className="block-header">
                        <h2>MANAGE FARMERS</h2>
                    </div>
                                
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="card">
                                <div className="header">
                                    <h2>
                                        EDIT FARMER
                                    </h2>

                                    {this.state.dataLoaded === false ? (
                                    <div className="text-center">
                                        <div className="preloader pl-size-xl">
                                            <div className="spinner-layer">
                                                <div className="circle-clipper left">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="circle-clipper right">
                                                    <div className="circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ) : ""}
                                    
                                </div>
                                <div className="body">
                                    <form onSubmit={this.formSubmit}>

                                        <label htmlFor="email_address">Name</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="name" name="name" className="form-control" placeholder="Enter Farmer Name" defaultValue={this.state.name} />
                                            </div>
                                        </div>

                                        <label htmlFor="email_address">Phone</label>
                                        <div className="form-group">
                                            <div className="form-line">
                                                <input type="text" id="phone" name="phone" className="form-control" placeholder="Enter Farmer Phone" defaultValue={this.state.phone} />
                                            </div>
                                        </div>

                                        <br/>
                                        <button
                                            type="submit"
                                            className="btn btn-primary m-t-15 waves-effect"
                                            disabled={this.state.btnMessage === 0 ? false : true}
                                            >
                                            {this.state.btnMessage === 0
                                                ? "Edit Farmer"
                                                : "Editing Farmer Please Wait.."}
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

                    <div className="row clearfix">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                          <div className="header">
                            
                            <h2>
                             
                            </h2>

                          </div>
                          {this.state.dataLoaded === false ? (
                                        <div className="text-center">
                                            <div className="preloader pl-size-xl">
                                                <div className="spinner-layer">
                                                    <div className="circle-clipper left">
                                                        <div className="circle"></div>
                                                    </div>
                                                    <div className="circle-clipper right">
                                                        <div className="circle"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ""}
                                    
                          <div className="body table-responsive">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>#ORDER NO</th>
                                  <th>KILOS</th>
                                  <th>CUSTOMER</th>
                                  <th>PRICE PER KG</th>
                                  <th>TOTAL</th>
                                  <th>ORDERED ON</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.orders.map((farmer) => (
                                    <tr key={farmer.id}>
                                        <td>{farmer.id}</td>
                                        <td>{farmer.kgs}</td>
                                        <td>{farmer.customer.name}</td>
                                        <td>{farmer.price}</td>
                                        <td>{farmer.amount}</td>
                                        <td>{new Date(farmer.added_on).toLocaleString()}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                            </table>  
                              </div>
                        </div>
                      </div>
                    </div>
                    

                </div>
            </section>
        );
    }

}

export default FarmerDetailsComponent;
