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
        NavigationActions.navigate({ routeName: 'Places' }),
        state
      );

      break;

    case NavActionTypes.NAVIGATE_PLACES_DETAIL:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: 'PlaceDetail', params: { model: action.model }}),
        state
      );
      break;

    case NavActionTypes.GO_BACK:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
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

const initialModalState = {};
function modal (state = initialModalState, action) {
  let nextState = state;
  switch(action.type) {

    case 'VendorItemModal':

      return { model: action.model }
      break;

    default:
      console.log('yuuuuuuuh');
      return { randomProp: '' }
      break;
  }
}

const initialAuthState = { isLoggedIn: false, userID: '', user: {} };

function auth(state = initialAuthState, action) {

  switch (action.type) {

    case 'Login':
      return {
        type: action.type,
        ...state,
        user: action.user,
      }

    case 'Login_Complete':
      console.log('yuuuuup');
      return { ...state, isLoggedIn: true, user: action.user };

    case 'GetUser':
      axios.get('https://crave-scoop.herokuapp.com/get-user/' + action.id).then(response => {
        action.dispatcher.dispatch({type: 'GetUserComplete', user: response.data});
      }).catch(error => {
        action.dispatcher.dispatch({type: 'GetUserFail', id: action.id, error: error });
      });
      return { ...state, isLoggedIn: false };

    case 'GetUserComplete':
      return { ...state, isLoggedIn: true, user: action.user }

    case 'GetUserFail':
      return { ...state, isLoggedIn: false, userID: action.id, error: action.error };

    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const initialVendorState = { vendors: [], success: false };
function getVendors(state = initialVendorState, action) {

  switch(action.type) {

    case NavActionTypes.NEARBY:
      return {
        type: action.type,
        ...state,
        vendors: action.vendors,
        success: true
      }

      case NavActionTypes.FAVORITES:
        return {
          type: action.type,
          ...state,
          vendors: action.vendors,
          success: true
        }

    default:
      console.log('yuh');
      return { type: action.type, success: false }
      break;
  }
}

// export function setUser (data) {
//   return Object.assign({type: 'Login_Complete', user: data});
// }

const NavReducer = combineReducers({
  nav,
  auth,
  modal,
  getVendors
});

export default NavReducer;
