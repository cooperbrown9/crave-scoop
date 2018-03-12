import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import RoundButton from '../ui-elements/round-button.js';
import FilterModal from './FilterModal.js';
import CreateProfileModal from './CreateProfileModal.js';
import LinearGradient from 'react-native-linear-gradient';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import axios from 'react-native-axios';
import * as REST from '../rest/rest.js';
import Expo from 'expo';
import * as Keys from '../local-storage/keys.js';
import PlacesScreen from './PlacesScreen.js';
import LoginForm from './LoginForm.js';
import * as URLS from '../constants/url';

class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    clicked: false,
    profilePresented: false,
    initialLoading: false,
    loginFormPresented: false
  }

  componentDidMount() {
    // FB App ID 1565112886889636 SECRET: 7765eef11057d8b0e03799d070856e73
    console.log('skeddit');
  }

  checkLogin = () => {
    AsyncStorage.getItem(Keys.USER_ID, (err, id) => {
      console.log(id);
      if (id == null) {
        return;
      } else {
        // this.props.dispatch({ type: 'START_PLACES'});
        // this.props.dispatch({type: NavActionTypes.NAVIGATE_PLACES});
      }
    })
  }


  componentWillMount() {
  }

  componentWillUnmount() {
    this.setState({ initialLoading: false });
    this.props.dispatch({ type: 'FINISH_LOADING' });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    console.log(nextProps, nextState);
    if(nextProps._user.isLoggedIn) {
      this.props.dispatch({ type: NavActionTypes.NAVIGATE_PLACES });
      return false;
    }
    return true;
  }

  getUser() {
    AsyncStorage.getItem(Keys.USER_ID, (err, result) => {
      this.props.dispatch(this.getUserHelper(result));
    });
  }

  getUserHelper(sessionID, userID) {
    return function(dispatch) {
      return axios.get('https://crave-scoop.herokuapp.com/user/' + sessionID + '/' + userID).then(
        response => {
          dispatch({ type: 'LOGIN_SUCCESSFUL', user: response.data });
          dispatch({ type: 'FINISH_LOADING' });
          dispatch({type: NavActionTypes.NAVIGATE_PLACES});
      }).catch(error => {
        console.log(error);
        dispatch({ type: 'FINISH_LOADING' });
        Alert.alert('Couldnt make your account at this time');
      });
    }
  }

  getUserLegit(sessionID, userID) {
    axios.get('https://crave-scoop.herokuapp.com/user/' + sessionID + '/' + userID).then(response => {
      AsyncStorage.setItem(Keys.USER_ID, userID, () => {
        AsyncStorage.setItem(Keys.SESSION_ID, sessionID, () => {
          this.setState({ profilePresented: false, loginFormPresented: false });
          this.props.dispatch({ type: 'LOGIN_SUCCESSFUL', user: response.data });
          this.props.dispatch({ type: 'FINISH_LOADING' });
          this.props.dispatch({type: NavActionTypes.NAVIGATE_PLACES});
        });
      });
    }).catch(error => {
      console.log(error);
      this.setState({ profilePresented: false, loginFormPresented: false });
      this.props.dispatch({ type: 'FINISH_LOADING' });
      Alert.alert('Couldnt make your account at this time');
    });
  }

  createUserFB(name, email, password, token, facebookID) {
    console.log('TOKEN:', token);
    var data = { name: name, email: email, password: password, facebookID: facebookID };
    axios.post('https://crave-scoop.herokuapp.com/register-fb', data).then((response) => {
      this.getUserLegit(response.data.sessionId, response.data.userId);
    }).catch(e => {
      console.log(e);
      Alert.alert('That email is already in use!');
      this.props.dispatch({ type: 'FINISH_LOADING' });
      this.setState({ profilePresented: false, loginFormPresented: false });
    });
  }

  createUser(name, email, password, facebookID) {
    var data = { name: name, email: email, password: password, facebookID: facebookID };
    axios.post('https://crave-scoop.herokuapp.com/register', data).then((response) => {
      this.getUserLegit(response.data.sessionId, response.data.userId);
    }).catch(e => {
      console.log(e);
      this.props.dispatch({ type: 'FINISH_LOADING' });
      this.setState({ profilePresented: false, loginFormPresented: false });
      setTimeout(() => {Alert.alert('That email is already in use!')}, 1000);
    });
  }

  signInFacebook = async() => {
    let accessToken = '';
    this.setState({initialLoading: true});
    this.props.dispatch({ type: 'START_LOADING' });
    await Expo.Facebook.logInWithReadPermissionsAsync('1565112886889636', { permissions: ['public_profile', 'email'], behavior: 'web' }).then(async(response) => {

      switch(response.type) {
        case 'success':

          const fbProfile = await axios.get('https://graph.facebook.com/me?access_token=' + response.token);

          let fbName = fbProfile.data.name.split(' ');
          const fbPic = await fetch('https://graph.facebook.com/v2.10/' + fbProfile.data.id + '/picture?access_token=' + response.token);
          const fbEmail = await fetch('https://graph.facebook.com/v2.10/me?fields=email&access_token=' + response.token)
            .then(async(r) => r.json()
          ).then(async(data) => {
            console.log(data);
            this.createUserFB(fbName[0], data.email, 'fb', response.token, data.id);
            const pic = await fetch('https://graph.facebook.com/v2.10/' + fbProfile.data.id + '/picture?access_token=' + response.token);
            await AsyncStorage.setItem(Keys.PICTURE, pic.url);
          });
          break;
          // this.createUser(fbName[0], 'null2ggggg', 'null', response.token, fbProfile.data.id);
          // return;
          break;
          // this.createUser()
          // --------------------------

          const res = await axios.get('https://crave-scoop.herokuapp.com/login-fb/' + fbProfile.data.id);
          if(res.status == 200) {
            // user exists
            await AsyncStorage.setItem(Keys.USER_ID, res.data._id);
            this.getUser();
          } else {
            // user doesnt exist
            await AsyncStorage.setItem(Keys.FACEBOOK_ID, response.token);

            let name = fbProfile.data.name.split(' ');
            const pic = await fetch('https://graph.facebook.com/v2.10/' + fbProfile.data.id + '/picture?access_token=' + response.token);
            // save static user data
            await AsyncStorage.setItem(Keys.PICTURE, pic.url);
            await AsyncStorage.setItem(Keys.FACEBOOK_PROFILE_ID, fbProfile.data.id);
            await AsyncStorage.setItem(Keys.FACEBOOK_TOKEN, response.token);
            // create the user
            await this.createUser(name[0], 'dummy@yahoo.com', '99223', 'null', response.token, fbProfile.data.id);
          }

          return response;
        case 'cancel':
        this.props.dispatch({ type: 'FINISH_LOADING' });
          return null;
        default:
          console.log('bruuuuh');
          return 'naaah fam';
      }
    });
  }

  _createProfileModalPresented = (status, user) => {

    this.setState({ profilePresented: true});

    return;
    if(this.state.profilePresented === false){
      this.setState({ profilePresented: true });
    } else if(this.state.profilePresented === true){
      this.setState({profilePresented: false });
      if(status) {
        this.props.dispatch({ type: 'LOGIN_SUCCESSFUL', user: user });
        this.props.dispatch({type: 'START_PLACES' });
      } else {
        setTimeout(() => {
          Alert.alert('We couldn\'t make your account at this time');
        }, 1000);
      }
    }
  }

  _dismissCreateProfile = () => {
    this.setState({ profilePresented: false });
  }

  presentLoginForm = () => {
    this.setState({ loginFormPresented: true });
  }

  _dismissLoginForm = () => {
    this.setState({ loginFormPresented: false });
  }

  _handleLogin = (email, pw) => {
    console.log('try login');
    let data = { email: email, password: pw };
    axios.post('https://crave-scoop.herokuapp.com/auth/login', data).then(response => {
      console.log(response);
      AsyncStorage.setItem(Keys.USER_ID, response.data.userId, () => {
        AsyncStorage.setItem(Keys.SESSION_ID, response.data.sessionId, () => {
          axios.get(URLS.getUser(response.data.sessionId, response.data.userId)).then(user => {
            this.props.dispatch({ type: 'LOGIN_SUCCESSFUL', user: user.data });
            this.props.dispatch({ type: 'START_PLACES' });
          }).catch(e => {
            this.setState({ loginFormPresented: false });
            setTimeout(() => {Alert.alert('Could not login at this time')}, 1000);
          });
        });
      });
    }).catch(error => {
      console.log(error.response);
      this.setState({ loginFormPresented: false });
      setTimeout(() => { Alert.alert('Could not login at this time')}, 1000);
    });
  }

  createGuestUser() {
    axios.post('https://crave-scoop.herokuapp.com/register-guest').then((response) => {
      this.getUserLegit(response.data.sessionId, response.data.userId);
    }).catch(e => {
      console.log(e);
      this.props.dispatch({ type: 'FINISH_LOADING' });
      this.setState({ profilePresented: false, loginFormPresented: false });
      setTimeout(() => {Alert.alert('Error logging in!')}, 1000);
    });
  }

  _goToPlacesScreen = () => {
    this.props.navigation.dispatch({ type: NavActionTypes.NAVIGATE_PLACES });
  };

  _dummyLogin = () => {
    let loginSuccess = true;
    if (loginSuccess) {
      this.props.dispatch({type: 'LOGIN_SUCCESSFUL'});
    }
  }

  render() {
    let {width, height} = Dimensions.get('window');
    let halfHeight = height / 2;
    return (

        <View style={styles.mainContainer} >
          <Image style={styles.backgroundImage} source={require('../assets/images/icecream-background.png')} />
          <Modal animationType={"slide"} transparent={false} visible={this.state.profilePresented} onRequestClose={() => {console.log('modal')}} >
              <CreateProfileModal dismissFunc={this._dismissCreateProfile.bind(this)} createUser={this.createUser.bind(this)} />
          </Modal>

          <Modal animationType={'slide'} transparent={false} visible={this.state.loginFormPresented} >
            <LoginForm dismissFunc={this._dismissLoginForm.bind(this)} loginFunc={this._handleLogin.bind(this)} />
          </Modal>

        {/*  <View style={styles.welcomeContainer} >
            <Image source={require('../assets/images/cupcake.png')} style={styles.image} />
            <Text color='white' style={styles.welcomeMessage} >
              Welcome to your Daily Crave. { this.props.text }
            </Text>
          </View> */}

          <View style={styles.buttonContainer} >
            <RoundButton title='Continue with Facebook' onPress={this.signInFacebook} bgColor='white' textColor='#f29e39' style={{ flex:1 }} />
            <RoundButton title='Create Account' onPress={this._createProfileModalPresented} style={{ flex:1 }}/>
            <TouchableOpacity onPress={this.presentLoginForm}  >
              <Text style={styles.loginText}>Already have an account? <Text style={{ textDecorationLine: 'underline' }}>Login</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.createGuestUser() }}>
              <Text style={styles.skipText}>Skip for Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { console.log('hittas') }} >
            <Text style={styles.termsText}>Terms of Service</Text>
          </TouchableOpacity>
          {this.props.initialLoading ?
          <View style={{ position: 'absolute', top: -32, left: -32,right:-32,bottom:-32, backgroundColor: 'white' }}>
            <ActivityIndicator animating={this.props.initialLoading} size='large' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
          </View>
          : null }
        </View>

    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',

  },
  backgroundImage: {
    position: 'absolute',
    zIndex: 0,
    left: 0, right: 0, top: 0, bottom: 0,
    // flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 0,
    marginRight: 32, marginLeft: 32
  },
  image: {
    tintColor: 'white',
  },
  underline: {
    marginBottom: 32,
    height: 2,
    marginLeft: 32, marginRight: 32,
    backgroundColor: 'gray'
  },
  welcomeMessage: {
    fontSize: 32,
    textAlign: 'left',
    color: 'white',
    lineHeight: 0,
    fontWeight: 'bold',
    marginLeft: 8, marginRight: 8,
    marginTop: 32
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 200,
    marginLeft: 32, marginRight: 32,
    // width: Dimensions.get('window').width - (Dimensions.get('window').width/10),
  },
  termsText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    bottom: 32,
    backgroundColor: 'transparent'
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent'
  },
  skipText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    marginTop: 16,
    backgroundColor: 'transparent'
  },
  heart: {
    height: 16,
    width: 16,
  },
});

var mapStateToProps = (state) => {
  return {
    navigator: state.nav,
    isLoggedIn: state.auth.isLoggedIn,
    // user: state.user.user,
    _user: state.auth,
    initialLoading: state.loading.loading

  }
}

export default connect(mapStateToProps)(HomeScreen);
