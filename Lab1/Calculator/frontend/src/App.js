import React, { Component } from 'react';
import CalculationExp from './components/Calculation/Calculate.js';

import './App.css';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <CalculationExp />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
