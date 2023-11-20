import React from "react";
import APIHandler from "../../utils/APIHandler";
import CanvasJSReact from "../../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class OverHeadComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        packaging: 0,
        transport: 0,
        rider: 0,
        packaging_today: 0,
        transport_today: 0,
        rider_today: 0,
        transportChartOption: {},
        packagingChartOption: {},
        riderChartOption: {},
        dataLoaded: false,
    }

    // works when our page is ready
    componentDidMount() {
        this.fetchHomePage();
    } 
  
    async fetchHomePage() {
        let apihandler = new APIHandler();
        let homedata = await apihandler.fetchHomePage();
        console.log(homedata);
        this.setState({ transport: homedata.data.transport });
        this.setState({ packaging: homedata.data.packaging });
        this.setState({ rider: homedata.data.rider });
        this.setState({ packaging_today: homedata.data.packaging_today });
        this.setState({ transport_today: homedata.data.transport_today });
        this.setState({ rider_today: homedata.data.rider_today });

        let transportdatalist = [];
        for (let i = 0; i < homedata.data.year_transport_chart.length; i++) {
            transportdatalist.push({
                x: new Date(homedata.data.year_transport_chart[i].date),
                y: homedata.data.year_transport_chart[i].amt,
            });
        }

        let packagingdatalist = [];
        for (let i = 0; i < homedata.data.year_packaging_chart.length; i++) {
            packagingdatalist.push({
                x: new Date(homedata.data.year_packaging_chart[i].date),
                y: homedata.data.year_packaging_chart[i].amt,
            });
        }

        let riderdatalist = [];
        for (let i = 0; i < homedata.data.year_rider_chart.length; i++) {
            riderdatalist.push({
                x: new Date(homedata.data.year_rider_chart[i].date),
                y: homedata.data.year_rider_chart[i].amt,
            });
        }

        this.state.transportChartOption = {
            animationEnabled: true,
            title: {
              text: "",
            },
            axisX: {
              valueFormatString: "YYYY",
            },
            axisY: {
              title: " ",
              prefix: "Ksh",
            },
            data: [
              {
                yValueFormatString: "Ksh #,###",
                xValueFormatString: "YYYY",
                type: "column",
                dataPoints: transportdatalist,
              },
            ],
        };

        this.state.packagingChartOption = {
            animationEnabled: true,
            title: {
              text: "",
            },
            axisX: {
              valueFormatString: "YYYY",
            },
            axisY: {
              title: " ",
              prefix: "Ksh",
            },
            data: [
              {
                yValueFormatString: "Ksh #,###",
                xValueFormatString: "YYYY",
                type: "column",
                dataPoints: packagingdatalist,
              },
            ],
        };

        this.state.riderChartOption = {
            animationEnabled: true,
            title: {
              text: "",
            },
            axisX: {
              valueFormatString: "YYYY",
            },
            axisY: {
              title: " ",
              prefix: "Ksh",
            },
            data: [
              {
                yValueFormatString: "Ksh #,###",
                xValueFormatString: "YYYY",
                type: "column",
                dataPoints: riderdatalist,
              },
            ],
        };
        this.setState({});
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
                        <h3 className="page-title">OVERHEAD</h3>
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

                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card aligner-wrapper">
                                <div className="card-body">
                                    <div className="absolute left top bottom h-100 v-strock-2 bg-success"></div>
                                    <p className="mb-2 text-dark">Total Transport</p>
                                    <div className="d-flex align-items-center">
                                        <h1 className="font-weight-medium mb-2 text-dark">Ksh {this.state.transport.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                                        <h5 className="font-weight-medium text-success ml-2"></h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-success dot-indicator"></div>
                                        <p className="text-muted mb-0 ml-2">Today transport {this.state.transport_today.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Ksh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card aligner-wrapper">
                                <div className="card-body">
                                    <div className="absolute left top bottom h-100 v-strock-2 bg-primary"></div>
                                    <p className="mb-2 text-dark">Total Packaging</p>
                                    <div className="d-flex align-items-center">
                                        <h1 className="font-weight-medium mb-2 text-dark">Ksh {this.state.packaging.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                                        <h5 className="font-weight-medium text-success ml-2"></h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary dot-indicator"></div>
                                        <p className="text-muted mb-0 ml-2">Today packaging {this.state.packaging_today.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Ksh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card aligner-wrapper">
                                <div className="card-body">
                                    <div className="absolute left top bottom h-100 v-strock-2 bg-primary"></div>
                                    <p className="mb-2 text-dark">Total Rider</p>
                                    <div className="d-flex align-items-center">
                                        <h1 className="font-weight-medium mb-2 text-dark">Ksh {this.state.rider.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                                        <h5 className="font-weight-medium text-success ml-2"></h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary dot-indicator"></div>
                                        <p className="text-muted mb-0 ml-2">Today rider {this.state.rider_today.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Ksh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-sm-6 stretch-card grid-margin">
                            <div className="card mdc-card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                <h4 className="card-title mb-2 mb-sm-0">Yearly Packaging</h4>
                                <div className="d-flex justtify-content-between align-items-center">
                                    <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                    <i className="mdi mdi-dots-vertical options-icon"></i>
                                </div>
                                </div>
                                <div className="d-block d-sm-flex justify-content-between align-items-center">
                                <h6 className="card-sub-title mb-0">Total Yearly Packaging</h6>
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
                                    options={this.state.packagingChartOption}
                                    /* onRef={ref => this.chart = ref} */
                                />
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="col-sm-6 stretch-card grid-margin">
                            <div className="card mdc-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="card-title mb-2 mb-sm-0">Yearly Transport</h4>
                                    <div className="d-flex justtify-content-between align-items-center">
                                        <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                        <i className="mdi mdi-dots-vertical options-icon"></i>
                                    </div>
                                    </div>
                                    <div className="d-block d-sm-flex justify-content-between align-items-center">
                                    <h6 className="card-sub-title mb-0">Total Yearly Transport</h6>
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
                                        options={this.state.transportChartOption}
                                        /* onRef={ref => this.chart = ref} */
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 stretch-card grid-margin">
                            <div className="card mdc-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="card-title mb-2 mb-sm-0">Yearly Rider</h4>
                                    <div className="d-flex justtify-content-between align-items-center">
                                        <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                        <i className="mdi mdi-dots-vertical options-icon"></i>
                                    </div>
                                    </div>
                                    <div className="d-block d-sm-flex justify-content-between align-items-center">
                                    <h6 className="card-sub-title mb-0">Total Yearly Rider</h6>
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
                                        options={this.state.riderChartOption}
                                        /* onRef={ref => this.chart = ref} */
                                    />
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

export default OverHeadComponent;