import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import logo from './logo.svg';

import FormBuilder from './components/FormBuilder';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FormBuilder />
      </Provider>
    );
  }
}

export default App;
