import React from "react";
import APIHandler from "../utils/APIHandler";
import AuthHandler from "../utils/AuthHandler";
import { Link } from "react-router-dom";

class FarmerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        FarmerDataList: [],
        dataLoaded: false,
    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveFarmerData(
            event.target.name.value,
            event.target.phone.value
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
        var apihanler = new APIHandler();
        var farmerdata = await apihanler.fetchAllFarmer();
        console.log(farmerdata);
        this.setState({ FarmerDataList: farmerdata.data.data });
        this.setState({ dataLoaded: true });
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
                                        ALL FARMERS
                                    </h2>

                                    <ul className="header-dropdown m-r--5">
                                        <Link to="/addfarmer" className="toggled waves-effect waves-block">   
                                            <button className="btn btn-primary m-r-15 waves-effect">
                                                Add Farmer
                                            </button>
                                        </Link>
                                    </ul>

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
                                <div className="body table-responsive">
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
                                           {this.state.FarmerDataList.map((farmer) => (
                                               <tr key={farmer.id}>
                                                   <td>{farmer.id}</td>
                                                   <td>{farmer.name}</td>
                                                   <td>{farmer.phone}</td>
                                                   <td>{new Date(farmer.added_on).toLocaleString()}</td>
                                                   <td>
                                                   <button
                                                    className="btn btn-block btn-warning"
                                                    onClick={() =>
                                                        this.viewFarmerDetails(farmer.id)
                                                    }
                                                    >
                                                      View
                                                    </button>
                                                   </td>
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

export default FarmerComponent;
