import React from "react";
import APIHandler from "../../utils/APIHandler";
import { Link } from "react-router-dom";

class BalanceComponent extends React.Component {

    state = {
        errorRes: false,
        errorMessage: "",
        sendData: false,
        total_negative_balance: 0,
        total_positive_balance: 0,
        dataLoaded: false,
    }

    componentDidMount() {
        this.fetchHomePage();
        this.fetchPage();
    }

    async fetchHomePage() {
        var apihandler = new APIHandler();
        var homedata = await apihandler.fetchOverPaid();
        console.log(homedata);
        this.setState({ total_negative_balance: homedata.data.total_negative_balance });
        this.setState({ dataLoaded: true });
    }

    async fetchPage() {
        var apihandler = new APIHandler();
        var homedata = await apihandler.fetchUnderPaid();
        console.log(homedata);
        this.setState({ total_positive_balance: homedata.data.total_balance });
        this.setState({ dataLoaded: true });
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
                    <div className="page-header">
                        <h3 className="page-title">BALANCE CATEGORIES</h3>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 stretch-card grid-margin">
                          <div className="card mdc-card">
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
                                    <table className="table dashboard-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="flag-icon-container">
                                                    </span>Over payment
                                                </td>
                                                <td></td>
                                                <td className=" font-weight-medium"> 
                                                    <Link to={"/overpayment"}>
                                                    {Number(this.state.total_negative_balance).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 
                                                    <span className="flag-icon-container">
                                                    </span>Under Payment 
                                                </td>
                                                <td></td>
                                                <td className=" font-weight-medium">
                                                    <Link to={"/underpayment"}>
                                                    {Number(this.state.total_positive_balance).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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

export default BalanceComponent;