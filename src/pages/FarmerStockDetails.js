import React from "react";
import APIHandler from "../utils/APIHandler";
import swal from 'sweetalert2';
import Select from 'react-select';

class FarmerStockdetails extends React.Component {

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
        farmerlist: [],
        selectedFarmer: null,
        rice_type: "",
        in_stock: "",
        farmer_id: "",
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
          var response = await apiHandler.editStockData(
            event.target.farmer_id.value,
            event.target.rice_type.value,
            event.target.in_stock.value,
            this.props.match.params.id 
          );
          console.log(response);
          this.setState({ erroRes: response.data.error });
          this.setState({ errorMessage: response.data.message });
          window.location.replace("/stock");
        } else if (willEdit.isDenied) {
          swal.fire('Changes are not saved', '', 'info');
        }
      
        this.setState({ btnMessage: 0 });
        this.setState({ sendData: true });
    }

    //This Method Work When Our Page is Ready
      
    componentDidMount() {
        this.LoadFarmer();
        this.fetchStockData();
    }

    async fetchStockData() {
        var apihandler = new APIHandler();
        var stockdata = await apihandler.fetchStockDetails(this.props.match.params.id)
        console.log(stockdata);
        this.setState({ farmer_id: stockdata.data.data.farmer_id });
        this.setState({ rice_type: stockdata.data.data.rice_type });
        this.setState({ in_stock: stockdata.data.data.in_stock });
        this.setState({ dataLoaded: true });
    }

    async LoadFarmer() {
        var apihandler = new APIHandler();
        var farmerdata = await apihandler.fetchFarmerOnly();
        this.setState({ farmerlist: farmerdata.data });
    }

    handleChange = (event) => {
        this.setState({
            rice_type: event.target.value
        })
    }

    handleFarmerSelect = (selectedoption) => {
        this.setState({
            selectedFarmer: selectedoption
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
                            <h3 className="page-title"> ADD STOCK</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">Add Stock</h4>
                                        <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                            <p className="card-description">  </p>
                                            
                                            <div className="row">
                                            <div className="col-md-6">
                                                    <div className="form-group bmd-form-group">
                                                    <label>Farmer Name:</label>
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
                                                        onChange={selectedOption => this.setState({ customer_id: selectedOption.value })}
                                                        placeholder="--- Search customer ---"
                                                        isClearable
                                                    />
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                        <label >Rice Type</label>
                                                        <select id="rice_type" name="rice_type" className="form-control show-tick" value={this.state.rice_type} onChange={this.handleChange}>
                                                            <option value="">--- Please select an option ---</option>
                                                            <option value="1">Pishori</option>
                                                            <option value="2">Komboka</option>
                                                        </select>
                                                    </div>
                                                </div> 

                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Quantity:</label>
                                                        <input
                                                        type="text"
                                                        id="in_stock"
                                                        name="in_stock"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.in_stock}
                                                        />
                                                    </div>
                                                </div> 

                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                {this.state.btnMessage === 0 ? "Edit Stock" : "Editing Stock Please Wait.."}<div className="ripple-container"></div>
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

export default FarmerStockdetails;