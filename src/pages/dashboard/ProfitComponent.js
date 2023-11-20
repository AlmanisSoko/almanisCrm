import React from "react";
import APIHandler from "../../utils/APIHandler"
import CanvasJSReact from "../../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ProfitComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        monthProfitChartOption: {},
        yearProfitChartOption: {},
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

        let monthprofitdatalist = [];
        for (let i = 0; i < homedata.data.month_profit.length; i++) {
            monthprofitdatalist.push({
                x: new Date(homedata.data.month_profit[i].date),
                y: homedata.data.month_profit[i].amt,
            });
        };

        let yearprofitdatalist = [];
        for (let i = 0; i < homedata.data.year_profit.length; i++) {
            yearprofitdatalist.push({
                x: new Date(homedata.data.year_profit[i].date),
                y: homedata.data.year_profit[i].amt
            });
        };

        this.state.monthProfitChartOption = {
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
                    dataPoints: monthprofitdatalist,
                }
            ]
        };

        this.state.yearProfitChartOption = {
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
                    dataPoints: yearprofitdatalist,
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
                            <h3 className="page-title">PROFIT ANALYSIS</h3>
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
                                            <h4 className="card-title mb-2 mb-sm-0">Monthly Profit</h4>
                                            <div className="d-flex justtify-content-between align-items-center">
                                                <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                                <i className="mdi mdi-dots-vertical options-icon"></i>
                                            </div>
                                        </div>
                                        <div className="d-block d-sm-flex justify-content-between align-items-center">
                                            <h6 className="card-sub-title mb-0">Total Monthly Profit</h6>
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
                                                options={this.state.monthProfitChartOption}
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
                                            <h4 className="card-title mb-2 mb-sm-0">Yearly Profit</h4>
                                            <div className="d-flex justtify-content-between align-items-center">
                                                <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                                <i className="mdi mdi-dots-vertical options-icon"></i>
                                            </div>
                                        </div>
                                        <div className="d-block d-sm-flex justify-content-between align-items-center">
                                            <h6 className="card-sub-title mb-0">Total Yearly Profit</h6>
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
                                                options={this.state.yearProfitChartOption}
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

export default ProfitComponent;