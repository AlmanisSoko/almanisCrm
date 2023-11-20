import React from "react";
import APIHandler from "../../utils/APIHandler";
import swal from 'sweetalert2';

class RegionComponent extends React.Component {

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
        regionList: [],
        dataLoaded: false,
    };    

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveRegionData(
            event.target.region.value
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
        if (this.state.errorRes === false &&
            this.state.sendData === true) {
                swal.fire({
                    title: "Good Job!",
                    text: "Farmer Created successfuly!",
                    icon: "success",
                    button: "Ok!",
                  })
          }
        if (this.state.errorRes === true &&
            this.state.sendData === true) {
                swal.fire({
                    title: "Oops!",
                    text: "Something Went Wrong!",
                    icon: "error",
                    button: "Ooh No",
                  })
        }
        this.formRef.current.reset();
    }

    componentDidMount() {
        this.fetchRegionData()
    }

    async fetchRegionData() {
        var apihandler = new APIHandler();
        var regiondata = await apihandler.fetchAllRegion();
        console.log(regiondata);
        this.setState({ regionList: regiondata.data.data });
        this.setState({ dataLoaded: true });
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
                            <h3 className="page-title"> ADD REGION</h3>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">Add Region</h4>
                                        <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                            <p className="card-description">  </p>
                                            
                                            <div className="row">
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Name</label>
                                                        <input
                                                        type="text"
                                                        id="region"
                                                        name="region"
                                                        className="form-control"
                                                        placeholder=""
                                                        required
                                                        />
                                                    </div>
                                                </div> 
                                                
                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                {this.state.btnMessage === 0 ? "Add Region" : "Region Farmer Please Wait.."}<div className="ripple-container"></div>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card mdc-card" id="pills-payment">
                                    <div className="card-body">
                                        
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#SRNO</th>
                                                        <th>REGION</th>
                                                        <th>ADDED ON</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.regionList.map((region) => (
                                                    <tr key={region.id}>
                                                        <td>{region.id}</td>
                                                        <td>{region.region}</td> 
                                                        <td>{new Date(region.added_on).toLocaleString()}</td>
                                                    </tr>  
                                                    ))}
                                                </tbody>
                                            </table>
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

export default RegionComponent;