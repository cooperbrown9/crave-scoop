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

function getDatState () {

  AsyncStorage.getItem('name', (err, result) => {
    if(err) {
      console.log(err + ' error');
    } else {
      console.log('result ' + result);

      let firstAct;

      if(result != null) {
        firstAct = AppNavigator.router.getActionForPathAndParams('Places');
        return AppNavigator.router.getStateForAction(firstAct);

      } else {
        firstAct = AppNavigator.router.getActionForPathAndParams('Home');
        return AppNavigator.router.getStateForAction(firstAct);
      }

    }
  });
}

async function getFirstState() {
  await AsyncStorage.setItem('@LOGGEDIN:key', 'yes');
  const isLoggedIn = await AsyncStorage.getItem('@LOGGEDIN:key');
  debugger;
  let fa = AppNavigator.router.getActionForPathAndParams('Home');
  let tempNav = AppNavigator.router.getStateForAction(fa);

  if (isLoggedIn === 'yes') {
    fa = AppNavigator.router.getActionForPathAndParams('Places');
    tempNav = AppNavigator.router.getStateForAction(fa);
  }
  return {...tempNav};
}

function initState() {
  // AsyncStorage.setItem('datkey', 'bruuuh').then((value) => {

  // })

}

// const fa = AppNavigator.router.getActionForPathAndParams((initState() == 'null' ? 'Home' : 'Places'));
// const temp = AppNavigator.router.getStateForAction(fa);

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
        NavigationActions.navigate({routeName: 'Home'}),
        state
      );

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
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({routeName: 'Profile'}),
      state
    );

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

const initialVendorState = { vendors: [], success: false, placeDetail: { vendor: { hours: [] , location: {}, description: '', name: '' } } };
function vendorHelper(state = initialVendorState, action) {

  switch(action.type) {

    case NavActionTypes.NEARBY:
      return {
        type: action.type,
        ...state,
        vendors: action.vendors,
        success: true
      }
      break;

    case NavActionTypes.FAVORITES:
      return {
        type: action.type,
        ...state,
        vendors: action.vendors,
        success: true
      }
      break;

    case NavActionTypes.GET_VENDOR:
      return {
        ...state,
        placeDetail: {
        type: action.type,
        ...state,
        vendor: action.vendor,
        success: true
        }
      }
      break;

    default:
      return state;
      break;
  }
}

let initialUserState = { success: false, user: {} }
function user (state = initialUserState, action){

  switch(action.type){

    case NavActionTypes.GET_USER:
      initialUserState = {
      ...state,
      success: true,
      user: action.user,
      currentLocation: action.location
     };

      return initialUserState;
      // return {
      //   ...state,
      //   success: true,
      //   user: action.user
      // }
      break;

    default:
      return initialUserState;
      break;
  }
}

let initialLocationState = { latitude: '', longitude: ''}
function location(state = initialLocationState, action) {

  switch(action.type) {

    case NavActionTypes.UPDATE_USER_LOCATION:
      initialLocationState = {
        latitude: action.latitude,
        longitude: action.longitude
      }
      return initialLocationState;

    default:
      return initialLocationState;
  }
}


// export function setUser (data) {
//   return Object.assign({type: 'Login_Complete', user: data});
// }

const NavReducer = combineReducers({
  nav,
  auth,
  modal,
  vendorHelper,
  user,
  location
});

export default NavReducer;
