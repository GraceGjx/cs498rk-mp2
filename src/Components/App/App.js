import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

// Custom Components
import Home from '../Home/Home.js';
import Search from '../Search/SearchMovie.js';

class App extends Component {
  render() {
    return (
        <Router>
        <Switch>
          <Route exact path="/cs498rk-mp2/" component={Home}/>
          <Route exact path="/cs498rk-mp2/search" component={Search}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
