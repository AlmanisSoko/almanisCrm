import React from "react";
import APIHandler from "../utils/APIHandler"
import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PaidFarmerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        monthFarmerChartOption: {},
        yearFarmerChartOption: {},
        dataLoaded: false
    }

    // Load data to page
    componentDidMount() {
        this.fetchHomepage();
    }

    // manages state values
    async fetchHomepage() {
        let apihandler = new APIHandler();
        let homedata = await apihandler.fetchHomePage();
        console.log(homedata);

        let monthfarmerdatalist = [];
        for (let i = 0; i < homedata.data.month_farmer.length; i++) {
            monthfarmerdatalist.push({
                x: new Date(homedata.data.month_farmer[i].date),
                y: homedata.data.month_farmer[i].amt,
            });
        };

        let yearfarmerdatalist = [];
        for (let i = 0; i < homedata.data.year_farmer.length; i++) {
            yearfarmerdatalist.push({
                x: new Date(homedata.data.year_farmer[i].date),
                y: homedata.data.year_farmer[i].amt
            });
        };

        this.state.monthFarmerChartOption = {
            animationEnabled: true,
            title: {
                text: "",
            },
            axisX: {
                valueFormatString: "MMMM YYYY",
            },
            axisY: {
                title: "",
                prefix: "Ksh",
            },
            data: [
                {
                    xValueFormatString: "MMMM YYYY",
                    yValueFormatString: "Ksh #, ###",
                    type: "spline",
                    dataPoints: monthfarmerdatalist,
                }
            ]
        };

        this.state.yearFarmerChartOption = {
            animationEnabled: true,
            title: {
                text: "",
            },
            axisX: {
                valueFormatString: "MMMM YYYY",
            },
            axisY: {
                title: "",
                prefix: "Ksh",
            },
            data: [
                {
                    xValueFormatString: "MMMM YYYY",
                    yValueFormatString: "Ksh #, ###",
                    type: "column",
                    dataPoints: yearfarmerdatalist,
                }
            ]
        };
        this.setState({});
        this.setState({ dataLoaded: true });
    }

    render() {
        return(
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin"></div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin"></div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin"></div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin"></div>
                        </div>
                        <div className="page-header">
                            <h3 className="page-title">PAID TO FARMERS ANALYSIS</h3>
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
                            <div className="col-sm-12 stretch-card grid-margin">
                                <div className="card mdc-card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h4 className="card-title mb-2 mb-sm-0">Monthly Farmer</h4>
                                            <div className="d-flex justtify-content-between align-items-center">
                                                <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                                <i className="mdi mdi-dots-vertical options-icon"></i>
                                            </div>
                                        </div>
                                        <div className="d-block d-sm-flex justify-content-between align-items-center">
                                            <h6 className="card-sub-title mb-0">Total Monthly Farmer</h6>
                                            <div className="btn-group">
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin">ALL</a>
                                            </div>
                                        </div>
                                        <div className="chart-container mt-4">
                                            <CanvasJSChart
                                                options={this.state.monthFarmerChartOption}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 stretch-card grid-margin">
                                <div className="card mdc-card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h4 className="card-title mb-2 mb-sm-0">Yearly Farmer</h4>
                                            <div className="d-flex justtify-content-between align-items-center">
                                                <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                                <i className="mdi mdi-dots-vertical options-icon"></i>
                                            </div>
                                        </div>
                                        <div className="d-block d-sm-flex justify-content-between align-items-center">
                                            <h6 className="card-sub-title mb-0">Total Yearly Farmer</h6>
                                            <div className="btn-group">
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin"></a>
                                                <a href="#" className="btn btn-outline-light text-small text-muted border-0 font-weight-thin">ALL</a>
                                            </div>
                                        </div>
                                        <div className="chart-container mt-4">
                                            <CanvasJSChart
                                                options={this.state.yearFarmerChartOption}
                                            />
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

export default PaidFarmerComponent;