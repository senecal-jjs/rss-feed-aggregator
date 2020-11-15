import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { useAppContext } from "./libs/contextLib";

function AuthenticatedRoute({ children, ...rest }) {
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();
    console.log(pathname);
    console.log(search);
    return (
      <Route {...rest}>
        {isAuthenticated ? (
          children
        ) : (
          <Redirect to={
            `/?redirect=${pathname}${search}`
          } />
        )}
      </Route>
    );
  }

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Routes; 