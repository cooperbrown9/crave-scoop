import { createStore } from 'redux';
import reducer from '../reducer-new/index.js';

var defaultState = {
  text: 'default text bruuuh'
}

export var configureStore = (initialState={}) => {
  return createStore(reducer, initialState);
}
