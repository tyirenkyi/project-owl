import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Recordings from './pages/recordings';
import Nav from "./components/nav";
import Footer from "./components/footer"

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
      <Footer />
    </>
  );
}

export default App;
