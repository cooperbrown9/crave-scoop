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
  Alert,
  ActivityIndicator
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
import * as Keys from '../local-storage/keys.js';
import PlacesScreen from './PlacesScreen.js';

class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    clicked: false,
    profilePresented: false,
    initialLoading: true
  }

  componentDidMount() {
    // FB App ID 1565112886889636 SECRET: 7765eef11057d8b0e03799d070856e73
    // Keys.setDummyKeys(() => {
    //   console.log('skeddit');
    //   this.checkLogin();
    // });
    setTimeout(() => { this.setState({initialLoading: false}) }, 2000);
    // Keys.resetKeys(() => {
      console.log('skeddit');
      // this.checkLogin();
    // });

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
    // this.getUser();
    this.checkLogin();

  }

  componentWillUnmount() {
    this.setState({initialLoading: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    debugger;
    console.log(nextProps, nextState);
    if(nextProps._user.isLoggedIn) {
      this.props.dispatch({ type: NavActionTypes.NAVIGATE_PLACES });
      return false;
    }
    return true;
  }

  getUser() {
    AsyncStorage.getItem(Keys.USER_ID, (err, result) => {
      // remove this line
      this.setState({userID: result});
      this.props.dispatch(this.getUserHelper(result));
    });
  }

  getUserHelper(id) {
    return function(dispatch) {
      return axios.get('https://crave-scoop.herokuapp.com/get-user/' + id).then(
        response => {
          // dispatch({type: NavActionTypes.GET_USER, user: response.data});
          dispatch({ type: 'LOGIN_SUCCESSFUL', user: response.data });
      }).then(() => {
        dispatch({type: NavActionTypes.NAVIGATE_PLACES});
      }).catch(error => {
        console.log(error);
      })
    }
  }

  async createUser(firstname, lastname, location, facebookID, facebookToken) {
    await axios.put('https://crave-scoop.herokuapp.com/add-user/' + firstname + '/' + lastname + '/' + location + '/' + facebookID + '/' + facebookToken).then((response) => {
      AsyncStorage.setItem(Keys.USER_ID, response.data, () => {
        this.getUser();
      })
    }).catch(error => {
      console.log(error);
    });
  }

  signInFacebook = () => {
    let accessToken = '';
    this.setState({initialLoading: true});
    Expo.Facebook.logInWithReadPermissionsAsync('1565112886889636', { permissions: ['public_profile'], behavior: 'web' }).then(async(response) => {

      switch(response.type) {

        case 'success':

          await AsyncStorage.setItem(Keys.FACEBOOK_ID, response.token);

          const fbProfile = await axios.get('https://graph.facebook.com/me?access_token=' + response.token);

          let name = fbProfile.data.name.split(' ');
          const pic = await fetch('https://graph.facebook.com/v2.10/' + fbProfile.data.id + '/picture?access_token=' + response.token);

          // save static user data
          await AsyncStorage.setItem(Keys.PICTURE, pic.url);
          await AsyncStorage.setItem(Keys.FACEBOOK_PROFILE_ID, fbProfile.data.id);
          await AsyncStorage.setItem(Keys.FACEBOOK_TOKEN, response.token);

          // create the user
          await this.createUser(name[0], name[1], 'The 69', fbProfile.data.id, response.token);
          // this.props.dispatch({type: NavActionTypes.NAVIGATE_PLACES});

          return response;
        case 'cancel':
          return null;
        default:
          console.log('bruuuuh');
          return 'naaah fam';
      }
    });
  }

  _createProfileModalPresented = (status) => {
    if(this.state.profilePresented === false){
      this.setState({ profilePresented: true });
    } else if(this.state.profilePresented === true){
      this.setState({profilePresented: false });
      if(status) {
        this.props.navigation.dispatch({ type: NavActionTypes.NAVIGATE_PLACES});
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

  // _login = () => {
  //   this.props.dispatch({type: NavActionTypes.LOGIN, id: '59765d2df60c01001198f3b5', dispatcher: this.props});
  // }

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
        <Image style={styles.backgroundImage} source={require('../assets/images/icecream-background.png')} >
        <View style={styles.mainContainer} >
          <Modal animationType={"slide"} transparent={false} visible={this.state.profilePresented} >
              <CreateProfileModal dismissFunc={this._dismissCreateProfile.bind(this)} createAndDismiss={this._createProfileModalPresented.bind(this)} />
          </Modal>

        {/*  <View style={styles.welcomeContainer} >
            <Image source={require('../assets/images/cupcake.png')} style={styles.image} />
            <Text color='white' style={styles.welcomeMessage} >
              Welcome to your Daily Crave. { this.props.text }
            </Text>
          </View> */}

          <View style={styles.buttonContainer} >
            <RoundButton title='Continue with Facebook' onPress={this.signInFacebook} bgColor='white' textColor='#f29e39' style={{flex:1}} />
            <RoundButton title='Create Account' onPress={this._createProfileModalPresented} style={{flex:1}}/>
          </View>
          <Text style={styles.termsText}>Terms of Service</Text>
          <View>
            <Text backgroundColor="black">

            </Text>
          </View>

          {this.state.initialLoading ?
          <View style={{position: 'absolute', top: 0, left: 0,height: height, width: width, backgroundColor: 'white' }}>
            <ActivityIndicator animating={this.state.initialLoading} size='large' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
          </View>
          : null }
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  backgroundImage: {
    flex: 1,
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
    marginRight: 32,
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
    marginTop: 32
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 200,
    width: 340
  },
  termsText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    bottom: 32
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
    user: state.user.user,
    _user: state.auth

  }
}

export default connect(mapStateToProps)(HomeScreen);
