import React from "react";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";
// import usericon from "adminbsb-materialdesign/images/undraw_Pic_profile_re_i9i4.png";
import swal from 'sweetalert2';

class CustomerDetailsComponent extends React.Component {

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
        payments: [],
        regionlist: [],
        buy_total: 0,
        orders_count: 0,
        payed_total: 0,
        balance: 0,
        discount: 0,
        kgs: 0,
        CustomerDataList: [],
        name: "",
        phone: "",
        secondary_phone: "",
        alternative_phone: "",
        town: "",
        region: "",
        id: "",
        dataLoaded: false,
        currentPage: 1,
        ordersPerPage: 50,
    }; 

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
                var response = apiHandler.editCustomerData(
                    event.target.name.value,
                    event.target.phone.value,
                    event.target.secondary_phone.value,
                    event.target.alternative_phone.value,
                    event.target.town.value,
                    event.target.region.value,
                    this.props.match.params.id
                );
                console.log(response);
                this.setState({ erroRes: response.data.error });
                this.setState({ errorMessage: response.data.message });
                window.location.reload();
            } else if (willEdit.isDenied){
                swal.fire('Changes are not saved', '', 'info')
            }
        });
        this.setState({ btnMessage: 0 });
        this.setState({ sendData: true });
    }

    componentDidMount() {
        this.fetchCustomerData();
        this.LoadRegion();
    }

    async fetchCustomerData() {
        var apihandler = new APIHandler();
        var customerdata = await apihandler.fetchCustomerDetails(this.props.match.params.id);
        console.log(customerdata);
        this.setState({ orders: customerdata.data.data.orders });
        this.setState({ orders_count: customerdata.data.orders_count });
        this.setState({ buy_total: customerdata.data.buy_total });
        this.setState({ discount: customerdata.data.discount });
        this.setState({ payed_total: customerdata.data.payed_total });
        this.setState({ kgs: customerdata.data.kgs });
        this.setState({ balance: customerdata.data.balance });
        this.setState({ id: customerdata.data.data.id });
        this.setState({ payments: customerdata.data.data.payments });
        this.setState({ name: customerdata.data.data.name });
        this.setState({ phone: customerdata.data.data.phone });
        this.setState({ secondary_phone: customerdata.data.data.secondary_phone });
        this.setState({ alternative_phone: customerdata.data.data.alternative_phone });
        this.setState({ town: customerdata.data.data.town });
        this.setState({ region: customerdata.data.data.region });
        this.setState({ dataLoaded: true });
       // this.setState({ customerdata:data.data });
    }

    async LoadRegion() {
        var apihandler = new APIHandler();
        var regiondata = await apihandler.fetchRegionOnly();
        this.setState({ regionlist: regiondata.data });
    }

    viewCustomerDetails = (customer_id) => {
        console.log(customer_id);
        console.log(this.props);
        this.props.history.push("/customerprofile/" +  customer_id );
    }

    handleChange = (event) => {
        this.setState({
            region: event.target.value
        })
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
                            <h3 className="page-title"> CUSTOMER PROFILE</h3>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="border-bottom text-center pb-4">
                                                    <img src="../../assets/images/faces-clipart/undraw_male_avatar_g98d.svg" alt="profile" className="img-lg rounded-circle mb-3"/>
                                                    
                                                    <p>{
                                                        this.state.region === 1 
                                                        ? "NAIROBI" 
                                                        : this.state.region == 2
                                                        ? "NYANZA"
                                                        : this.state.region == 3
                                                        ? "CENTRAL"
                                                        : this.state.region == 4
                                                        ? "COAST"
                                                        : this.state.region == 5
                                                        ? "EASTERN"
                                                        : this.state.region == 6
                                                        ? "NORTH EASTERN"
                                                        : this.state.region == 7
                                                        ? "WESTERN"
                                                        : this.state.region == 8
                                                        ? "RIFT VALLEY"
                                                        : this.state.region
                                                        }
                                                    </p>
                                                </div>
                                                <div className="card mdc-card p-0 product-list">
                                                    <div className="card-body">
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5>Orders</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.orders_count}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5>Kilos</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.kgs.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} Kgs
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5>Discount</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.discount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Ksh
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5>Amount</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.buy_total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Ksh
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5>Paid</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.payed_total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Ksh
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5>Balance</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.balance.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Ksh
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <Link to={"/addpayment"}>
                                                    <button className="btn btn-gradient-primary btn-block">
                                                        Add Payment
                                                    </button>
                                                </Link>
                                            </div>

                                            <div className="col-lg-8">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h3>{this.state.name}</h3>
                                                            <div className="d-flex align-items-center">
                                                            <h5 className="mb-0 mr-2 text-muted">{this.state.town}</h5>
                                                                
                                                        </div>
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
                                                            <label >Primary No: </label>
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

                                                        <div className="col-md-6"> 
                                                            <div className="form-group bmd-form-group">
                                                            <label >Secondary No:</label>
                                                                <input
                                                                type="text"
                                                                id="secondary_phone"
                                                                name="secondary_phone"
                                                                className="form-control"
                                                                placeholder=""
                                                                defaultValue={this.state.secondary_phone}
                                                                required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6"> 
                                                            <div className="form-group bmd-form-group">
                                                            <label >Alternative No:</label>
                                                                <input
                                                                type="text"
                                                                id="alternative_phone"
                                                                name="alternative_phone"
                                                                className="form-control"
                                                                placeholder=""
                                                                defaultValue={this.state.alternative_phone}
                                                                required
                                                                />
                                                            </div>
                                                        </div> 

                                                        <div className="col-md-6"> 
                                                            <div className="form-group bmd-form-group">
                                                            <label >Town</label>
                                                                <input
                                                                type="text"
                                                                id="town"
                                                                name="town"
                                                                className="form-control"
                                                                placeholder=""
                                                                defaultValue={this.state.town}
                                                                required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6"> 
                                                            <div className="form-group bmd-form-group">
                                                                <label >Region</label>
                                                                <select id="region" name="region" className="form-control show-tick" value={this.state.region} onChange={this.handleChange}>
                                                                    <option value="1">NAIROBI</option>
                                                                    <option value="2">NYANZA</option>
                                                                    <option value="3">CENTRAL</option>
                                                                    <option value="4">COAST</option>
                                                                    <option value="5">EASTERN</option>
                                                                    <option value="6">NORTH EASTERN</option>
                                                                    <option value="7">WESTERN</option>
                                                                    <option value="8">RIFT VALLEY</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>  
                                                    
                                                    <br/>
                                                    <button type="submit" className="btn btn-success btn-block btn-rounded btn-fw" disabled={this.state.btnMessage === 0 ? false : true}>
                                                        {this.state.btnMessage === 0 ? "Edit Customer" : "Editing Customer Please Wait.."}<div className="ripple-container"></div>
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
                            <h3 className="page-title"> </h3>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card mdc-card" id="pill-orders">
                                    <div className="card-body">
                                        
                                        {this.state.dataLoaded === false ? (
                                            <div className="dot-opacity-loader">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        ) : ""}

                                        <ul className="nav nav-pills nav-pills-custom" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pill-orders" role="tab" aria-controls="pills-home" aria-selected="true"> Orders </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-payment" role="tab" aria-controls="pills-profile" aria-selected="false"> Payment </a>
                                            </li>
                                        </ul>

                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#ORDER</th>
                                                        <th>RICE</th>
                                                        <th>RICE PRICE</th>
                                                        <th>FARMER</th>
                                                        <th>AMOUNT</th>
                                                        <th>COMMENT</th>
                                                        <th>ORDERED ON</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentOrders.map((customer) => (
                                                    <tr key={customer.id}>
                                                        <td>{customer.id}</td>
                                                        <td>
                                                            {customer.rice_type === 1
                                                                ? "Pishori" : "Kwamboka"
                                                            }
                                                        </td>
                                                        <td>{customer.price}</td>
                                                        <td>{customer.farmer.name}</td>
                                                        <td>{customer.amount}</td> 
                                                        <td>{customer.comment}</td>
                                                        <td>{new Date(customer.added_on).toLocaleString()}</td>
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

                        <div className="page-header">
                            <h3 className="page-title"></h3>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card mdc-card" id="pills-payment">
                                    <div className="card-body">
                                        <ul className="nav nav-pills nav-pills-custom" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pill-orders" role="tab" aria-controls="pills-home" aria-selected="true"> Orders </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-payment" role="tab" aria-controls="pills-profile" aria-selected="false"> Payment </a>
                                            </li>
                                        </ul>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#SRNO</th>
                                                        <th>ORDER</th>
                                                        <th>PAYMENT</th>
                                                        <th>PAYMENT SOURCE</th>
                                                        <th>PAYED</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.payments.map((customer) => (
                                                    <tr key={customer.id}>
                                                        <td>{customer.id}</td>
                                                        <td>{customer.orders_id}</td>
                                                        <td>{customer.payment}</td> 
                                                        <td>{customer.paying_number}</td> 
                                                        <td>{new Date(customer.added_on).toLocaleString()}</td>
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

export default CustomerDetailsComponent;