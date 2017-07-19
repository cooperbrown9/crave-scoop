import React from 'react';
import { AppRegistry, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import NavigationReducer from './reducers/navigation-reducers.js';
import store from './entry/store.js';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import MainStackNavigation from './navigation-redux/NavigationBar.js';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';


//const theStore = createStore(
  //NavigationReducer
//);

export default class AppContainer extends React.Component {
  state = {
    appIsReady: true,
  };

  render() {
    if (this.state.appIsReady) {
      return (
        <Provider store={store}>
          <MainStackNavigation />
        </Provider>


      );
    } else {
      return <AppLoading />;
    }
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

// AppRegistry.registerComponent('AppContainer', () => Nav);
