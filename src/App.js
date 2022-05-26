import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from './LandingPage';
import Navbar from './Navbar';
import NotFound from './NotFound';
import Solution from './Solution';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>

            <Route exact path="/Solution">
              <Solution />
            </Route>
          
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
