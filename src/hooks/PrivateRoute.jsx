import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component, isAuthenticated, redirectTo, ...rest }) => {
  const routeComponent = (props) =>
    isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: redirectTo }} />;
  return <Route {...rest} render={routeComponent} />;
};
