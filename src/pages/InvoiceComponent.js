import React from 'react';
import APIHandler from '../utils/APIHandler';
import swal from 'sweetalert2';

class InvoiceComponent extends React.Component {
    
    state = {
        errorRes: false,
        errorMessage: "",
        filteredData: [],
        InvoiceDataList: [],
        searchTerm: "",
        dataLoaded: false
    }

    componentDidMount() {
        this.fetchInvoiceData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.InvoiceDataList !== this.state.InvoiceDataList) {
            this.searchData();
        }
        
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.searchData();
        }
    }

    async fetchInvoiceData() {
        var apihandler = new APIHandler();
        var invoicedata = await apihandler.fetchAllInvoice();
        console.log(invoicedata);
        this.setState({ InvoiceDataList: invoicedata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewInvoiceDetails = (invoice_id) => {
        console.log(invoice_id);
        console.log(this.props);
        this.props.history.push("/invoicedetails/" + invoice_id);
    }

    searchData = () => {
        const { InvoiceDataList, searchTerm } = this.state;
        const filteredData = InvoiceDataList.filter(invoice => {
            return invoice.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
        this.setState({ filteredData });
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    // deleteInvoice(invoice_id) {
    //     swal({
    //         title: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this invoice!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //       })
    //       .then((willDelete) => {
    //         if (willDelete) {
    //           swal("Poof! Your invoice has been deleted!!", {
    //             icon: "success",
    //           });
    //             fetch('https://brmsapi.barakapishoriricemillers.co.ke/api/invoice/' + invoice_id + "/", {
    //               method: 'DELETE',
    //               headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
    //             });
          
    //             window.location.reload();
    //         } else {
    //           swal("Your invoice is safe!");
    //         }
    //       });
    //       this.fetchInvoiceData();
    // }; 

    deleteInvoice = async (invoice_id) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            try {
                var apihandler = new APIHandler();
                const response = await apihandler.deleteInvoiceData(invoice_id);

                // If the delete was successful, update the state to remove the deleted payment
                if (response && response.data && response.data.error === false) {
                    this.setState((prevState) => ({
                        InvoiceDataList: prevState.InvoiceDataList.filter((invoice) => invoice.id !== invoice_id),
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

    render() {
        // search invoice
        const { filteredData } = this.state;

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
                            <h3 className="page-title"> ALL INVOICES</h3>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Generated Invoices</h4>
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
                                                            placeholder="Search Invoice"
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
                                                        <th>TOWN</th>
                                                        <th>BILL</th>
                                                        <th>ADDED ON</th>
                                                        <th>ACTION</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.map((invoice) => (
                                                        <tr key={invoice.id}>
                                                        <td>{invoice.id}</td>
                                                        <td>{invoice.name}</td>
                                                        <td>
                                                            {
                                                                invoice.phone.substring(0, 5)
                                                            }
                                                        </td>
                                                        <td>{invoice.town}</td>
                                                        <td>{invoice.total}</td>
                                                        <td>{new Date(invoice.added_on).toLocaleString()}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-block btn-success"
                                                                onClick={() =>
                                                                    this.viewInvoiceDetails(invoice.id)
                                                                }
                                                            >
                                                                <i className="mdi mdi-border-color"></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-block btn-danger"
                                                                onClick={() =>
                                                                this.deleteInvoice(invoice.id)
                                                            }>
                                                            <i className="ti-trash">delete</i>
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
        )
    }
}

export default InvoiceComponent;