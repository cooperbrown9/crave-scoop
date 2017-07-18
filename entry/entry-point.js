import { applyMiddleware, combineReducers, createStore } from 'redux';
// import logger from 'redux-logger';
// import { StackNavigation } from '../navigation/TheRootNavigation.js';

import { NavBar } from '../navigation-redux/NavBar.js';

const middleware = () => {
  return applyMiddleware(logger());
}

export default createStore(
  combineReducers({
    navBar: (state, action) =>
      NavBar.router.getStateForAction(action,state),

  })
)
