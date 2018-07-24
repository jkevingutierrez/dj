import React, { Component } from 'react';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Welcome} />
      </Router>
    );
  }
}

export default App;
