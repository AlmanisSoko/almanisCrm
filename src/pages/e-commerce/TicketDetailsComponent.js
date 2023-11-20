import React from "react";
import APIHandler from "../../utils/APIHandler";

class TicketDetailsComponent extends React.Component {

  constructor(props) {
    super(props)
    console.log(props.match.params.id);
  }

    state = {
      errorRes: false,
      errorMessage: "", 
      btnMessage: 0, 
      sendData: false,
      orders_id: "",
      phone: "",
      comment: "",
      farmer_id: "",
      customer_name: "",
      rice_type: "",
      dataLoaded: false,
    };
  
    componentDidMount() {
      this.fetchTicketData();
    }

    async fetchTicketData() {
      var apihandler = new APIHandler();
      var ticketdata = await apihandler.fetchTicketDetails(this.props.match.params.id);
      console.log(ticketdata);
      this.setState({ comment: ticketdata.data.data.comment });
      this.setState({ phone: ticketdata.data.data.phone });
      this.setState({ orders_id: ticketdata.data.data.orders_id });
      this.setState({ farmer_id: ticketdata.data.data.farmer_id });
      this.setState({ kgs: ticketdata.data.data.kgs });
      this.setState({ rice_type: ticketdata.data.data.rice_type });
      this.setState({ customer_name: ticketdata.data.data.customer_name });
    }

    render() {
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
          </div>        
        </div>
      )
    }
}

export default TicketDetailsComponent;