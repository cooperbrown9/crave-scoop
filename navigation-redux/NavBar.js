import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const routeConfigurations = {
  Home: { screen: HomeScreen },
  Links: { screen: LinksScreen },
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
