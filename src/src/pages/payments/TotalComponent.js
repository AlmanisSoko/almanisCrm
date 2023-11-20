import React from "react";
import APIHandler from "../../utils/APIHandler";
import { Link } from "react-router-dom";

class TotalComponent extends React.Component {

    state = {
        errorRes: false,
        errorMessage: "",
        sendData: false,
        paid_mpesa: 0,
        paid_cash: 0,
        paid_bank: 0,
        paid_promo:0,
        paid_trade: 0,
        dataLoaded: false,
    }

    componentDidMount() {
        this.fetchHomePage();
    }

    async fetchHomePage() {
        var apihandler = new APIHandler();
        var homedata = await apihandler.fetchHomePage();
        console.log(homedata);
        this.setState({ paid_mpesa: homedata.data.paid_mpesa });
        this.setState({ paid_cash: homedata.data.paid_cash });
        this.setState({ paid_bank: homedata.data.paid_bank });
        this.setState({ paid_trade: homedata.data.paid_trade });
        this.setState({ paid_promo: homedata.data.paid_promo });
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
                        <h3 className="page-title">PAYMENTS CATEGORIES</h3>
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
                                                    </span>Mpesa
                                                </td>
                                                <td></td>
                                                <td className=" font-weight-medium"> 
                                                    <Link to={"/mpesapayments"}>
                                                    {this.state.paid_mpesa}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 
                                                    <span className="flag-icon-container">
                                                    </span>Cash 
                                                </td>
                                                <td></td>
                                                <td className=" font-weight-medium">
                                                    <Link to={"/cashpayments"}>
                                                    {this.state.paid_cash}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 
                                                    <span className="flag-icon-container">
                                                    </span>Bank
                                                </td>
                                                <td></td>
                                                <td className=" font-weight-medium">
                                                    <Link to={"/bankpayments"}>
                                                     {this.state.paid_bank}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 
                                                    <span className="flag-icon-container">
                                                    </span>Promotion
                                                </td>
                                                <td></td>
                                                <td className=" font-weight-medium">
                                                    <Link to={"/promo"}>
                                                        {this.state.paid_promo}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 
                                                    <span className="flag-icon-container">
                                                    </span>Barter Trade
                                                </td>
                                                <td></td>
                                                <td className=" font-weight-medium">
                                                    <Link to={"/tradein"}>
                                                    {this.state.paid_trade}
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

export default TotalComponent;