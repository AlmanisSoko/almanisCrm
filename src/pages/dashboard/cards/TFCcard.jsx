import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHomePage } from '../../../actions/auth';

const TFCcard = ({ isAuthenticated, fetchHomePage }) => {
    const navigate = useNavigate();

    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalFarmers, setTotalFarmer] = useState(0);
    const [inhouseTransport, setInhouse] = useState(0);
    const [othersTransport, setOthersTransport] = useState(0);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }

        fetchHomePage().then((response) => {
            setTotalCustomers(response.customer);
            setTotalFarmer(response.farmer);
            setInhouse(response.inhouse_transport);
            setOthersTransport(response.others_transport)
        });

    }, [isAuthenticated, navigate, fetchHomePage]);

    return (
        <div className="row">
            <div className="col-xl-12  mt-xl-0 mt-4">

                <div className="row mt-4">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h1 className="text-gradient text-primary">
                                    <span id="status1" countto="21">{totalCustomers}</span> 
                                    <span className="text-lg ms-n2"></span>
                                </h1>
                                <h6 className="mb-0 font-weight-bolder">Customers</h6>
                                <p className="opacity-8 mb-0 text-sm"></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h1 className="text-gradient text-primary"> 
                                    <span id="status2" countto="44">{totalFarmers}</span> 
                                    <span className="text-lg ms-n1"></span>
                                </h1>
                                <h6 className="mb-0 font-weight-bolder">Farmers</h6>
                                <p className="opacity-8 mb-0 text-sm"></p>
                            </div>
                        </div>
                    </div>
                
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h1 className="text-gradient text-primary">
                                    <span id="status3" countto="87">
                                        {inhouseTransport}
                                    </span> 
                                    <span className="text-lg ms-n2"></span>
                                </h1>
                                <h6 className="mb-0 font-weight-bolder">Inhouse Transport</h6>
                                <p className="opacity-8 mb-0 text-sm"></p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h1 className="text-gradient text-primary">
                                    <span id="status4" countto="417">{othersTransport}</span> 
                                    <span className="text-lg ms-n2"></span>
                                </h1>
                                <h6 className="mb-0 font-weight-bolder">Other Transport</h6>
                                <p className="opacity-8 mb-0 text-sm"></p>
                            </div>
                        </div>
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
        fetchHomePage: () => dispatch(fetchHomePage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TFCcard);