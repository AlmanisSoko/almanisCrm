import React from "react";
import APIHandler from "../../utils/APIHandler";
import swal from 'sweetalert2';
import Select from 'react-select';

class AddStockComponent extends React.Component {

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
        farmerlist: [],
        dataLoaded: false,
    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveStockData(
            event.target.farmer_id.value,
            event.target.rice_type.value,
            event.target.in_stock.value,
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });

        if (this.state.errorRes === false &&
            this.state.sendData === true) {
                swal.fire('Stock Added Successfuly!', '', 'success');
        }

        if (this.state.errorRes === true &&
            this.state.sendData === true) {
                swal.fire('Something Went Wrong!', '', 'error');
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
                                                    <label >Quantity:</label>
                                                        <input
                                                        type="text"
                                                        id="in_stock"
                                                        name="in_stock"
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                        />
                                                    </div>
                                                </div> 

                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                {this.state.btnMessage === 0 ? "Add Stock" : "Adding Stock Please Wait.."}<div className="ripple-container"></div>
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

export default AddStockComponent;