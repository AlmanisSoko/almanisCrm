import React from "react";
import APIHandler from "../../utils/APIHandler";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import DatePicker from "react-datepicker";

class AnalyticsComponent extends React.Component {

    constructor(props) {
        super(props);
    } 

    state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        OrdersDatalist: [],
        startDate: null,
        endDate: null,
        dataLoaded: false,
        formSubmitted: false,
    }

    componentDidMount() {
        this.fetchOdersData();
    }

    async fetchOdersData() {
        var apihandler = new APIHandler();
        var ordersdata = await apihandler.fetchAllOrders();
        console.log(ordersdata);
        this.setState({ OrdersDatalist: ordersdata.data.data });
        this.setState({ filteredData: ordersdata.data.data });
        this.setState({ dataLoaded: true });
    }

    render() {
        // filter variable
        const { startDate, endDate } = this.state;

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
                        <h3 className="page-title">PACKAGING,KGS & TRANSPORT ANALYSIS</h3>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">ANALYTICS</h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_length" id="order-listing_length">
                                                        <label>
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
                                                <div className="col-sm-6 col-md-3">
                                                    <div id="order-listing_filter" className="dataTables_filter">
                                                        <label>Start Date:
                                                            <DatePicker
                                                                type="search" 
                                                                className="form-control" 
                                                                selected={this.state.startDate}
                                                                aria-controls="order-listing"
                                                                onChange={date => this.setState({ startDate: date })}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-3">
                                                    <div id="order-listing_filter" className="dataTables_filter">
                                                        <label>End date:
                                                            <DatePicker
                                                                type="search" 
                                                                className="form-control" 
                                                                selected={this.state.endDate}
                                                                aria-controls="order-listing"
                                                                onChange={date => this.setState({ endDate: date })}
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
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <table id="order-listing" className="table dataTable no-footer" role="grid" aria-describedby="order-listing_info">
                                                        <thead>
                                                            <tr role="row">
                                                                <th className="sorting_asc" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Order #: activate to sort column descending" style={{width: "60.0469px"}}>
                                                                    ORDER #
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Purchased On: activate to sort column ascending" style={{width: "108.781px"}}>
                                                                    CUSTOMER NO    
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Customer: activate to sort column ascending" style={{width: "77.1406px"}}>
                                                                    PACKAGING
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Ship to: activate to sort column ascending" style={{width: "56.2031px"}}>
                                                                    RICE TYPE
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Base Price: activate to sort column ascending" style={{width: "83.9531px"}}>
                                                                    FARMER
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Purchased Price: activate to sort column ascending" style={{width: "126.438px"}}>
                                                                    KGS
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Status: activate to sort column ascending" style={{width: "62.0938px"}}>
                                                                    TRANSPORT
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "61.3438px"}}>
                                                                    RIDER
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "61.3438px"}}>
                                                                    FARMER PRICE
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "61.3438px"}}>
                                                                    ALMANIS PRICE
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "61.3438px"}}>
                                                                    DISCOUNT
                                                                </th>
                                                                <th className="sorting" tabIndex="0" aria-controls="order-listing" rowSpan="1" colSpan="1" aria-label="Actions: activate to sort column ascending" style={{width: "61.3438px"}}>
                                                                    ORDERED ON
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.OrdersDatalist.map(orders => {
                                                            if (startDate && endDate) {
                                                                const orderDate = new Date(orders.added_on);
                                                                if (orderDate >= startDate && orderDate <= endDate) {
                                                                    return(
                                                                        <tr role="row" className="odd" key={orders.id}>
                                                                            <td className="sorting_1">{orders.id}</td>
                                                                            <td>{orders.customer_id}</td>
                                                                            <td>{orders.packaging}</td>
                                                                            <td>{orders.rice_type === 1 ? "Pishori" : "Komboka"}</td>
                                                                            <td>{orders.farmer.name}</td>
                                                                            <td>{orders.kgs}</td>
                                                                            <td>{orders.transport}</td>
                                                                            <td>{orders.rider}</td>
                                                                            <td>{orders.farmer_price}</td>
                                                                            <td>{orders.price}</td>
                                                                            <td>{orders.discount}</td>
                                                                            <td>{new Date(orders.added_on).toLocaleString()}</td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            } else {
                                                                return(
                                                                    <tr role="row" className="odd" key={orders.id}>
                                                                        <td className="sorting_1">{orders.id}</td>
                                                                        <td>{orders.customer_id}</td>
                                                                        <td>{orders.packaging}</td>
                                                                        <td>{orders.rice_type === 1 ? "Pishori" : "Komboka"}</td>
                                                                        <td>{orders.farmer.name}</td>
                                                                        <td>{orders.kgs}</td>
                                                                        <td>{orders.transport}</td>
                                                                        <td>{orders.rider}</td>
                                                                        <td>{orders.farmer_price}</td>
                                                                        <td>{orders.price}</td>
                                                                        <td>{orders.discount}</td>
                                                                        <td>{new Date(orders.added_on).toLocaleString()}</td>
                                                                    </tr>
                                                                );
                                                            }
                                                        })}
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
        )
    }
}

export default AnalyticsComponent;