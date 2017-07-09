import React from 'react';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Next: {
      screen: LinksScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
    Profile: {
      screen: ProfileScreen
    }
  }
);
