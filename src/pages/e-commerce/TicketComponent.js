import React from 'react';
import APIHandler from '../../utils/APIHandler';
import AuthHandler from '../../utils/AuthHandler';
import swal from 'sweetalert';

class TicketComponent extends React.Component {
    
    state = {
        errorRes: false,
        errorMessage: "",
        filteredData: [],
        ticketDataList: [],
        searchTerm: "",
        dataLoaded: false
    }

    componentDidMount() {
        this.fetchTicketData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.ticketDataList !== this.state.ticketDataList) {
            this.searchData();
        }
        
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.searchData();
        }
    } 

    async fetchTicketData() {
        var apihandler = new APIHandler();
        var ticketdata = await apihandler.fetchAllTickets();
        console.log(ticketdata);
        this.setState({ ticketDataList: ticketdata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewticketsDetails = (tickets_id) => {
        console.log(tickets_id);
        console.log(this.props);
        this.props.history.push("/ticketsdetails/" + tickets_id);
    }

    searchData = () => {
        const { ticketDataList, searchTerm } = this.state;
        const filteredData = ticketDataList.filter(tickets => {
            return tickets.customer_name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
        this.setState({ filteredData });
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    deletetickets(tickets_id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this tickets!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your tickets has been deleted!!", {
                icon: "success",
              });
                fetch('https://127.0.0.1:8000/api/tickets/' + tickets_id + "/", {
                  method: 'DELETE',
                  headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
                });
          
                window.location.reload();
            } else {
              swal("Your tickets is safe!");
            }
          });
          this.fetchTicketData();
    }; 

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
                            <h3 className="page-title"> ALL TICKETS</h3>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Generated Tickets</h4>
                                        <p className="card-description">
                                            
                                        </p>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <div id="order-listing_filter" className="dataTables_filter">
                                                    <label>
                                                        <input
                                                            type="text"
                                                            onClick={this.onSearchClick}
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            placeholder="Search tickets"
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
                                                        <th>ORDER NO</th>
                                                        <th>NAME</th>
                                                        <th>RICE TYPE</th>
                                                        <th>FARMER</th>
                                                        <th>KILOS</th>
                                                        <th>NOTES</th>
                                                        <th>ADDED ON</th>
                                                        <th>ACTION</th>
                                                        <th>STATUS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.ticketDataList.map((tickets) => (
                                                        <tr key={tickets.id}>
                                                        <td>{tickets.id}</td>
                                                        <td>{tickets.orders_id}</td>
                                                        <td>{tickets.customer_name}</td>
                                                        <td>{tickets.rice_type === 1 ? "Pishori" : "Komboka"}</td>
                                                        <td>{tickets.farmer.name}</td>
                                                        <td>{tickets.kgs}</td>
                                                        <td>{tickets.comment}</td>
                                                        <td>{new Date(tickets.added_on).toLocaleString()}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-block btn-primary"
                                                                onClick={() =>
                                                                    this.viewticketsDetails(tickets.id)
                                                                }
                                                            >
                                                                <i className="mdi mdi-eye"></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                        {tickets.status === 0 ? (
                                                            <button></button>
                                                        ) : (
                                                            <button className="btn btn-block btn-warning">
                                                                OPEN
                                                            </button>
                                                        )}
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
        )
    }
}

export default TicketComponent;