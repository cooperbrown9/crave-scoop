import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
// import { StackNavigation } from '../navigation/TheRootNavigation.js';

import { NavBar, navBarReducer } from '../navigation-redux/NavBar.js';

const middleware = () => {
  return applyMiddleware(createLogger());
}

export default createStore(
  combineReducers({
    navBar: navBarReducer,
    navigator: (state, action) =>
      NavBar.router.getStateForAction(action,state),

  }),
  middleware()
)
