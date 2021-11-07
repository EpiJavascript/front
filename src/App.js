import React from 'react';
import {
  Router, Switch,
} from 'react-router-dom';
import './index.css';

import history from './_helpers/history';
import PrivateRoute from './_components/PrivateRoute';
import PublicRoute from './_components/PublicRoute';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';

function App() {
  return (
    <div className="">
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />
          <PrivateRoute path="/" component={HomePage} />
          {/* <Redirect from="*" to="/" /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
