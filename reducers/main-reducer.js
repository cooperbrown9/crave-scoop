import nav from '../redux-nav/nav-reducer.js';
import auth from './auth-reducer.js';
import loading from './loading-reducer.js';
import vendorHelper from './vendor-reducer.js';
import user from './user-reducer.js';
import location from './location-reducer.js';
import modal from './modal-reducer.js';
import { combineReducers } from 'redux';

const MainReducer = combineReducers({
  nav,
  auth,
  loading,
  vendorHelper,
  user,
  location,
  modal
});

export default MainReducer;
