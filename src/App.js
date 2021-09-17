import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Button from '@mui/material/Button';

import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/register">
          <Button variant="contained">Hello World</Button>
          <Register />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
