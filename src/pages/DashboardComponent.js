import React from "react";
import APIHandler from "../utils/APIHandler";
import CanvasJSReact from "../utils/canvasjs.react";
import { Link } from "react-router-dom";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        orders: 0,
        bill_count: 0,
        customer: 0,
        farmer: 0,
        profit: 0,
        buy_total: 0,
        orders_pending: 0,
        balance: 0,
        discount: 0,
        transport: 0,
        packaging: 0,
        rice: 0,
        kgs: 0,
        nairobi: 0,
        central: 0,
        coast: 0,
        nyanza: 0,
        western: 0,
        eastern: 0,
        north_eastern: 0,
        rift_valley: 0,
        overhead: 0,
        mpesa: 0,
        total_sales: 0,
        orders_complete: 0,
        profit_amt_today: 0,
        sell_amt_today: 0,
        dataPoints: [],
        profitChartOption: {},
        sellChartOption: {},
        yearChartOption: {},
        locationChartOption: {},
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
        this.setState({ orders: homedata.data.orders });
        this.setState({ bill_count: homedata.data.bill_count });
        this.setState({ customer: homedata.data.customer });
        this.setState({ farmer: homedata.data.farmer });
        this.setState({ discount: homedata.data.discount });
        this.setState({ transport: homedata.data.transport });
        this.setState({ packaging: homedata.data.packaging });
        this.setState({ profit: homedata.data.profit });
        this.setState({ rice: homedata.data.rice });
        this.setState({ kgs: homedata.data.kgs });
        this.setState({ nairobi: homedata.data.nairobi });
        this.setState({ central: homedata.data.central });
        this.setState({ coast: homedata.data.coast });
        this.setState({ nyanza: homedata.data.nyanza });
        this.setState({ western: homedata.data.western });
        this.setState({ eastern: homedata.data.eastern });
        this.setState({ north_eastern: homedata.data.north_eastern });
        this.setState({ rift_valley: homedata.data.rift_valley });
        this.setState({ overhead: homedata.data.overhead });
        this.setState({ mpesa: homedata.data.mpesa });
        this.setState({ buy_total: homedata.data.buy_total });
        this.setState({ orders_pending: homedata.data.orders_pending });
        this.setState({ orders_complete: homedata.data.orders_complete });
        this.setState({ profit_amt_today: homedata.data.profit_amt_today });
        this.setState({ sell_amt_today: homedata.data.sell_amt_today });
        this.setState({ balance: homedata.data.balance });
       
        let selldatalist = [];
        for (let i = 0; i < homedata.data.month_chart.length; i++) {
            selldatalist.push({
                x: new Date(homedata.data.month_chart[i].date),
                y: homedata.data.month_chart[i].amt,
            });
        }

        let yeardatalist = [];
        for (let i = 0; i < homedata.data.year_total.length; i++) {
            yeardatalist.push({
                x: new Date(homedata.data.year_total[i].date),
                y: homedata.data.year_total[i].amt,
            });
        }

        let profitdatalist = [];
        for (let i = 0; i < homedata.data.year_profit.length; i++) {
            profitdatalist.push({
                x: new Date(homedata.data.year_profit[i].date),
                y: homedata.data.year_profit[i].amt,
            });
        }

        let discountdatalist = [];
        for (let i = 0; i < homedata.data.year_discount.length; i++) {
            discountdatalist.push({
                x: new Date(homedata.data.year_discount[i].date),
                y: homedata.data.year_discount[i].amt,
            });
        }

        let farmerdatalist = [];
        for (let i = 0; i < homedata.data.year_farmer.length; i++) {
            farmerdatalist.push({
                x: new Date(homedata.data.year_farmer[i].date),
                y: homedata.data.year_farmer[i].amt,
            });
        }

        this.state.sellChartOption = {
            animationEnabled: true,
            title: {
                text: "",
            },
            axisX: {
                valueFormatString: " ",
            },
            axisY: {
                title: " ",
                prefix: "Ksh",
            },
            data: [
                {
                    yValueFormatString: "Ksh #,###",
                    xValueFormatString: "MMMM YYYY",
                    type: "column",
                    dataPoints: selldatalist,
                },
            ],
        };

        this.state.yearChartOption = {
            animationEnabled: true,
            title: {
                text: "",
            },
            axisX: {
                valueFormatString: " ",
            },
            axisY: {
                title: " ",
                prefix: "Ksh ",
            },
            data: [
                { 
                    yValueFormatString: "Ksh #,###",
                    xValueFormatString: "YYYY",
                    type: "column",
                    name: "Gross sales",
                    showInLegend: true,
                    dataPoints: yeardatalist,
                },
                {
                    yValueFormatString: "Ksh #,###",
                    xValueFormatString: "YYYY",
                    type: "column",
                    name: "Paid farmers",
                    showInLegend: true,
                    dataPoints: farmerdatalist,
                },
                {
                    yValueFormatString: "Ksh #,###",
                    xValueFormatString: "YYYY",
                    type: "column",
                    name: "Gross profit",
                    showInLegend: true,
                    dataPoints: profitdatalist,
                },
                {
                    yValueFormatString: "Ksh #,###",
                    xValueFormatString: "YYYY",
                    type: "column",
                    name: "Discount",
                    showInLegend: true,
                    dataPoints: discountdatalist,
                }  
            ],
        };

        this.state.locationChartOption = {
            animationEnabled: true,
            title: {
				text: "Customer Location"
			},
			subtitles: [{
				text: "KENYA",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
            data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###",
				dataPoints: [
					{ name: "Nyanza", y: homedata.data.nyanza },
					{ name: "Central", y: homedata.data.central },
					{ name: "Nairobi", y: homedata.data.nairobi },
					{ name: "Eastern", y: homedata.data.eastern },
                    { name: "Rift Valley", y: homedata.data.rift_valley },
                    { name: " North Eastern", y: homedata.data.north_eastern },
                    { name: "Coast", y: homedata.data.coast },
					{ name: "Western", y: homedata.data.western }
				]
			}]
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
                            <h3 className="page-title">DASHBOARD</h3>
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
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                <div className="card mdc-card info-card info-card--success">
                                    <div className="card-inner">
                                        <p className="card-text mb-0 text-dark">GROSS SALES</p>
                                        <h5 className="font-weight-medium text-dark pb-2 mb-1 border-bottom">
                                            Ksh {this.state.buy_total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                        </h5>
                                        <p className="text-small text-muted"></p>
                                        <div className="card-icon-wrapper">
                                            <i className="mdi mdi-chart-bar"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                <div className="card mdc-card info-card info-card--danger">
                                    <div className="card-inner">
                                        <p className="card-text mb-0 text-dark">GROSS PROFIT</p>
                                        <h5 className="font-weight-medium text-dark pb-2 mb-1 border-bottom">
                                            Ksh {this.state.profit.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}
                                        </h5>
                                        <p className="text-small text-muted"></p>
                                        <div className="card-icon-wrapper">
                                            <Link to={"/profit"}>
                                                <i className="mdi mdi-trending-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                <div className="card mdc-card info-card info-card--primary">
                                    <div className="card-inner">
                                        <p className="card-text mb-0 text-dark">PAID TO FARMERS</p>
                                        <h5 className="font-weight-medium text-dark pb-2 mb-1 border-bottom">
                                            Ksh {this.state.rice.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}
                                        </h5>
                                        <p className="text-small text-muted"></p>
                                        <div className="card-icon-wrapper">
                                            <Link to={"/paidfarmers"}>
                                                <i className="mdi mdi-leaf"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                <div className="card mdc-card info-card info-card--info">
                                    <div className="card-inner">
                                        <p className="card-text mb-0 text-dark">TOTAL OVERHEAD</p>
                                        <h5 className="font-weight-medium text-dark pb-2 mb-1 border-bottom">
                                            Ksh {this.state.overhead.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                        </h5>
                                        <p className="text-small text-muted"></p>
                                        <div className="card-icon-wrapper">
                                            <Link to={"/overhead"}>
                                                <i className="mdi mdi-truck-delivery"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
						
						<div className="row">
							<div className="col-12 grid-margin">
								<div className="card card-statistics">
								  <div className="row">
									<div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
									  <div className="card-body">
										<div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                            <Link to={"/discount"}>
                                                <i className="mdi mdi-wallet text-primary mr-0 mr-sm-4 icon-lg"></i>
                                            </Link>
										  <div className="wrapper text-center text-sm-left">
											<p className="card-text mb-0 text-dark">TOTAL DICOUNT</p>
											<div className="fluid-container">
											  <h3 className="mb-0 font-weight-medium text-dark">
												Ksh {this.state.discount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
											  </h3>
											</div>
										  </div>
										</div>
									  </div>
									</div>
									<div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
									  <div className="card-body">
										<div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                          <Link to={"/total"}>
                                            <i className="mdi mdi-checkbox-marked-circle-outline text-primary mr-0 mr-sm-4 icon-lg"></i>
                                         </Link>
										  <div className="wrapper text-center text-sm-left">
											<p className="card-text mb-0 text-dark">TOTAL PAID</p>
											<div className="fluid-container">
											  <h3 className="mb-0 font-weight-medium text-dark">
												Ksh {this.state.mpesa.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
											  </h3>
											</div>
										  </div>
										</div>
									  </div>
									</div>
									<div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
									  <div className="card-body">
										<div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                            <Link to={"/kilos"}>
                                                <i className="mdi mdi-scale text-primary mr-0 mr-sm-4 icon-lg"></i>
                                            </Link>
										  <div className="wrapper text-center text-sm-left">
											<p className="card-text mb-0 text-dark">TOTAL KILOS</p>
											<div className="fluid-container">
											  <h3 className="mb-0 font-weight-medium text-dark">
												{this.state.kgs.toLocaleString(navigator.language, { minimumFractionDigits: 2 })} Kgs
											  </h3>
											</div>
										  </div>
										</div>
									  </div>
									</div>
									<div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
									  <div className="card-body">
										<div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                                          <Link to={"balance"}>
                                           <i className="mdi mdi-target text-primary mr-0 mr-sm-4 icon-lg"></i>
                                          </Link>  
										  
										  <div className="wrapper text-center text-sm-left">
											<p className="card-text mb-0 text-dark">BALANCE</p>
											<div className="fluid-container">
											  <h3 className="mb-0 font-weight-medium text-dark">
												Ksh {this.state.balance.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
											  </h3>
											</div>
										  </div>
										</div>
									  </div>
									</div>
									</div>
								  </div>
								</div>
						</div> 

                        <div className="row">
                            <div className="col-sm-8 stretch-card grid-margin">
                                <div className="card mdc-card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h4 className="card-title mb-2 mb-sm-0">Monthly Sales</h4>
                                            <div className="d-flex justtify-content-between align-items-center">
                                                <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                                <i className="mdi mdi-dots-vertical options-icon"></i>
                                            </div>
                                        </div>
                                        <div className="d-block d-sm-flex justify-content-between align-items-center">
                                            <h6 className="card-sub-title mb-0">Total Monthly Sales</h6>
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
                                                options={this.state.sellChartOption}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4 stretch-card grid-margin">
                                <div className="card mdc-card">
									<div className="card-body">
										<div className="d-flex d-lg-block d-xl-flex justify-content-between">
											<div>
												<h4 className="card-title">Customers Per Region</h4>
												<h6 className="card-sub-title">Customers {this.state.customer}</h6>
											</div>
											<div id="sales-legend" className="d-flex flex-wrap"></div>
											</div>
											<div className="chart-container mt-4">
                                                <div className="card mdc-card p-0 product-list">
                                                    <div className="card-body">
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">Nairobi</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.nairobi}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">Central</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.central}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">Eastern</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.eastern}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">Rift Valley</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.rift_valley}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">Coast</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.coast}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">Nyanza</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.nyanza}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">Western</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.western}
                                                            </div>
                                                        </div>
                                                        <div className="product-list-item">
                                                            <div className="d-flex align-items-center">
                                                                <div className="ml-3">
                                                                    <h5 className="font-weight-medium mb-0">North Eastern</h5>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {this.state.north_eastern}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
											</div>
										</div>
									</div>
								</div>
							</div>

                        <div className="row">
                            <div className="col-sm-6 stretch-card grid-margin">
                                <div className="card mdc-card bg-success text-white">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                    <h3 className="font-weight-normal">TOTAL FARMERS</h3>
                                    <i className="mdi mdi-dots-vertical options-icon text-white"></i>
                                    </div>
                                    <div className="row">
                                    <div className="col-sm-4 stretch-card grid-margin">
                                        <div>
                                        <h5 className="font-weight-normal mt-2">Farmers in database {this.state.farmer}</h5>
                                        <h2 className="font-weight-normal mt-3 mb-0">
											{this.state.farmer}
										</h2>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 stretch-card grid-margin">
                                        <canvas id="impressions-chart" height="80"></canvas>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6 stretch-card grid-margin">
                                <div className="card mdc-card bg-info text-white">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                    <h3 className="font-weight-normal">TOTAL CUSTOMERS</h3>
                                    <i className="mdi mdi-dots-vertical options-icon text-white"></i>
                                    </div>
                                    <div className="row">
                                    <div className="col-sm-4 stretch-card grid-margin">
                                        <div>
                                        <h5 className="font-weight-normal mt-2">Customers in database {this.state.customer}</h5>
                                        <h2 className="font-weight-normal mt-3 mb-0">{this.state.customer}</h2>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 stretch-card grid-margin">
                                        <canvas id="traffic-chart" height="80"></canvas>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
						
						<div className="row">
                            <div className="col-sm-8 stretch-card grid-margin">
                                <div className="card mdc-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="card-title mb-2 mb-sm-0">Yearly Transactions</h4>
                                    <div className="d-flex justtify-content-between align-items-center">
                                        <p className="d-none d-sm-block text-muted text-small mb-0 mr-2"></p>
                                        <i className="mdi mdi-dots-vertical options-icon"></i>
                                    </div>
                                    </div>
                                    <div className="d-block d-sm-flex justify-content-between align-items-center">
                                    <h6 className="card-sub-title mb-0">Total Yearly Transactions</h6>
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
                                            options = {this.state.yearChartOption}
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>
							
                            <div className="col-sm-4 stretch-card grid-margin">
                                <div className="card mdc-card">
									<div className="card-body">
										<div className="d-flex d-lg-block d-xl-flex justify-content-between">
											<div>
												<h4 className="card-title">Location</h4>
												
											</div>
											<div id="sales-legend" className="d-flex flex-wrap"></div>
											</div>
											<div className="chart-container mt-4">
                                                <CanvasJSChart
                                                    options={this.state.locationChartOption}
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

export default DashboardComponent;

