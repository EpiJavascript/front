import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component }) {
  return (
    <Route
      render={({ location }) => {
        if (!localStorage.getItem('user')) {
          return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
        }
        return <Component />;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
