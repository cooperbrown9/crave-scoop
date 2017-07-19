import { createStore } from 'redux';
import reducer from '../reducer-new/index.js';

export var configureStore = (initialState) => {
  return createStoer(reducer, initialState);
}
