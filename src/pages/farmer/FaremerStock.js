import React from "react";
import APIHandler from "../../utils/APIHandler";
import { Link } from "react-router-dom";

class FarmerStock extends React.Component {

    state = {
        errorRes: false,
        errorMessage: "",
        StockDataList: [],
        filteredData: [],
        searchTerm: "",
        dataLoaded:false
    }

    componentDidMount() {
        this.fetchStockData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.StockDataList !== this.state.StockDataList) {
            this.searchData();
        }
        
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.searchData();
        }
    }

    searchData = () => {
        const { StockDataList, searchTerm } = this.state;
        const filteredData = StockDataList.filter(stock => {
            return stock.farmer.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        });
        this.setState({ filteredData });
    } 

    async fetchStockData() {
        var apihandler = new APIHandler();
        var stockdata = await apihandler.fetchAllStock();
        console.log(stockdata);
        this.setState({ StockDataList: stockdata.data.data });
        this.setState({ dataLoaded: true });
    }

    viewStockDetails = (stock_id) => {
        console.log(stock_id);
        console.log(this.props);
        this.props.history.push("/stockdetails/" + stock_id);
    }

    render() {
        const { filteredData } = this.state;
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

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                {this.state.dataLoaded === false ? (
                                    <div className="dot-opacity-loader">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                ) : ""}
                                <div className="card-body">
                                    <h4 className="card-title">Farmer Stock Timeline</h4>
                                    <p className="card-description">
                                        <div id="order-listing_filter" className="dataTables_filter">
                                            <Link to={"/addstock"}>
                                                <button type="button" className="btn btn-info btn-rounded btn-fw">
                                                    Add farmer stock<div className="ripple-container"></div>
                                                </button>
                                            </Link>
                                        </div>
                                    </p>

                                    <div className="mt-5">
                                        <div className="timeline">
                                            {filteredData.map((stock, index) => (
                                            <div
                                                className={
                                                index % 2 === 0
                                                    ? "timeline-wrapper timeline-wrapper-warning"
                                                    : "timeline-wrapper timeline-inverted timeline-wrapper-danger"
                                                }
                                                key={stock.id}
                                            >
                                                <div className="timeline-badge"></div>
                                                <div className="timeline-panel" onClick={() => this.viewStockDetails(stock.id)}>
                                                    <div className="timeline-heading">
                                                        <h6 className="timeline-title">{stock.farmer.name}</h6>
                                                    </div>
                                                    <div className="timeline-body">
                                                        <p>
                                                        {stock.in_stock} kgs of {stock.rice_type === 1 ? "Pishori" : "Komboka"} rice
                                                        </p>
                                                    </div>
                                                    <div className="timeline-footer d-flex align-items-center">
                                                        {/* <i className="mdi mdi-heart-outline text-muted mr-1"></i>
                                                        <span>{stock.in_stock}</span> */}
                                                        <span className="ml-auto font-weight-bold">
                                                        {new Date(stock.added_on).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
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

export default FarmerStock;