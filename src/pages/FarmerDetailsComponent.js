import React from "react";
import APIHandler from "../utils/APIHandler";
import swal from 'sweetalert2';

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
        FarmerDataList: [],
        orders_count: 0,
        kgs: 0,
        stock: 0,
        name: "",
        phone: "",
        dataLoaded: false,
        currentPage: 1,
        ordersPerPage: 18,
    };  

    componentDidMount() {
        this.fetchFarmerData();
    }

    async fetchFarmerData() {
        var apihandler = new APIHandler();
        var farmerdata = await apihandler.fetchFarmerDetails(this.props.match.params.id); 
        console.log(farmerdata);
        this.setState({ orders: farmerdata.data.data.orders });
        this.setState({ orders_count: farmerdata.data.orders_count });
        this.setState({ kgs: farmerdata.data.kgs })
        this.setState({ stock: farmerdata.data.stock })
        this.setState({ name: farmerdata.data.data.name });
        this.setState({ phone: farmerdata.data.data.phone });
        this.setState({ dataLoaded: true });
       // this.setState({ farmerdata:data.data });
    }

    async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        swal.fire({
            title: "Do you want to save changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          })
          .then((willEdit) => {
            if (willEdit.isConfirmed) {
              swal.fire('Saved!', '', 'success');
                var apiHandler = new APIHandler();
                var response = apiHandler.editFarmerData(
                    event.target.name.value,
                    event.target.phone.value,
                    this.props.match.params.id
                );
                console.log(response);
                this.setState({ erroRes: response.data.error });
                this.setState({ errorMessage: response.data.message });
            } else if (willEdit.isDenied){
                swal.fire('Changes are not saved', '', 'info')
            }
        });
        this.setState({ btnMessage: 0 });
        this.setState({ sendData: true });
    }

    viewFarmerProfile = (farmer_id) => {
        console.log(farmer_id);
        console.log(this.props);
        this.props.history.push("/farmerprofile/" + farmer_id);
    }

    render() {
        // Get current Orders

        const indexOfLastOrder = this.state.currentPage * this.state.ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - this.state.ordersPerPage;
        const currentOrders = this.state.orders.slice(indexOfFirstOrder, indexOfLastOrder);

        // Implement page number

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.state.orders.length / this.state.ordersPerPage); i++) {
            pageNumbers.push(i);
            
        }

        // Set current page

        const setPage = (pageNum) => {
            this.setState({
                currentPage: pageNum
            });
        }

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
                            <h3 className="page-title"> FARMER PROFILE</h3>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                    <div className="col-lg-4">
                                        <div className="border-bottom text-center pb-4">
                                            <img src="../../assets/images/faces-clipart/undraw_female_avatar_efig.svg" alt="profile" className="img-lg rounded-circle mb-3"/>
                                            
                                            <p><h3>{this.state.name}</h3></p>
                                            <div className="d-flex mb-3">
                                            </div>
                                        </div>
                                        <div className="border-bottom py-4">
                                            <p>Processed Kilos</p>
                                            <div>
                                                <label>{this.state.kgs.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} Kgs</label>
                                            </div>
                                        </div>
                                        <div className="border-bottom py-4">
                                            <p>Stocked Kilos</p>
                                            <div>
                                                <label>{this.state.stock.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} Kgs</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-8">
                                        <div className="d-flex justify-content-between">
                                        <div>
                                            {/*  */}
                                        </div>
                                        
                                        </div>
                                        <div className="mt-4 py-2 border-top border-bottom">
                                        <ul className="nav profile-navbar">
                                            <li className="nav-item">
                                            <a className="nav-link active" href="#">
                                                <i className="mdi mdi-account-outline"></i> Info </a>
                                            </li>
                                        </ul>
                                        </div>
                                        <div className="profile-feed">
                                        <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
                                            <p className="card-description">  </p>
                                            
                                            <div className="row">
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Name</label>
                                                        <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.name}
                                                        required
                                                        />
                                                    </div>
                                                </div> 
                                                
                                                <div className="col-md-6"> 
                                                    <div className="form-group bmd-form-group">
                                                    <label >Phone: </label>
                                                        <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        className="form-control"
                                                        placeholder=""
                                                        defaultValue={this.state.phone}
                                                        required
                                                        />
                                                    </div>
                                                </div>

                                            </div>  
                                            
                                            <br/>
                                            <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                {this.state.btnMessage === 0 ? "Edit Farmer" : "Editing Farmer Please Wait.."}<div className="ripple-container"></div>
                                            </button>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                            <div className="page-header">
                            <h3 className="page-title"></h3>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card mdc-card" id="pills-payment">
                                    <div className="card-body">
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
                                                        <th>#ORDER NO</th>
                                                        <th>RICE TYPE</th>
                                                        <th>KILOS</th>
                                                        <th>CUSTOMER</th>
                                                        <th>FARMER PRICE</th>
                                                        <th>ORDERED ON</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {currentOrders.map((farmer) => (
                                                    <tr key={farmer.id}>
                                                        <td>{farmer.id}</td>
                                                        <td>
                                                            {farmer.rice_type === 1
                                                            ? "Pishori" : "Kwamboka"
                                                            }
                                                        </td>
                                                        <td>{farmer.kgs}</td>
                                                        <td>{farmer.customer.name}</td>
                                                        <td>{farmer.farmer_price}</td>
                                                        <td>{new Date(farmer.added_on).toLocaleString()}</td>
                                                        
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            <br/>
                                            <div className="dataTables_paginate paging_simple_numbers" id="order-listing_paginate">
                                                <ul className="pagination">
                                                    <li className="paginate_button page-item previous disabled" id="order-listing_previous"><a href="#" aria-controls="order-listing" data-dt-idx="0" tabindex="0" className="page-link">Previous</a>
                                                    </li>
                                                    <li className="paginate_button page-item">
                                                        {
                                                            pageNumbers.map((pageNum, index) => (
                                                                <a href="#"
                                                                    key={index} 
                                                                    aria-controls="order-listing" 
                                                                    data-dt-idx="1" 
                                                                    tabindex="0" 
                                                                    className={pageNum === this.state.currentPage
                                                                        ? "page-link"
                                                                        : ""}
                                                                    onClick={() => {setPage(pageNum)}}
                                                                >
                                                                    {pageNum}
                                                                </a>
                                                            ))
                                                        }
                                                    </li>
                                                    <li className="paginate_button page-item next" id="order-listing_next">
                                                        
                                                        <a href="#" aria-controls="order-listing" data-dt-idx="3" tabindex="0" className="page-link">Next</a>
                                                    </li>
                                                </ul>
                                            </div>
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

export default FarmerDetailsComponent;