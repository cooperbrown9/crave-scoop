import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from './app-navigator.js';

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Places');
const initialNavState = AppNavigator.router.getStateForAction(firstAction, tempNavState);

function nav (state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Home':
    debugger;
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate.goBack(),
        state
      );
      break;
    case 'Places':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Places' }, {name: action.name, description: action.description}),
        state
      );
      break;
    case 'PlaceDetail':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({routeName: 'PlaceDetail'}),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
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
