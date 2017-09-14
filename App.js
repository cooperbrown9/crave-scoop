import React from 'react';
import { AppRegistry, Platform, AsyncStorage, Alert, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import NavReducer from './redux-nav/nav-reducer.js';
import AppNavigatorWithState from './redux-nav/app-navigator.js';
import MainReducer from './reducers/main-reducer.js';
import thunk from 'redux-thunk';
import Expo from 'expo';
import { Font } from 'expo';
import axios from 'react-native-axios';
import * as NavActionTypes from './action-types/navigation-action-types.js';
import * as Keys from './local-storage/keys.js';
import * as URLS from './constants/url';

export default class App extends React.Component {

  store = createStore(MainReducer, applyMiddleware(thunk));

  async checkForID() {
    const userID = await AsyncStorage.getItem(Keys.USER_ID);
    const fbID = await AsyncStorage.getItem(Keys.FACEBOOK_ID);
    console.log(fbID, 'id');
    console.log(userID, 'uid');

    if(userID == null) {
      this.store.dispatch({ type: 'FINISH_LOADING' });
      console.log('STARTING HOME');
    } else {
      // this.store.dispatch({ type: 'START_PLACES'})
      axios.get('https://crave-scoop.herokuapp.com/get-user/' + userID).then(response => {
        if(response.status == '200') {
          this.store.dispatch({ type: 'LOGIN_SUCCESSFUL', user: response.data });
          this.store.dispatch({ type: 'FINISH_LOADING '});
          this.store.dispatch({ type: 'START_PLACES' });
        } else {
          console.log('naaaah');
          this.store.dispatch({ type: 'START_HOME'});
        }
      }).catch(error => {
        Keys.resetKeys(() => {
          this.store.dispatch({ type: 'FINISH_LOADING' });
          console.log(error);
        })
      })
    }
  }

  async checkLoginStatus() {
    const userID = await AsyncStorage.getItem(Keys.USER_ID);
    const sessionID = await AsyncStorage.getItem(Keys.SESSION_ID);
    console.log('APP.JS', userID, sessionID);

    if (!userID || !sessionID) {
      this.store.dispatch({ type: 'FINISH_LOADING' });
      return;
    } else {
      await axios.get(URLS.verifySession(sessionID, userID)).then(async(response) => {
        await this.getUserData(sessionID, userID);
      }).catch(e => {
        Keys.resetKeys(() => {
          console.log(e);
          this.store.dispatch({ type: 'FINISH_LOADING' });
          this.store.dispatch({ type: 'START_HOME' });
        })
      })
    }
  }

  async getUserData(sessionID, userID) {
    await axios.get(URLS.getUser(sessionID, userID)).then(response => {
      debugger;
      this.store.dispatch({ type: 'LOGIN_SUCCESSFUL', user: response.data });
      this.store.dispatch({ type: 'START_PLACES' });
    }).catch(e => {
      Keys.resetKeys(() => {
        console.log(e);
        this.store.dispatch({ type: 'FINISH_LOADING' });
        this.store.dispatch({ type: 'START_HOME' });
      })
    })
  }

  async componentDidMount() {
    await Font.loadAsync({
      'varela-regular': require('./assets/fonts/Varela-Regular.ttf'),
      'varela-round': require('./assets/fonts/VarelaRound-Regular.ttf'),
    });
    // Keys.resetKeys(await this.checkForID().bind(this));
      // Keys.resetKeys(() => {this.store.dispatch({type:'START_HOME'})});
    // await AsyncStorage.setItem(Keys.USER_ID, 'jhjksgf');
    await this.checkLoginStatus(); // checkLoginStatus();
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


// export default App;
