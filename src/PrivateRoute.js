import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return null;
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;