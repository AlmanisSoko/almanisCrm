import React from "react"
import Config from "../utils/Config";
import { Link } from "react-router-dom";
import APIHandler from "../utils/APIHandler";

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: true,
    };
  }

  toggleSidebar = () => {
    // Toggle the sidebar open/closed state
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));

    // Toggle the class of the body element
    const bodyElement = document.querySelector("body");
    bodyElement.classList.toggle("sidebar-icon-only");
  }


  render() {
    return(
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo" href="#"><img src="assets/images/logo.png" alt="logo" /></a>
            <a className="navbar-brand brand-logo-mini" href="#">A</a>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center">
            <button className="navbar-toggler align-self-center" type="button" data-toggle="minimize" onClick={this.toggleSidebar} >
              <span className="mdi mdi-menu"></span>
            </button>
            <h4 className="top-navbar-title d-none d-lg-block">Greetings    </h4>
            <div className="search-field d-none d-xl-block">
              <form className="d-flex align-items-center h-100" action="#">
                <div className="input-group">
                  <div className="input-group-prepend bg-transparent">
                    <i className="input-group-text border-0 mdi mdi-magnify"></i>
                  </div>
                  <input type="text" className="form-control bg-transparent border-0" placeholder="Search products"/>
                </div>
              </form>
            </div>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile dropdown  d-none d-md-block">
                <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                  <div className="nav-profile-img">
                    <img src="assets/images/faces-clipart/undraw_male_avatar_g98d.svg" alt="image"/>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-0 text-black">{this.state.name} </p>
                  </div>
                </a>
                
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                  <i className="icon-social-dropbox"></i>
                </a>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to={"/addstock"} data-toggle="dropdown">
                  <i className="mdi mdi-barley"></i>
                  <span className="count-symbol bg-danger"></span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                  <i className="mdi mdi-email"></i>
                  <span className="count-symbol bg-success"></span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href={Config.logoutPageUrl} data-toggle="dropdown" aria-expanded="false">
                  <i class="mdi mdi-logout ml-1"></i>
                </a>
              </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>
    )
  }
}

export default HeaderComponent;
      