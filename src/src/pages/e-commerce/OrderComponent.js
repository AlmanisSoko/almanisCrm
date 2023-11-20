import React from "react";
import APIHandler from "../../utils/APIHandler";
import AuthHandler from "../../utils/AuthHandler";
import swal from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
    
class OrderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.node = React.createRef(); 
    }

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        OrdersDataList: [],
        filteredData: [],
        searchTerm: "",
        daily_kgs: 0,
        dataLoaded: false,
        ordersPerPage: 100,
        currentPage: 1,
    };

    //This Method Work When Our Page is Ready
    componentDidMount() {
        this.fetchOrdersData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.OrdersDataList !== this.state.OrdersDataList) {
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
        const { OrdersDataList, searchTerm } = this.state;
        const filteredData = OrdersDataList.filter(orders => {
            return orders.town.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
        this.setState({ filteredData });
    }  

    async fetchOrdersData() {
        var apihandler = new APIHandler();
        var ordersdata = await apihandler.fetchAllOrders();
        console.log(ordersdata);
        this.setState({ OrdersDataList: ordersdata.data.data });
        this.setState({ daily_kgs: ordersdata.data.daily_kgs });
        this.setState({ dataLoaded: true });
    }

    viewOrdersDetails = (orders_id) => {
        console.log(orders_id);
        console.log(this.props);
        this.props.history.push("/ordersdetails/" + orders_id);
    }; 

    deleteOrders = async (orders_id) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            try {
                var apihandler = new APIHandler();
                const response = await apihandler.deleteOrdersData(orders_id);

                // If the delete was successful, update the state to remove the deleted payment
                if (response && response.data && response.data.error === false) {
                    this.setState((prevState) => ({
                        OrdersDataList: prevState.OrdersDataList.filter((orders) => orders.id !== orders_id),
                    }));

                    // Show success notification using swal
                    swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Order deleted successfully!",
                    });
                } else {
                    // Show error notification using swal
                    swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to delete the Order. Please try again.",
                    });
                }
            } catch (error) {
                // Show error notification using swal
                swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while deleting the payment. Please try again.",
                });
            }
        }
    };

    createTicket = async () => {
        const swal = require('sweetalert2');
        const { value: comment } = await swal.fire({
          title: 'Add Comment',
          input: 'text',
          inputPlaceholder: 'Enter comment here...',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Save'
        });
      
        if (comment) {
          try {
            const ordersId = this.state.OrdersDataList[0].id;
            const customerName = this.state.OrdersDataList[0].name;
            const phone = this.state.OrdersDataList[0].phone;
            const farmerId = this.state.OrdersDataList[0].farmer_id;
            const kgs = this.state.OrdersDataList[0].kgs;
            const riceType = this.state.OrdersDataList[0].rice_type;
      
            const response = await fetch("https://test.tarase.com/api/tickets/", {
            // const response = await fetch("http://127.0.0.1:8000/api/tickets/", {
              method: "POST",
              headers: {
                Authorization: "Bearer " + AuthHandler.getLoginToken(),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orders_id: ordersId,
                comment: comment,
                phone: phone,
                customer_name: customerName,
                farmer_id: farmerId,
                kgs: kgs,
                rice_type: riceType,
              })
            });
      
            const data = await response.json();
            console.log(data);
            swal.fire('Success', 'Comment added to ticket', 'success');
          } catch (error) {
            console.log(error);
            swal.fire('Error', 'Failed to add comment to ticket', 'error');
          }
        }
      };

    render() {
        // Get current Orders
        const { filteredData } = this.state;

        return(
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
                        <h3 className="page-title">ALL ORDERS </h3>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Manage Orders</h4>
                                    <div className="row grid-margin">
                                        <div className="col-12">
                                            <div className="alert alert-warning" role="alert">
                                                <strong>Heads up! </strong> Today serviced kilos<strong> {this.state.daily_kgs.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} kgs.</strong> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                        {this.state.dataLoaded === false ? (
                                            <div className="dot-opacity-loader">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        ) : ""}
                                            <div className="table-responsive">
                                                <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                    <div className="row">
                                                        <div className="col-sm-12 col-md-6">
                                                            <div className="dataTables_length" id="order-listing_length">
                                                                <label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        onChange={this.handleChange}
                                                                        placeholder="Search Orders.."
                                                                        aria-controls="order-listing"
                                                                    />
                                                                    <ReactHTMLTableToExcel
                                                                        table="order-listing"
                                                                        filename="general_report"
                                                                        sheet="Sheet"
                                                                        buttonText="excel file"
                                                                        filetype="xls"
                                                                        className="btn btn-info btn-rounded btn-fw"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <table id="order-listing" className="table dataTable no-footer" cellSpacing="0" width="100%" role="grid" aria-describedby="order-listing_info" style={{width: "120%"}}>
                                                                <thead>
                                                                    <tr className="bg-primary text-white" role="row">
                                                                        <th className="sorting_asc" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Order #: activate to sort column descending" style={{width: "31px"}}>
                                                                            ORDER #
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Customer: activate to sort column ascending" style={{width: "100px"}}>
                                                                            CUSTOMER
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Ship to: activate to sort column ascending" style={{width: "47px"}}>
                                                                            TOWN
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Base Price: activate to sort column ascending" style={{width: "57px"}}>
                                                                            KGS
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Purchased Price: activate to sort column ascending" style={{width: "47px"}}>
                                                                            PACKAGING
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Status: activate to sort column ascending" style={{width: "30px"}}>
                                                                            DISCOUNT
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Purchased Price: activate to sort column ascending" style={{width: "47px"}}>
                                                                            TRANSPORT
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Purchased Price: activate to sort column ascending" style={{width: "47px"}}>
                                                                            FARMER
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Purchased Price: activate to sort column ascending" style={{width: "47px"}}>
                                                                            AMOUNT
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Purchased Price: activate to sort column ascending" style={{width: "47px"}}>
                                                                            ADDED
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "173px"}}>
                                                                            ACTION
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "173px"}}>
                                                                            
                                                                        </th>
                                                                        <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "173px"}}>
                                                                            
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {filteredData.map((orders) => (
                                                                    <tr role="row" key={orders.id} className="odd">
                                                                        <td>{orders.id}</td>
                                                                        <td>{orders.customer.name}</td>
                                                                        <td>{orders.town}</td>
                                                                        <td>{orders.kgs}</td>
                                                                        <td>{orders.packaging}</td>
                                                                        <td>{orders.discount}</td>
                                                                        <td>{orders.transport}</td>
                                                                        <td>{orders.farmer.name}</td>
                                                                        <td>{orders.amount}</td>
                                                                        
                                                                        <td>{new Date(orders.added_on).toLocaleString()}</td>
                                                                        <td className="text-right">
                                                                        <button className="btn btn-light" 
                                                                            onClick={() =>
                                                                                this.viewOrdersDetails(orders.id)
                                                                            }
                                                                        >
                                                                            <i className="mdi mdi-eye text-primary"></i>View 
                                                                        </button>
                                                                        </td>
                                                                        <td className="text-right">
                                                                        <button className="btn btn-light" 
                                                                            onClick={() =>
                                                                                this.createTicket()
                                                                            }
                                                                        >
                                                                            <i className="mdi mdi-ticket text-primary"></i>BOOK 
                                                                        </button>
                                                                        </td>
                                                                        <td className="text-right">
                                                                        <button className="btn btn-light"
                                                                            onClick={() =>
                                                                                this.deleteOrders(orders.id)
                                                                            }
                                                                        >
                                                                            <i className="mdi mdi-close text-danger"></i>Remove
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

export default OrderComponent;