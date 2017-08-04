import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlacesScreen from '../screens/PlacesScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import { AsyncStorage } from 'react-native';
import * as NavActionTypes from '../action-types/navigation-action-types.js';

function getLoginState() {
  AsyncStorage.getItem('name', (err, result) => {
    if(err) {
      console.log(err);
    } else {
      console.log('result ' + result);
      return result;
    }
  })
}

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Places: { screen: PlacesScreen },
  PlaceDetail: { screen: PlaceDetailScreen },
},
// { initialRouteName: 'Places' }
  { initialRouteName: (getLoginState() == null) ? 'Home' : 'Places' }
);

const AppNavigatorWithState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})} />
);

AppNavigatorWithState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigatorWithState);
