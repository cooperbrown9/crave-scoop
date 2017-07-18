import React from 'react';
import { StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen.js';
import PlacesScreen from '../screens/PlacesScreen.js';

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    PlaceDetail: {
      screen: PlaceDetailScreen
    },

    Profile: {
      screen: ProfileScreen
    },
    Places: {
      screen: PlacesScreen
    },
    Next: {
      screen: LinksScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
);
