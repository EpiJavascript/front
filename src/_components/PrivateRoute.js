import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('user')) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
