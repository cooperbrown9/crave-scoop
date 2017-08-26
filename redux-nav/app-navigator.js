import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import PlacesScreen from '../screens/PlacesScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import App from '../App.js';
import { AsyncStorage } from 'react-native';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import ProfileScreen from '../screens/ProfileScreen';
import * as Keys from '../local-storage/keys.js';

// function getLoginState() {
//   AsyncStorage.getItem(Keys.USER_ID, (err, result) => {
//     if (result !== null){
//       console.log('result ' + result);
//       return 'Places'
//     } else {
//       return 'Home';
//     }
//   })
// }

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Places: { screen: PlacesScreen },
  PlaceDetail: { screen: PlaceDetailScreen }
})

  // { initialRouteName: (getLoginState() == null) ? 'Home' : 'Places' }


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
