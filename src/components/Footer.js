import React from "react";

class Footer extends React.Component {

    state = {
        numberEmptyError: "Cannot be empty!!",
        messageEmptyError: "Cannot be empty!!",
        mobile: "",
        modalTitle:"",
        message: ""
    }

    changeMobile = (e) => {
        this.setState({
            mobile: e.target.value
        })
    }

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    whatsApp() {
        this.setState({
            mobile: "",
            message: ""
        })
    }

    render() {
        const { mobile, message } = this.state
        return(
            <div >
                <button 
                    type="button" 
                    data-bs-toggle="modal"
                    className="btn btn-primary btn-floating float"
                    data-bs-target="#exampleModal-4"
                    onClick={() => this.whatsApp()}
                >
                    <i className="mdi mdi-telegram mr-1 my-float"></i>
                </button> 
                <div className="modal fade " id="exampleModal-4" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" style={{ display: "block" }} aria-modal="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLabel">Almanis CRM</h5>
                                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="card">
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group bmd-form-group">
                                                <label className="col-form-label bmd-label-static">
                                                    Recipient:
                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="recipient-name"
                                                    value={mobile}
                                                    onChange={this.changeMobile}
                                                />
                                            </div>
                                            <div className="form-group bmd-form-group">
                                                <label className="col-form-label bmd-label-static">
                                                    Message:
                                                </label>
                                                <textarea 
                                                    className="form-control" 
                                                    id="message-text"
                                                    value={message}
                                                    onChange={this.changeMessage}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success">Send message</button>
                                <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
        )
    }
}

export default Footer;