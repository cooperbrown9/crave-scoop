import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainStackNavigator from './MainStackNavigator.js';

// this isnt in use for now
// const TheRootStackNavigator = StackNavigator({
//  Main: {
    // screen: MainStackNavigator,
  // },
// });

export default class TheRootNavigator extends React.Component {

  render() {
    return <MainStackNavigator />;
  }
}
