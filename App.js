import React from 'react';
import { AppRegistry, Platform, AsyncStorage, Alert, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import NavReducer from './redux-nav/nav-reducer.js';
import AppNavigatorWithState from './redux-nav/app-navigator.js';
import thunk from 'redux-thunk';
import Expo from 'expo';
import { Font } from 'expo';
import axios from 'react-native-axios';
import * as NavActionTypes from './action-types/navigation-action-types.js';
import * as Keys from './local-storage/keys.js';

class App extends React.Component {

  store = createStore(NavReducer, applyMiddleware(thunk));


  async checkForID() {


    const userID = await AsyncStorage.getItem(Keys.USER_ID);
    const fbID = await AsyncStorage.getItem(Keys.FACEBOOK_ID);
    console.log(fbID, 'id');
    console.log(userID, 'uid');
    if((userID == 'null') && (fbID == 'null')){
      this.store.dispatch({type: 'Home'});
    } else {
      this.store.dispatch({type: NavActionTypes.NAVIGATE_PLACES});
    }
  }

  async resetUser() {
    await AsyncStorage.setItem(Keys.USER_ID, 'null');
    await AsyncStorage.setItem(Keys.FACEBOOK_ID, 'null');

  }

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
    await AsyncStorage.setItem(Keys.FACEBOOK_ID, 'abc');
    const id = await AsyncStorage.getItem('@fb_id:key');
    console.log('fbid', id);
    if (id != null) {
      this.store.dispatch({type: NavActionTypes.NAVIGATE_PLACES});
    }
  }

  componentDidMount() {
    Font.loadAsync({
      'varela-regular': require('./assets/fonts/Varela-Regular.ttf'),
      'varela-round': require('./assets/fonts/VarelaRound-Regular.ttf'),
    });

    this.checkForID();

  }

  componentWillMount() {
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
