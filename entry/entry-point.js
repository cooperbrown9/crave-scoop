import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
// import { StackNavigation } from '../navigation/TheRootNavigation.js';
import StackNavigator from '../navigation/MainStackNavigator.js';

const middleware = () => {
  return applyMiddleware(logger());
}

export default createStore(
  combineReducers({
    navBar: (state, action) =>
      StackNavigator.router.getStateForAction(action,state)
  }),
  middleware(),
)
