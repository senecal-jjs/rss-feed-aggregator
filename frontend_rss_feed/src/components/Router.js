import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated === true 
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

const Router = () => (
    // function requireAuth(nextState, replace, next) {
    //     if (!authenticated) {
    //       replace({
    //         pathname: "/login",
    //         state: {nextPathname: nextState.location.pathname}
    //       });
    //     }
    //     next();
    // }

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router; 