import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Recordings from './pages/recordings';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Recordings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
