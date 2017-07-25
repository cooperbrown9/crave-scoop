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
  Dimensions,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import RoundButton from '../ui-elements/round-button.js';
import FilterModal from './FilterModal.js';
import LinearGradient from 'react-native-linear-gradient';


class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Title',
    header: null
  };

  state = {
    clicked: false
  }

  changeText = () => {


  }


  _presentController = () => {
    this.state.clicked = true;
    this.setState(this.state);
  }

  _nextController = () => {
    this.props.navigation.navigate('Places', {model:{name: 'Cool Cakes', likeCount: '420' }});
  };

  _goToPlacesScreen = () => {
    this.props.navigation.dispatch({type: 'Places', name: 'Lunafghfg', description: 'its lit'});

  };

  _dismissModal = () => {
    this.state.clicked = false;
    this.setState(this.state);
  }


  render() {
    let {width, height} = Dimensions.get('window');
    let halfHeight = height / 2;
    return (
      <View style={styles.mainContainer} >

      <Modal animationType={"slide"} transparent={false} visible={this.state.clicked} >
          <View >
            <FilterModal dismissFunc={this._dismissModal.bind(this)} />
          </View>
        </Modal>
        <View style={styles.welcomeContainer} >
          <Image source={require('../assets/images/cupcake.png')} style={styles.image} />
          <Text color='white' style={styles.welcomeMessage} >
            Welcome to your Daily Crave. { this.props.text }
          </Text>
        </View>

        <View style={styles.buttonContainer} >
          <RoundButton title='Bruh Hit' onPress={this._goToPlacesScreen} bgColor='white' textColor='black' />
          <RoundButton title='Create Account' onPress={this._presentController} />
        </View>
        <Text style={styles.termsText}>Terms of Service</Text>
        <View>
          <Text backgroundColor="black">

          </Text>
        </View>
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
  },
  heart:{
    height: 16,
    width: 16,
  },
});

var mapStateToProps = (state) => {
  return {
    navigator: state.nav,

  }
}

export default connect(mapStateToProps)(HomeScreen);
