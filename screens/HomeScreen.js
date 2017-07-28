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
  Modal,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import RoundButton from '../ui-elements/round-button.js';
import FilterModal from './FilterModal.js';
import LinearGradient from 'react-native-linear-gradient';
import { GetUserByID } from '../rest/rest.js';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import axios from 'react-native-axios';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Title',
    header: null
  };

  state = {
    clicked: false
  }

  getTestName = async() => {
    await AsyncStorage.setItem('@test_username:key', 'cool dude');
    const name = await AsyncStorage.getItem('@test_username:key');
    console.log(name);
  }

  async getName() {
    const name = await AsyncStorage.getItem('@test_username:key');
    console.log(name);
  }

  componentDidMount() {
    axios.get('https://crave-scoop.herokuapp.com/get-user/59765d2df60c01001198f3b5').then(response => {
      this.setState({user: response.data});
    }).catch(error => {console.log('couldnt get user')
    });
  }

  _presentController = () => {
    this.state.clicked = true;
    this.setState(this.state);
  }

  _login = () => {
    this.props.dispatch({type: NavActionTypes.LOGIN, id: '59765d2df60c01001198f3b5', dispatcher: this.props});
  }

  _goToPlacesScreen = () => {
    this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES, name: '', description: 'its lit'});
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
            <FilterModal name={this.state.user} dismissFunc={this._dismissModal.bind(this)} />
          </View>
        </Modal>
        <View style={styles.welcomeContainer} >
          <Image source={require('../assets/images/cupcake.png')} style={styles.image} />
          <Text color='white' style={styles.welcomeMessage} >
            Welcome to your Daily Crave. { this.props.text }
          </Text>
        </View>

        <View style={styles.buttonContainer} >
          <RoundButton title='Continue with Facebook' onPress={this._goToPlacesScreen} bgColor='white' textColor='#41d9f4' />
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
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps)(HomeScreen);
