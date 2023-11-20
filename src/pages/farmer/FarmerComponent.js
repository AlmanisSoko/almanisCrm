import React from "react";
import APIHandler from "../../utils/APIHandler";
import AuthHandler from "../../utils/AuthHandler";
import { Link } from "react-router-dom";

class FarmerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0, 
        sendData: false,
        FarmerDataList: [],
        filteredData: [],
        searchTerm: "",
        dataLoaded: false,
        currentPage: 1,
        farmersPerPage: 34,
    };

    componentDidMount() {
        this.fetchFarmerData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.FarmerDataList !== this.state.FarmerDataList) {
            this.searchData();
        }
        
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.searchData();
        }
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    searchData = () => {
        const { FarmerDataList, searchTerm } = this.state;
        const filteredData = FarmerDataList.filter(farmer => {
            return farmer.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
        this.setState({ filteredData });
    }  

    async fetchFarmerData() {
        var apihandler = new APIHandler();
        var farmerdata = await apihandler.fetchAllFarmer();
        console.log(farmerdata);
        this.setState({ FarmerDataList: farmerdata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewFarmerDetails = (farmer_id) => {
        console.log(farmer_id);
        console.log(this.props);
        this.props.history.push("/farmerdetails/" + farmer_id);
    }

    viewFarmerStatement = (farmer_id) => {
        console.log(farmer_id);
        console.log(this.props);
        this.props.history.push("/farmerstatement/" + farmer_id);
    }
    
    deleteFarmer(farmer_id) {
        if(window.confirm('are you sure you want to delete farmer?')) {
          fetch('http://test.tarase.com/api/farmer/' + farmer_id + "/", {
            method: 'DELETE',
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
          });
  
          this.fetchFarmerData();
        }
  
        this.fetchFarmerData();
    }; 

    render() {
        // get farmers per page
        const { filteredData } = this.state;

        return (
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
                            <h3 className="page-title"> ALL FARMERS</h3>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Manage Farmers</h4>
                                        <p className="card-description">
                                            
                                        </p>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <div id="order-listing_filter" className="dataTables_filter">
                                                    <Link to={"/addfarmer"}>
                                                        <button type="button" className="btn btn-info btn-rounded btn-fw">
                                                            Add farmer<div className="ripple-container"></div>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div id="order-listing_filter" className="dataTables_filter">
                                                    <label>
                                                        <input
                                                            type="text"
                                                            onClick={this.onSearchClick}
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            placeholder="Search Farmer"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        {this.state.dataLoaded === false ? (
                                            <div className="dot-opacity-loader">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        ) : ""}

                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>NAME</th>
                                                        <th>CONTACT</th>
                                                        <th>ADDED ON</th>
                                                        <th>ACTION</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.map((farmer) => (
                                                        <tr key={farmer.id}>
                                                        <td>{farmer.id}</td>
                                                        <td>{farmer.name}</td>
                                                        <td>
                                                            {
                                                                farmer.phone.substring(0, 5)
                                                            }
                                                        </td>
                                                        <td>{new Date(farmer.added_on).toLocaleString()}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-block btn-success"
                                                                onClick={() =>
                                                                    this.viewFarmerDetails(farmer.id)
                                                                }
                                                            >
                                                                <i className="mdi mdi-border-color"></i>
                                                            </button>
                                                        </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <br/>
                                        </div>
                                        <br/>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        );
    }
}

export default FarmerComponent;