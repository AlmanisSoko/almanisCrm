import React from "react";
import APIHandler from "../utils/APIHandler";
import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Untitled extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        dataPoints: [],
        yearChartOption: {},
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

        let ticketdatalist = [];
        for (let i = 0; i < homedata.data.weekly_tickets.length; i++) {
            ticketdatalist.push({
                x: new Date(homedata.data.weekly_tickets[i].date),
                y: homedata.data.weekly_tickets[i].amt,
            });
        }

        let streamdatalist = [];
        for (let i = 0; i < homedata.data.year_profit.length; i++) {
            streamdatalist.push({
                x: new Date(homedata.data.year_profit[i].date),
                y: homedata.data.year_profit[i].amt,
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
                    type: "spline",
                    name: "Gross sales",
                    showInLegend: true,
                    dataPoints: ticketdatalist,
                },
                {
                    yValueFormatString: "Ksh #,###",
                    xValueFormatString: "YYYY",
                    type: "spline",
                    name: "Paid farmers",
                    showInLegend: true,
                    dataPoints: streamdatalist,
                }
            ],
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

export default Untitled;



// import React from "react";
// import APIHandler from "../utils/APIHandler";
// import swal from "sweetalert";

// class Untitled extends React.Component {

//     constructor(props) {
//         super(props);
//         this.formSubmit = this.formSubmit.bind(this);
//         this.formRef = React.createRef();
//     }

//     state = {
//         errorRes: false,
//         errorMessage: "",
//         btnMessage: 0,
//         sendData: false,
//         poster: null,
//         infotrailer: null,
//         play_casts: [
//             {image: "", real_name: "", cast_name: ""}
//         ],
//         play_offers: [
//             {bogof: "", other_offers: "", percentage: "", day: ""}
//         ],
//         dataLoaded: false,
//     };    

//     // async formSubmit(event) {
//     //     event.preventDefault();
//     //     this.setState({ btnMessage: 1 });
//     //     var apiHandler = new APIHandler();
//     //     // Create the casts array with image objects
//     //     const castsWithImages = this.state.play_casts.map(cast => ({
//     //         ...cast,
//     //         image: cast.image instanceof File ? cast.image : null
//     //     }));
        
//     //     var response = await apiHandler.savePlayData(
//     //         event.target.title.value,
//     //         event.target.synopsis.value,
//     //         event.target.poster.files[0],
//     //         event.target.infotrailer.files[0],
//     //         event.target.theater.value,
//     //         this.state.casts,
//     //         this.state.offers
//     //     );
//     //     console.log(response)
//     //     this.setState({ btnMessage: 0 });
//     //     this.setState({ errorRes: response.data.error });
//     //     this.setState({ errorMessage: response.data.message });
//     //     this.setState({ sendData: true });
//     //     if (this.state.errorRes === false &&
//     //         this.state.sendData === true) {
//     //           swal.fire('Saved!', '', 'success');
//     //          //window.location.reload();
//     //       }
            
//     //       if (this.state.errorRes === true &&
//     //         this.state.sendData === true) {
//     //           swal.fire('Oops!! Something went wrong', '', 'error')
//     //       }
//     //       this.formRef.current.reset();
//     // }
//    // Inside your formSubmit method
// async formSubmit(event) {
//     event.preventDefault();
//     this.setState({ btnMessage: 1 });
//     var apiHandler = new APIHandler();
    
//     // Create an array to hold cast members with their images
//     const castsWithImages = this.state.casts.map((play_casts) => ({
//         image: play_casts.image ? play_casts.image : null,
//         real_name: play_casts.real_name,
//         cast_name: play_casts.cast_name,
//         day: play_casts.day,
//         percentage: play_casts.percentage,
//         other_offers: play_casts.other_offers,
//     }));
    
//     var response = await apiHandler.savePlayData(
//         event.target.title.value,
//         event.target.synopsis.value,
//         event.target.poster.files[0],
//         event.target.infotrailer.files[0],
//         event.target.theater.value,
//         castsWithImages, // Use the updated array with images
//         this.state.offers
//     );
    
//     console.log(response);
//     this.setState({ btnMessage: 0 });
//     this.setState({ errorRes: response.data.error });
//     this.setState({ errorMessage: response.data.message });
//     this.setState({ sendData: true });
//     if (this.state.errorRes === false && this.state.sendData === true) {
//         swal.fire('Saved!', '', 'success');
//         //window.location.reload();
//     }
//     if (this.state.errorRes === true && this.state.sendData === true) {
//         swal.fire('Oops!! Something went wrong', '', 'error');
//     }
//     this.formRef.current.reset();
// }

    

//     AddCasts = () => {
//         this.state.play_casts.push({image: "", real_name: "", cast_name: ""});
//         this.setState({});
//       }; 
    
//       RemoveCasts = () => {
//         this.state.currentSrno = this.state.currentSrno - 1;
//         if (this.state.play_casts.length > 1) {
//           this.state.play_casts.pop();
//         }
//         this.setState({});
//       };

     

//     handleImageChange = (index, event) => {
//         const newCasts = [...this.state.play_casts];
//         newCasts[index].image = event.target.files[0]; // Assign the actual File object
//         this.setState({ play_casts: newCasts });
//     };
    
    
//     handleInputChange = (index, field, event) => {
//         const newCasts = [...this.state.play_casts];
//         newCasts[index][field] = event.target.value;
//         this.setState({ play_casts: newCasts });

//         const newOffers = [...this.state.play_offers];
//         newOffers[index][field] = event.target.value;
//         this.setState({ play_offers: newOffers })
//     };

//     handleDropdownChange = (index, field, event) => {
//         const newOffers = [...this.state.play_offers];
//         newOffers[index][field] = event.target.value;
//         this.setState({ play_offers: newOffers });
//     };    
    
//     handleFileChange = (event, index, field) => {
//         const { name, value } = event.target;
    
//         if (index !== null) {
//             const newCasts = [...this.state.play_casts];
//             newCasts[index][field] = value;
//             this.setState({ play_casts: newCasts });
//         } else {
//             this.setState({ [name]: event.target.files[0] });
//         }
//     };
    
    

//     render() {
//         return(
//             <div className="main-panel">
//                 <div className="content-wrapper">
//                     <div className="container-fluid">
//                         <div className="row">

//                             <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
//                             </div>
//                             <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
//                             </div>
//                             <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
//                             </div>
//                             <div className="col-xl-3 col-lg-6 stretch-card grid-margin">
                                
//                             </div>
//                         </div>
//                         <div className="page-header">
//                             <h3 className="page-title"> ADD FARMER</h3>
//                         </div>
//                         <div className="row">
//                             <div className="col-12 grid-margin">
//                                 <div className="card">
//                                 <div className="card-body">
//                                         <h4 className="card-title">Add Farmer</h4>
//                                         <form className="form-sample" onSubmit={this.formSubmit} ref={this.formRef}>
//                                             <p className="card-description">  </p>
                                            
//                                             <div className="row">
//                                                 <div className="col-md-6"> 
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Title</label>
//                                                         <input
//                                                         type="text"
//                                                         id="title"
//                                                         name="title"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                         required
//                                                         />
//                                                     </div>
//                                                 </div> 
                                                
//                                                 <div className="col-md-6"> 
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Synopsis: </label>
//                                                         <input
//                                                         type="textarea"
//                                                         id="synopsis"
//                                                         name="synopsis"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                         required
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-md-6"> 
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Poster: </label>
//                                                         <input
//                                                         type="file"
//                                                         id="poster"
//                                                         name="poster"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                        // onChange={(event) => this.handleFileChange(event, null, 'poster')}
//                                                         required
//                                                         />
//                                                     </div>
//                                                 </div>  

//                                                 <div className="col-md-6"> 
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >infotrailer: </label>
//                                                         <input
//                                                         type="file"
//                                                         id="infotrailer"
//                                                         name="infotrailer"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                        // onChange={(event) => this.handleFileChange(event, null, 'infotrailer')}
//                                                         required
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-md-6">
//                                                     <div className="form-group bmd-form-group is-filled">
//                                                         <label > Theater</label>
//                                                         <select id="theater" name="theater" className="form-control show-tick" required>
//                                                             <option value="">--- Select Theater ---</option>
//                                                             <option value="1">Alliance Fonce</option>
//                                                             <option value="2">Kenya National theater</option>
//                                                         </select>    
//                                                     </div>
//                                                 </div>

//                                             </div>  

//                                             {this.state.play_casts.map((item, index) => (
//                                             <div className="row" key={index}>

//                                                 <div className="col-lg-4">
//                                                     <div className="form-group bmd-form-group">
//                                                         <label>Image: </label>
//                                                         <input
//                                                             type="file"
//                                                             id="image"
//                                                             name="image"
//                                                             className="form-control"
//                                                             placeholder=""
//                                                             onChange={(event) => this.handleImageChange(index, event)}
//                                                         />
//                                                     </div>
//                                                 </div>


//                                                 <div className="col-lg-4">
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Real Name : </label>
//                                                         <input
//                                                         type="text"
//                                                         id="real_name"
//                                                         name="real_name"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                         value={item.real_name}
//                                                         onChange={(event) => this.handleInputChange(index, 'real_name', event)}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-lg-4">
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Cast Name : </label>
//                                                         <input
//                                                         type="text"
//                                                         id="cast_name"
//                                                         name="cast_name"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                         onChange={(event) => this.handleInputChange(index, 'cast_name', event)}
//                                                         value={item.cast_name}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             ))}

//                                             {this.state.play_offers.map((item, index) => (
//                                             <div className="row" key={index}>
                                                
//                                                 <div className="col-md-3">
//                                                     <div className="form-group bmd-form-group is-filled">
//                                                         <label>BOGOF</label>
//                                                         <select
//                                                             id="bogof"
//                                                             name="bogof"
//                                                             className="form-control show-tick"
//                                                             value={item.bogof}
//                                                             onChange={(event) => this.handleDropdownChange(index, 'bogof', event)}
//                                                             required
//                                                         >
//                                                             <option value="">--- Select Offer ---</option>
//                                                             <option value="1">Yes</option>
//                                                             <option value="2">No</option>
//                                                         </select>
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-lg-3">
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Other Offers : </label>
//                                                         <input
//                                                         type="text"
//                                                         id="other_offers"
//                                                         name="other_offers"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                         value={item.other_offers}
//                                                         onChange={(event) => this.handleInputChange(index, 'other_offers', event)}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-lg-3">
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Percentage : </label>
//                                                         <input
//                                                         type="text"
//                                                         id="percentage"
//                                                         name="percentage"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                         value={item.percentage}
//                                                         onChange={(event) => this.handleInputChange(index, 'percentage', event)}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                                 <div className="col-lg-3">
//                                                     <div className="form-group bmd-form-group">
//                                                     <label >Day : </label>
//                                                         <input
//                                                         type="date"
//                                                         id="day"
//                                                         name="day"
//                                                         className="form-control"
//                                                         placeholder=""
//                                                         value={item.day}
//                                                         onChange={(event) => this.handleInputChange(index, 'day', event)}
//                                                         />
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                             ))}
                                            
