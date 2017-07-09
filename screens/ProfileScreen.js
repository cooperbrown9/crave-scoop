import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({
    title: 'SETTINGS'

});

  render() {
    return(
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
})
