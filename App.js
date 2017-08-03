import React from 'react';
import { AppRegistry, Platform, AsyncStorage, Alert, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import NavReducer from './redux-nav/nav-reducer.js';
import AppNavigatorWithState from './redux-nav/app-navigator.js';
import thunk from 'redux-thunk';
import Expo from 'expo';
import axios from 'react-native-axios';
import * as NavActionTypes from './action-types/navigation-action-types.js';

class App extends React.Component {

  store = createStore(NavReducer, applyMiddleware(thunk));

  async loginFBAsync() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1565112886889636', {permissions:['public_profile'], behavior: 'web'});
    if (type === 'success') {
      const response = await axios.get('https://graph.facebook.com/me?access_token=' + token);

      Alert.alert('Logged In!', response.data.name);

      await AsyncStorage.setItem('@fb_id:key', response.data.id);
      await AsyncStorage.setItem('@fb_access_token:key', token);
    }
  }

  async checkLogin() {
    const id = await AsyncStorage.getItem('@fb_id:key');

    if (id != null) {
      this.store.dispatch({type: NavActionTypes.NAVIGATE_PLACES});
    }
  }

  componentDidMount() {
    // this.checkLogin();


  }

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
