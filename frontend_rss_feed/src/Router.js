import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { useAppContext } from "./libs/contextLib";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function UnauthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();
  const redirect = querystring("redirect");
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/dashboard" : redirect} />
      )}
    </Route>
  );
}

function AuthenticatedRoute({ children, ...rest }) {
    const { pathname, search } = useLocation();
    const { isAuthenticated } = useAppContext();
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
            <UnauthenticatedRoute exact path="/"><Login /></UnauthenticatedRoute> 
            <AuthenticatedRoute exact path="/dashboard"><Dashboard /></AuthenticatedRoute>
            <Route component={NotFound} />
        </Switch>
    );
}

export default Routes; 