//                                             <br/>
//                                             <div className="row">
//                                                 <div className="col-lg-6">
//                                                 <button
//                                                     className="btn btn-block btn-success"
//                                                     type="button"
//                                                     onClick={this.AddCasts}
//                                                 >
//                                                     ADD CAST
//                                                 </button>
//                                                 </div>
//                                                 <div className="col-lg-6">
//                                                 <button
//                                                     className="btn btn-block btn-danger"
//                                                     type="button"
//                                                     onClick={this.RemoveCasts}
//                                                 >
//                                                     REMOVE CAST
//                                                 </button>
//                                                 </div>
                                                
//                                                 <div className="col-lg-12">
//                                                 <button
//                                                     className="btn btn-block btn-primary"
//                                                     type="submit"
//                                                 >
//                                                     {this.state.btnMessage === 0 ? "save play" : "saving play Please Wait.."}
//                                                 </button>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Untitled


// // async fetchOrdersData() {
//     //     var apihandler = new APIHandler();
//     //     var ordersdata = await apihandler.fetchOrdersDetails(this.props.match.params.id);
//     //     console.log(ordersdata);
//     //     this.setState({ phone: ordersdata.data.data.phone });
//     //     this.setState({ name: ordersdata.data.data.name });
//     //     this.setState({ customer_id: ordersdata.data.data.customer_id });
//     //     this.setState({ town: ordersdata.data.data.town });
//     //     this.setState({ region: ordersdata.data.data.region });
//     //     this.setState({ kgs: ordersdata.data.data.kgs });
//     //     this.setState({ packaging: ordersdata.data.data.packaging });
//     //     this.setState({ discount: ordersdata.data.data.discount });
//     //     this.setState({ transport: ordersdata.data.data.transport });
//     //     this.setState({ rider: ordersdata.data.data.rider });
//     //     this.setState({ comment: ordersdata.data.data.comment });
//     //     this.setState({ farmer_id: ordersdata.data.data.farmer_id });
//     //     this.setState({ rice_type: ordersdata.data.data.rice_type });
//     //     this.setState({ farmer_price: ordersdata.data.data.farmer_price });
//     //     this.setState({ price: ordersdata.data.data.price });
//     //     this.setState({ amount: ordersdata.data.data.amount });
//     //     this.setState({ dataLoaded: true });
//     // }