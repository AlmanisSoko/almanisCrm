import React from "react";
import APIHandler from "../utils/APIHandler";

class AutoFillBill extends React.Component {
  state = {
    onFocus: false,
    datalist: [],
  };

  constructor(props) {
    super(props);
    this.loadDataCustomer = this.loadDataCustomer.bind(this);
    this.inputData = React.createRef();
  };

  onFocusChange = () => {
    this.setState({ onFocus: true });
  };

  onBlurChange = () => {
    this.setState({ onFocus: false });
  };

  async loadDataCustomer(event) {
    var apiHandler = new APIHandler();
    var dataresponse = await apiHandler.fetchCustomerName(event.target.value);
    this.setState({ datalist: dataresponse.data });
  };

  onShowItem = (item) => {
    console.log(item);
    this.inputData.current.value = item.name;
    this.props.showDataInputs(this.props.itemPostion, item);
    this.onBlurChange();
  };
 
  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder=""
          onFocus={this.onFocusChange}
          autoComplete="off"
          onChange={this.loadDataCustomer}
          ref={this.inputData}
        />
        {this.state.onFocus === true ? (
          <div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                border: "1px solid lightgrey",
                boxShadow: "1px 1px 1px lightgrey",
                position: "absolute",
                width: "100%",
                zIndex: 1,
                background: "white",
              }}
            >
              {this.state.datalist.map((item) => (
                <li
                  key={item}
                  style={{ padding: 5, borderBottom: "1px solid lightgrey" }}
                  onClick={() => this.onShowItem(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default AutoFillBill;
