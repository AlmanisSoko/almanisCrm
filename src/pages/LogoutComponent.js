import React from "react";
import AuthHandler from "../utils/AuthHandler";
import { Redirect } from "react-router-dom";

class LogoutComponent extends React.Component {
    render() {
        if (window.confirm('Are you sure want to log out?')) {
            AuthHandler.logoutUser();
            return <Redirect to="/login" />;
        };
        
        return <Redirect to="#" />;
    }
}

export default LogoutComponent;