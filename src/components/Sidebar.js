import React from "react";
import Config from "../utils/Config";
import { Link } from "react-router-dom";

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.divref = React.createRef();
        this.divref2 = React.createRef();
    }

    state = {
        defaultClass: "btn-group user-helper-dropdown"
    }

    UNSAFE_componentWillMount() {
        document.addEventListener("mousedown", this.handleMouseClick, false);
    };

    componentWillUnmount() {
        document.addEventListener("mousedown", this.handleMouseClick, false);
    };

    handleMouseClick = (event) => {
        if (event.target === this.divref.current || event.target === this.divref2.current) {
            console.log("Click Element");
            return
        } else {
            console.log("Click Outside");
            this.setState({ defaultClass: "btn-group user-helper-dropdown" })
        }
    }

    render() {
        
        return (
            <aside className="sidebar sidebar-offcanvas container-fluid page-body-wrapper" id="sidebar">
                <ul className="nav ps ps--active-y">
                    <li className="nav-item user-info">
                        <h3 className="name">ALMANIS CRM</h3>
                        <p className="email"></p>
                    </li>
                    {Config.sidebarItem.map((item) => (
                        <li className={
                            item.index === this.props.activepage ? "active" : "nav-item"
                            } key={item.index}>
                            <Link className="nav-link" to={item.url}>
                                <i className={item.icons}></i>
                                <span className="menu-title">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                    <li className="nav-item">
                        <div className="profile-actions">
                           
                        </div>
                    </li>

                </ul>    
            </aside>   
        );
    }
}

export default SideBar;