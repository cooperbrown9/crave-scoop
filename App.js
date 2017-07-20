import React from 'react';
import { AppRegistry, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import NavigationReducer from './reducers/navigation-reducers.js';
// import store from './entry/store.js';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import MainStackNavigation from './navigation-redux/NavigationBar.js';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import { configureStore } from './store-new/index.js';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import NavReducer from './redux-nav/nav-reducer.js';
import AppNavigatorWithState from './redux-nav/app-navigator.js';

//
// const AppNavigator = StackNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Places: { screen: PlacesScreen },
//     Settings: { screen: SettingsScreen },
//     PlaceDetail: { screen: PlaceDetailScreen }
// });
//
// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
//
// const navReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);
//
//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };
//
// const appReducer = combineReducers({
//   nav: navReducer,
//
// });


// const newstore = createStore(appReducer);

class App extends React.Component {

  store = createStore(NavReducer);

  render() {

    return (
      <Provider store={this.store}>
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

// const mapStateToProps = (state) => ({
//   nav: state.nav
// });
//
// const AppWithNavigationState = connect(mapStateToProps)(AppContainer);



// AppRegistry.registerComponent('AppContainer', () => Nav);
