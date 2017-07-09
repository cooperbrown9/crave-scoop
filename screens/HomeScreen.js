import React from 'react';
import {
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import RoundButton from '../ui-elements/round-button.js';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    header: null
  };

  _nextController = () => {
    this.props.navigation.navigate('Profile');
  };


  render() {

    let {width, height} = Dimensions.get('window');
    let halfHeight = height / 2;
    return (
      <View style={styles.mainContainer} >

        <View style={styles.welcomeContainer} >
          <Image source={require('../assets/images/cupcake.png')} style={styles.image} />
          <Text color='white' style={styles.welcomeMessage} >
            Welcome to your Daily Crave.
          </Text>
        </View>

        <View style={styles.buttonContainer} >
          <RoundButton title='Bruh Hit' onPress={this._nextController} bgColor='white' textColor='black' />
          <RoundButton title='Create Account' onPress={this._nextController} />
        </View>
        <Text style={styles.termsText}>Terms of Service</Text>

      </View>
    );
  }
}
// ask Eric how to put space between children with a flex, like confining Views to specific dimensions
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#41d9f4',
    justifyContent: 'center'
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 16,
    marginRight: 32
  },
  image: {
    tintColor: 'white',
  },
  welcomeMessage: {
    fontSize: 32,
    textAlign: 'left',
    color: 'white',
    lineHeight: 0,
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 12
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 32,
    marginRight: 32
  },
  termsText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    bottom: 32
  }
});
