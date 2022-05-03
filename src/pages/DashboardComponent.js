import React from "react";
import APIHandler from "../utils/APIHandler";
import CanvasJSReact from "../utils/canvasjs.react";
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
        profit_total: 0,
        buy_total: 0,
        orders_pending: 0,
        orders_complete: 0,
        profit_amt_today: 0,
        sell_amt_today: 0,
        dataPoints: [],
        profitChartOption: {},
        sellChartOption: {},
    }

    // works when our page is ready
    componentDidMount() {
        this.fetchHomePage();
    }

    async fetchHomePage() {
        var apihanler = new APIHandler();
        var homedata = await apihanler.fetchHomePage();
        console.log(homedata);
        this.setState({ orders: homedata.data.orders });
        this.setState({ bill_count: homedata.data.bill_count });
        this.setState({ customer: homedata.data.customer });
        this.setState({ farmer: homedata.data.farmer });
        this.setState({ profit_total: homedata.data.profit_total });
        this.setState({ buy_total: homedata.data.buy_total });
        this.setState({ orders_pending: homedata.data.orders_pending });
        this.setState({ orders_complete: homedata.data.orders_complete });
        this.setState({ profit_amt_today: homedata.data.profit_amt_today });
        this.setState({ sell_amt_today: homedata.data.sell_amt_today });
       // this.setState({ dataLoaded: true });

    var profitdatalist = [];
    for (var i = 0; i < homedata.data.profit_chart.length; i++) {
      profitdatalist.push({
        x: new Date(homedata.data.profit_chart[i].date),
        y: homedata.data.profit_chart[i].amt,
      });
    }
    var selldatalist = [];
    for (var i = 0; i < homedata.data.sell_chart.length; i++) {
      selldatalist.push({
        x: new Date(homedata.data.sell_chart[i].date),
        y: homedata.data.sell_chart[i].amt,
      });
    }

    this.state.profitChartOption = {
      animationEnabled: true,
      title: {
        text: "Total Profit Chart",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "Profit ",
        prefix: "Ksh",
      },
      data: [
        {
          yValueFormatString: "Ksh#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: profitdatalist,
        },
      ],
    };
    this.state.sellChartOption = {
      animationEnabled: true,
      title: {
        text: "Total Sell Chart",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "Sales ",
        prefix: "Ksh",
      },
      data: [
        {
          yValueFormatString: "Ksh#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: selldatalist,
        },
      ],
    };
    this.setState({});
  }


    render() {
        return (
          <section className="content">
            <div className="container-fluid">
              <div className="block-header">
                <h2>DASHBOARD</h2>
              </div>
            </div>  

            <div className="row clearfix">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">add_shopping_cart</i>
                        </div>
                        <div className="content">
                            <div className="text">TOTAL REQUESTS</div>
                            <div className="number count-to" data-from="0" data-to="125" data-speed="15" data-fresh-interval="20">
                                {this.state.orders}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">account_balance</i>
                        </div>
                        <div className="content">
                            <div className="text">TOTAL SALES</div>
                            <div className="number count-to" data-from="0" data-to="257" data-speed="1000" data-fresh-interval="20">
                               {this.state.bill_count}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-light-green hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">account_box</i>
                        </div>
                        <div className="content">
                            <div className="text">TOTAL CUSTOMERS</div>
                            <div className="number count-to" data-from="0" data-to="243" data-speed="1000" data-fresh-interval="20">
                                {this.state.customer}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">spa</i>
                        </div>
                        <div className="content">
                            <div className="text">TOTAL FARMERS</div>
                            <div className="number count-to" data-from="0" data-to="1225" data-speed="1000" data-fresh-interval="20">
                               {this.state.farmer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row clearfix">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-pink hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">playlist_add_check</i>
                        </div>
                        <div className="content">
                            <div className="text">TODAY SALES AMOUNT</div>
                            <div className="number count-to" data-from="0" data-to="125" data-speed="15" data-fresh-interval="20">
                                {this.state.sell_amt_today}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-cyan hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">account_balance_wallet</i>
                        </div>
                        <div className="content">
                            <div className="text">TOTAL SALES AMOUNT</div>
                            <div className="number count-to" data-from="0" data-to="257" data-speed="1000" data-fresh-interval="20">
                                {this.state.buy_total}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-light-green hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">assignment_turned_in</i>
                        </div>
                        <div className="content">
                            <div className="text">COMPLETED REQUESTS</div>
                            <div className="number count-to" data-from="0" data-to="243" data-speed="1000" data-fresh-interval="20">
                                {this.state.orders_complete}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box bg-orange hover-expand-effect">
                        <div className="icon">
                            <i className="material-icons">assignment_late</i>
                        </div>
                        <div className="content">
                            <div className="text">PENDING REQUESTS</div>
                            <div className="number count-to" data-from="0" data-to="1225" data-speed="1000" data-fresh-interval="20">
                                {this.state.orders_pending}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="card">
                    <div className="header">
                    <h2>Sell Chart</h2>
                    </div>
                    <div className="body">
                    <CanvasJSChart
                        options={this.state.sellChartOption}
                        /* onRef={ref => this.chart = ref} */
                    />
                    </div>
                </div>
                </div>
            </div>

          </section>
        )  
    }    
}

export default DashboardComponent;
