import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthHandler from "./AuthHandler";
import MainComponent from "../components/MainComponent";

export var PrivateRoute = ({ page, activepage, ...rest }) => {
  return (
    <React.Fragment>
    <Route
      {...rest}
      render={(props) =>
        AuthHandler.loggedIn() ? (
          <MainComponent page={page} activepage={activepage} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
    </React.Fragment>
  );
};

