import React from "react";
import APIHandler from "../../utils/APIHandler";
import CanvasJSReact from "../../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class KilosComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    
    state = { 
        kilo_monthChartOption: {},
        kiloChartOption: {},
        dataLoaded: false
    }

    // this method loads data to page
    componentDidMount() {
        this.fetchMonthChart();
        this.fetchYearChart();
    }

    async fetchMonthChart() {
        let apihandler = new APIHandler();
        let monthdata = await apihandler.monthlyData();
        console.log(monthdata)

        let monthdatalist = [];
        for (let i = 0; i < monthdata.data.month_kilos_chart.length; i++) {
            monthdatalist.push({
                x: new Date(monthdata.data.month_kilos_chart[i].date),
                y: monthdata.data.month_kilos_chart[i].amt,
            });
        }

        this.state.kilo_monthChartOption = {
            animationEnabled: true,
            title: {
                text: "",
            },
            axisX: {
                valueFormatString: "MMMM YYYY",
            },
            axisY: {
                title: "",
                prefix: "Kgs"
            },
            data: [
                {
                    yValueFormatString: "Kgs #, ###",
                    xValueFormatString: "MMMM YYYY",
                    type: "spline",
                    dataPoints: monthdatalist,
                },
            ]
        };

        this.setState({});
        this.setState({ dataLoaded: true });
    }

    async fetchYearChart() {
        let apihandler = new APIHandler();
        let yeardata = await apihandler.yearlyData();
        console.log(yeardata)

        let kilodatalist = [];
        for (let i = 0; i < yeardata.data.year_kilos.length; i++) {
            kilodatalist.push({
                x: new Date(yeardata.data.year_kilos[i].date),
                y: yeardata.data.year_kilos[i].amt,
            });
        }

        this.state.kiloChartOption = {
            animationEnabled: true,
            title: {
                text: "",
            },
            axisX: {
                valueFormatString: "YYYY",
            },
            axisY: {
                title: "",
                prefix: "Kgs",
            },
            data: [
                {
                    yValueFormatString: "Kgs #, ###",
                    xValueFormatString: "YYYY",
                    type: "column",
                    dataPoints: kilodatalist,
                },
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
                            <h3 className="page-title">KILOS ANALYSIS</h3>
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
                                            <h4 className="card-title mb-2 mb-sm-0">Monthly Kilos</h4>
                                            <div className="d-flex justtify-content-between align-items-center">
                                                <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                                <i className="mdi mdi-dots-vertical options-icon"></i>
                                            </div>
                                        </div>
                                        <div className="d-block d-sm-flex justify-content-between align-items-center">
                                            <h6 className="card-sub-title mb-0">Total Monthly Kilos</h6>
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
                                                options={this.state.kilo_monthChartOption}
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
                                            <h4 className="card-title mb-2 mb-sm-0">Yearly Kilos</h4>
                                            <div className="d-flex justtify-content-between align-items-center">
                                                <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                                <i className="mdi mdi-dots-vertical options-icon"></i>
                                            </div>
                                        </div>
                                        <div className="d-block d-sm-flex justify-content-between align-items-center">
                                            <h6 className="card-sub-title mb-0">Total Yearly Kilos</h6>
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
                                                options={this.state.kiloChartOption}
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

export default KilosComponent;