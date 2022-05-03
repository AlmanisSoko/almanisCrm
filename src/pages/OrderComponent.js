import React from "react";
import APIHandler from "../utils/APIHandler";

class OrderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
        this.completeOrdersDetails = this.completeOrdersDetails.bind(this);
        this.formRef = React.createRef();
      }
      state = {
        errorRes: false,
        errorMessage: "",
        btnMessage: 0,
        sendData: false,
        OrdersDataList: [],
        dataLoaded: false,
      };
    
      async formSubmit(event) {
        event.preventDefault();
        this.setState({ btnMessage: 1 });
        var apiHandler = new APIHandler();
        var response = await apiHandler.saveOrdersData(
          event.target.phone.value,
          event.target.name.value,
          event.target.town.value,
          event.target.region.value,
          event.target.kgs.value,
          event.target.packaging.value,
          event.target.discount.value,
          event.target.transport.value,
          event.target.farmer_id.value,
          event.target.amount.value,
          event.target.comment.value,
        );
        console.log(response);
        this.setState({ btnMessage: 0 });
        this.setState({ errorRes: response.data.error });
        this.setState({ errorMessage: response.data.message });
        this.setState({ sendData: true });
      }
    
      //This Method Work When Our Page is Ready
    componentDidMount() {
      this.fetchOrdersData();
    }

    async fetchOrdersData() {
        var apihandler = new APIHandler();
        var ordersdata = await apihandler.fetchAllOrders();
        console.log(ordersdata);
        this.setState({ OrdersDataList: ordersdata.data.data });
        this.setState({ dataLoaded: true });
    }
    
    async completeOrdersDetails(
      customer_id,
      name,
      town,
      kgs,
      packaging,
      discount,
      transport,
      farmer_id,
      amount,
    ) {
      console.log(customer_id);
      var apihandler = new APIHandler();
      var ordersdata = await apihandler.updateOrdersRequest(
        customer_id,
        name,
        town,
        kgs,
        packaging,
        discount,
        transport,
        farmer_id,
        amount,
      );
      console.log(ordersdata);
      this.fetchOrdersData();
    }

    viewOrdersDetails = (orders_id) => {
      console.log(orders_id);
      console.log(this.props);
      this.props.history.push("/ordersdetails/" + orders_id);
    }; 

    render() {
        return (
            <section className="content">
                <div className="container-fluid">

                    <div className="block-header">
                        <h2>ALL ORDERS</h2>
                    </div>

                    <div className="row clearfix">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="card">
                          <div className="header">
                            
                            <h2>
                              All Orders
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
                                  <th>#</th>
                                  <th>CUSTOMER</th>
                                  <th>TOWN</th>
                                  <th>KGS</th>
                                  <th>PACKAGING</th>
                                  <th>DISCOUNT</th>
                                  <th>TRANSPORT</th>
                                  <th>FARMER</th>
                                  <th>AMOUNT</th>
                                  <th>ADDED</th>
                                  <th>DESPATCH</th>
                                  <th>ACTION</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.OrdersDataList.map((orders) => (
                                  <tr key={orders.id}>
                                    <td>{orders.id}</td>
                                    <td>{orders.name}</td>
                                    <td>{orders.town}</td>
                                    <td>{orders.kgs}</td>
                                    <td>{orders.packaging}</td>
                                    <td>{orders.discount}</td>
                                    <td>{orders.transport}</td>
                                    <td>{orders.farmer.name}</td>
                                    <td>{orders.amount}</td>
                                    
                                    <td>{new Date(orders.added_on).toLocaleString()}</td>
                                    <td>
                                      {orders.status === 0 ? (
                                        <button
                                          className="btn btn-block btn-warning"
                                          onClick={() =>
                                            this.completeOrdersDetails(
                                              orders.id,
                                            //  orders.phone,
                                              orders.name,
                                             // orders.customer_id,
                                            //  orders.region,
                                              orders.town,
                                              orders.kgs,
                                              orders.packaging,
                                              orders.discount,
                                              orders.transport,
                                            //  orders.comment,
                                              orders.farmer_id,
                                          //    orders.price,
                                              orders.amount,
                                            )
                                          }
                                        >
                                          PENDING?
                                        </button>
                                      ) : (
                                        <button className="btn btn-block btn-success">
                                          DONE
                                        </button>
                                      )}
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-block btn-warning"
                                        onClick={() =>
                                          this.viewOrdersDetails(orders.id)
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

export default OrderComponent;
