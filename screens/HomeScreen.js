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
  AsyncStorage,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import RoundButton from '../ui-elements/round-button.js';
import FilterModal from './FilterModal.js';
import CreateProfileModal from './CreateProfileModal.js';
import LinearGradient from 'react-native-linear-gradient';
import { GetUserByID } from '../rest/rest.js';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import axios from 'react-native-axios';
import * as REST from '../rest/rest.js';
import Expo from 'expo';


class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Title',
    header: null
  };

  state = {
    clicked: false,
    profilePresented: false
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
    // FB App ID 1565112886889636 SECRET: 7765eef11057d8b0e03799d070856e73
    // this.props.dispatch(this.getUserFoReal('59765d2df60c01001198f3b5').bind(this));
    // this.checkLoginStatus();

  }


  async checkLoginStatus() {
    const id = await AsyncStorage.getItem('@fb_id:key');
    const token = await AsyncStorage.getItem('@fb_access_token:key');

    if (id == null || token == null) {
      this.loginFBAsync();
    } else {
      // const longToken = await axios.get('https://graph.facebook.com/oauth/access_token?client_id=1565112886889636&client_secret=7765eef11057d8b0e03799d070856e73&grant_type=fb_exchange_token&fb_exchange_token=' + token);
      this.props.navigation.dispatch({type: NavActionTypes.NAVIGATE_PLACES});
    }
  }

  async loginFBAsync() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1565112886889636', {permissions:['public_profile'], behavior: 'web'});
    if (type === 'success') {
      const response = await axios.get('https://graph.facebook.com/me?access_token=' + token);

      Alert.alert('Logged In!', response.data.name);

      await AsyncStorage.setItem('@fb_id:key', response.data.id);
      await AsyncStorage.setItem('@fb_access_token:key', token);
    }
  }


  getTestUsername = async() => {
    let g = await AsyncStorage.getItem('@user_id:key');
    console.log(g);
    g = await AsyncStorage.getItem('@user_name:key');
    console.log(g);
  }

  _getUserHelper = (id) => {
    return axios.get('https://crave-scoop.herokuapp.com/get-user/' + id);
  }

  getUserFoReal(id) {
    return function (dispatch) {
      return this._getUserHelper(id).then(
        user => dispatch({type: 'Login', user: user.data})
      ).then(async (user) => {
        await AsyncStorage.setItem('@user_id:key', user.user._id);
        await AsyncStorage.setItem('@user_name:key', user.user.last_name);
      }).then(() => {
        this.getTestUsername();
      })
    }
  }

  _presentController = () => {
    this.state.clicked = true;
    this.setState(this.state);
  }

  _profileModalPresented = () => {
    if(this.state.profilePresented === false){
      this.state.profilePresented = true;
    } else if(this.state.profilePresented === true){
      this.state.profilePresented = false;
    }
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
        <Modal animationType={"slide"} transparent={false} visible={this.state.profilePresented} >
            <CreateProfileModal dismissFunc={this._profileModalPresented} />
        </Modal>
        <View style={styles.welcomeContainer} >
          <Image source={require('../assets/images/cupcake.png')} style={styles.image} />
          <Text color='white' style={styles.welcomeMessage} >
            Welcome to your Daily Crave. { this.props.text }
          </Text>
        </View>

        <View style={styles.buttonContainer} >
          <RoundButton title='Continue with Facebook' onPress={this._goToPlacesScreen} bgColor='white' textColor='#41d9f4' />
          <RoundButton title='Create Account' onPress={this._profileModalPresented} />
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
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,

  }
}

export default connect(mapStateToProps)(HomeScreen);
