import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component }) {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return (
    <Route
      render={({ location }) => {
        if (isLoggedIn) {
          return <Redirect to={{ pathname: '/', state: { from: location } }} />;
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
