import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Router, Switch, Route, Redirect,
} from 'react-router-dom';
import history from '../_helpers/history';
import Server from '../components/Server';
import ServersSidebar from '../components/ServersSidebar';
import { serverConstants } from '../_constants';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: serverConstants.SERVER_CLEAR });
  }, [dispatch]);

  return (
    <div id="home" className="h-screen w-screen flex bg-gray-800">
      <ServersSidebar />
      <Router history={history}>
        <Switch>
          <Route exact path="/server/:id" component={Server} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default HomePage;
