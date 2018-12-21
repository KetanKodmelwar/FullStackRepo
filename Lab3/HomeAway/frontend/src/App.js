import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client=new ApolloClient({
  uri:"http://locahost:3000/graphql"
})


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      
      <div>
        <Main/>
        </div>
        
      </BrowserRouter>
      
    );
  }
}

export default App;
