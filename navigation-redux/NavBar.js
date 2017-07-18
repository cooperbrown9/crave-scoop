import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const routeConfigurations = {
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
}

const navbarConfiguration = {
  navigationOptions: {
    tintColor: 'blue'
  }
}

export const NavBar = StackNavigator(routeConfigurations, navbarConfiguration);

export const navBarReducer = (state,action) => {
  if (action.type === 'Places') {
    debugger;
    return { ...state, ...action.payload }
  } else {
    return NavBar.router.getStateForAction(action,state)
  }
}
