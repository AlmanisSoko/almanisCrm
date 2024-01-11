import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import MonthlySalesChart from '../../components/charts/MonthlySalesChart'
import { fetchCustomerRegion } from '../../actions/auth';

const SaleMonthChart = ({ isAuthenticated, fetchCustomerRegion}) => {
    const navigate = useNavigate();

    const [nairobiCount, setNairobiCount] = useState(0)
    const [centralCount, setCentralCount] = useState(0)
    const [nyanzaCount, setNyanzaCount] = useState(0)
    const [westernCount, setWesternCount] = useState(0)
    const [coastCount, setCoastCount] = useState(0)
    const [easternCount, setEasternCount] = useState(0)
    const [northEasternCount, setNorthEasternCount] = useState(0)
    const [riftValleyCount, setRiftValleyCount] = useState(0)
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

        fetchCustomerRegion().then((response) => {
            setNairobiCount(response.nairobi);
            setCentralCount(response.central);
            setNyanzaCount(response.nyanza);
            setCoastCount(response.coast);
            setWesternCount(response.western);
            setEasternCount(response.eastern);
            setNorthEasternCount(response.north_eastern);
            setRiftValleyCount(response.rift_valley);
        });

    }, [isAuthenticated, navigate, fetchCustomerRegion])

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

            <div class="col-sm-5 mt-sm-0 mt-4">
                <div class="card h-100">
                    <div class="card-header pb-0 p-3">
                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="mb-0">Customer Location</h6>
                            </div>
                            <div class="col-md-6 d-flex justify-content-end align-items-center">
                                <i class="far fa-calendar-alt me-2" aria-hidden="true"></i>
                                <small>{currentDate.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                    })}
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="card-body p-3">
                        <ul class="list-group">
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-up" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Nairobi</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                            + {nairobiCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-up" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Central</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                            + {centralCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-up" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Eastern</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                            + {easternCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-up" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Rift Valley</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                            - {riftValleyCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-up" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Coast</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                            + {coastCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-up" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Nyanza</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                            - {nyanzaCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-up" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">Western</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-success text-gradient text-sm font-weight-bold ms-auto">
                                            - {westernCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                            <li class="list-group-item border-0 justify-content-between ps-0 pb-0 border-radius-lg">
                                <div class="d-flex">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center">
                                            <i class="fas fa-arrow-down" aria-hidden="true"></i>
                                        </button>
                                        <div class="d-flex flex-column">
                                            <h6 class="mb-1 text-dark text-sm">North Eastern</h6>
                                            <span class="text-xs"></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold ms-auto">
                                            - {northEasternCount}
                                    </div>
                                </div>
                                <hr class="horizontal dark mt-3 mb-2"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomerRegion: () => dispatch(fetchCustomerRegion()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleMonthChart)
