import React from 'react';
import { AppRegistry, Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { Provider } from 'react-redux';
// import store from './entry/entry-point.js';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import StackNavigation from './navigation/TheRootNavigation.js';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';


export default class AppContainer extends React.Component {
  state = {
    appIsReady: true,
  };

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          <StackNavigation />
        </View>

      );
    } else {
      return <AppLoading />;
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
