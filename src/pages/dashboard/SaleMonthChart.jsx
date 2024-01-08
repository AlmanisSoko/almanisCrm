import React from 'react'
import MonthlySalesChart from '../../components/charts/MonthlySalesChart'

function SaleMonthChart() {
    return (
        <div className="row mt-4">
            <div className="col-lg-7 mb-4 mb-lg-0">
                <div className="card z-index-2 h-100">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <h6 className="text-capitalize">Sales overview</h6>
                        <p className="text-sm mb-0">
                            <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                            <span className="font-weight-bold">4% more</span> in 2021
                        </p>
                    </div>
                    <div className="card-body p-3">
                        <div className="chart">
                            <MonthlySalesChart className="chart-canvas" height="100" width="3992" style={{display: "block", boxSizing: "border-box", height: "300px", width: "1996.2px"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleMonthChart
