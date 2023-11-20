import React from "react";
import APIHandler from "../../utils/APIHandler";
import CanvasJSReact from "../../utils/canvasjs.react";
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
        inhouse_transport: 0,
        others_transport: 0,
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
        this.fetchMonthlyChart();
        this.fetchCustomerRegion();
        this.fetchPage();
        this.fetchPayment();
        this.fetchDiscount();
        this.fetchKilos();
        this.fetchYearlyChart();
        this.fetchDashboard();
    }

    async fetchHomePage() {
        let apihandler = new APIHandler();
        let homedata = await apihandler.fetchHomePage();
        console.log(homedata);
        this.setState({ customer: homedata.data.customer });
        this.setState({ farmer: homedata.data.farmer });
        this.setState({ inhouse_transport: homedata.data.inhouse_transport });
        this.setState({ others_transport: homedata.data.others_transport });
        this.setState({ transport: homedata.data.transport });
        this.setState({ packaging: homedata.data.packaging });
        this.setState({});
        this.setState({ dataLoaded: true });
    }

    async fetchDashboard() {
        let apihandler = new APIHandler();
        let dashboard = await apihandler.fetchDashboard();
        console.log(dashboard);
        this.setState({ buy_total: dashboard.data.buy_total });
        this.setState({ rice: dashboard.data.rice });
        this.setState({ profit: dashboard.data.profit });
        this.setState({ overhead: dashboard.data.overhead });
        this.setState({ transport: dashboard.data.transport });
    }

    async fetchMonthlyChart() {
        
        let apihandler = new APIHandler();
        let monthdata = await apihandler.monthlyData();
        console.log(monthdata)

        let selldatalist = [];
        for (let i = 0; i < monthdata.data.month_chart.length; i++) {
            selldatalist.push({
                x: new Date(monthdata.data.month_chart[i].date),
                y: monthdata.data.month_chart[i].amt,
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
        this.setState({});
    }

    async fetchYearlyChart() {
        
        let apihandler = new APIHandler();
        let yeardata = await apihandler.yearlyData();
        console.log(yeardata)

        let yeardatalist = [];
        for (let i = 0; i < yeardata.data.year_total.length; i++) {
            yeardatalist.push({
                x: new Date(yeardata.data.year_total[i].date),
                y: yeardata.data.year_total[i].amt,
            });
        }
        
        let profitdatalist = [];
        for (let i = 0; i < yeardata.data.year_profit.length; i++) {
            profitdatalist.push({
                x: new Date(yeardata.data.year_profit[i].date),
                y: yeardata.data.year_profit[i].amt,
            });
        }

        let discountdatalist = [];
        for (let i = 0; i < yeardata.data.year_discount.length; i++) {
            discountdatalist.push({
                x: new Date(yeardata.data.year_discount[i].date),
                y: yeardata.data.year_discount[i].amt,
            });
        }

        let farmerdatalist = [];
        for (let i = 0; i < yeardata.data.year_farmer.length; i++) {
            farmerdatalist.push({
                x: new Date(yeardata.data.year_farmer[i].date),
                y: yeardata.data.year_farmer[i].amt,
            });
        }

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
        this.setState({});
    }

    async fetchCustomerRegion() {
        
        let apihandler = new APIHandler();
        let regiondata = await apihandler.customersRegion();
        console.log(regiondata)

        this.setState({ nairobi: regiondata.data.nairobi });
        this.setState({ central: regiondata.data.central });
        this.setState({ coast: regiondata.data.coast });
        this.setState({ nyanza: regiondata.data.nyanza });
        this.setState({ western: regiondata.data.western });
        this.setState({ eastern: regiondata.data.eastern });
        this.setState({ north_eastern: regiondata.data.north_eastern });
        this.setState({ rift_valley: regiondata.data.rift_valley });   

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
					{ name: "Nyanza", y: regiondata.data.nyanza },
					{ name: "Central", y: regiondata.data.central },
					{ name: "Nairobi", y: regiondata.data.nairobi },
					{ name: "Eastern", y: regiondata.data.eastern },
                    { name: "Rift Valley", y: regiondata.data.rift_valley },
                    { name: " North Eastern", y: regiondata.data.north_eastern },
                    { name: "Coast", y: regiondata.data.coast },
					{ name: "Western", y: regiondata.data.western }
				]
			}]
        };
        this.setState({});
    }

    async fetchPage() {
        var apihandler = new APIHandler();
        var balancedata = await apihandler.fetchUnderPaid();
        console.log(balancedata);
        this.setState({ total_positive_balance: balancedata.data.total_balance });
    }

    async fetchPayment() {
        var apihandler = new APIHandler();
        var paymentdata = await apihandler.fetchTotalPaid();
        console.log(paymentdata);
        this.setState({ total_paid: paymentdata.data.total_payments });
    }

    async fetchDiscount() {
        var apihandler = new APIHandler();
        var discountdata = await apihandler.fetchTotalDiscount();
        console.log(discountdata);
        this.setState({ total_discount: discountdata.data.total_discount });
    }

    async fetchKilos() {
        var apihandler = new APIHandler();
        var kilosdata = await apihandler.fetchTotalKilos();
        console.log(kilosdata);
        this.setState({ total_kgs: kilosdata.data.total_kgs });
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
                                            {Number(this.state.buy_total).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                            {Number(this.state.profit).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                            {Number(this.state.rice).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                            {Number(this.state.overhead).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                                {Number(this.state.total_discount).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
												{Number(this.state.total_paid).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 2 })}
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
                                              {Number(this.state.total_kgs).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kgs'}

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
												
                                                {Number(this.state.total_positive_balance).toLocaleString('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 2 })}
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
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card aligner-wrapper">
                                    <div className="card-body">
                                        <div className="absolute left top bottom h-100 v-strock-2 bg-primary"></div>
                                        <p className="mb-2 text-dark">Total Others Transport</p>
                                        <div className="d-flex align-items-center">
                                            <h1 className="font-weight-medium mb-2 text-dark">Ksh {this.state.others_transport}</h1>
                                            <h5 className="font-weight-medium text-success ml-2"></h5>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary dot-indicator"></div>
                                            <p className="text-muted mb-0 ml-2">Total Others {this.state.others_transport} Ksh</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card aligner-wrapper">
                                    <div className="card-body">
                                        <div className="absolute left top bottom h-100 v-strock-2 bg-primary"></div>
                                        <p className="mb-2 text-dark">Total Inhouse Transport</p>
                                        <div className="d-flex align-items-center">
                                            <h1 className="font-weight-medium mb-2 text-dark">Ksh {this.state.inhouse_transport}</h1>
                                            <h5 className="font-weight-medium text-success ml-2"></h5>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary dot-indicator"></div>
                                            <p className="text-muted mb-0 ml-2">Total Inhouse {this.state.inhouse_transport} Ksh</p>
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

