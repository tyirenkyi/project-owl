import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Recordings from './pages/recordings';
import RecordingDetail from "./pages/recording-detail";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Recordings} />
          <Route exact path="/recording/:fileName" component={RecordingDetail}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
