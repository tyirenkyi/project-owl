import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Recordings from './pages/recordings';
import RecordingDetail from "./pages/recording-detail";
import Footer from "./components/footer"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Recordings} />
          <Route exact path="/recording" component={RecordingDetail}/>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
