import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Recordings from './pages/recordings';
import Nav from "./components/nav";

function App() {
  return (
    <>
      <Nav />
      <Router>
        <Switch>
          <Route path="/">
            <Recordings />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
