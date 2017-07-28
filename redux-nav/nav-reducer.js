import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { AppNavigator } from './app-navigator.js';
import axios from 'react-native-axios';
import * as NavActionTypes from '../action-types/navigation-action-types.js';

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Places');
const initialNavState = AppNavigator.router.getStateForAction(firstAction, tempNavState);
function firstState () {
  return {
    ...tempNavState
  }
};

function nav (state = firstState(), action) {
  let nextState;
  switch (action.type) {

    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate.goBack(),
        state
      );
      nextState.nav.routes[nextState.nav.index].params.userID = '1234';
      break;

    case NavActionTypes.NAVIGATE_PLACES:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Places', params: { titleName: action.name, thescrip: action.description} }),
        state
      );

      break;

    case NavActionTypes.NAVIGATE_PLACES_DETAIL:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: NavActionTypes.NAVIGATE_PLACES_DETAIL}),
        state
      );
      nextState.model = action.model;
      break;

    case 'Profile':
      nextState.name = action.name;

      break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false, userID: '', user: {} };

function auth(state = initialAuthState, action) {
  switch (action.type) {

    case 'Login':
      axios.get('https://crave-scoop.herokuapp.com/get-user/' + action.id).then(response => {
        action.dispatcher.dispatch({type: 'Login_Complete', theUser: response.data});
      }).catch(err => {
        console.log('couldnt get user');
      });
      return { ...state, isLoggedIn: false, userID: action.id };

    case 'Login_Complete':
      return { ...state, isLoggedIn: true, theUser: action.theUser };

    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const NavReducer = combineReducers({
  nav,
  auth
});

export default NavReducer;
