import React from 'react';
import { AppRegistry, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import NavReducer from './redux-nav/nav-reducer.js';
import AppNavigatorWithState from './redux-nav/app-navigator.js';


class App extends React.Component {

  store = createStore(NavReducer);

  render() {

    return (
      <Provider store={this.store} >
        <AppNavigatorWithState />
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default App;
