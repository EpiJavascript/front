import React, { useEffect } from 'react';
import {
  Router, Switch, Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './index.css';

import history from './_helpers/history';
import alertActions from './_actions/alert.actions';
import PrivateRoute from './_components/PrivateRoute';
import PublicRoute from './_components/PublicRoute';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <div className="">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
