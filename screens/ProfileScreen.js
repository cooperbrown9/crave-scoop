import React from 'react';
import { StyleSheet, StatusBar, Platform, View, Text, TouchableOpacity, Image, AsyncStorage, ActivityIndicator, Dimensions } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import * as Colors from '../colors/colors.js';import UserID from '../test-user/user.js';
import axios from 'react-native-axios';
import CustomNavBar from '../ui-elements/custom-nav-bar';
import * as Keys from '../local-storage/keys.js';
// import ProfileModel from '../models/profile-model.js';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({
    header: null,
  });
  state = {
    user: {
      name: '',
      email: '',
      zipcode: '',
      password: '',

    },
    userLocation: '',
    profilePic: 'http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png'
  }

  static propTypes = {
    name: React.PropTypes.string,
    zipcode: React.PropTypes.string,
    dismissFunc: React.PropTypes.func,
    logOutFunc: React.PropTypes.func,
    renderFavorites: React.PropTypes.func,
    loading: React.PropTypes.bool
  };

  static defaultProps = {
    loading: false
  }

  async componentDidMount(){
    await this.getProfile();
    // if(this.state.user.zipcode != '') {
      this.getLocation();
    // }
  }

  componentWillUnmount() {
    this.setState({loading: false});
  }

  async logOutReset() {
    //Also navigates to home screen after log-out
    await Keys.resetKeys(() => {
      this.props.logOutFunc();
      this.props.dismissFunc();
    });
  }

  async getLocation() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:99223&key=AIzaSyA7APhFiG55kTt8p38sfGoqaGEmB908YJk')
      .then((response) => {
        this.setState({userLocation: response.data.results[0].address_components[1].long_name + ', ' + response.data.results[0].address_components[3].long_name });
      })
      .catch((error) => {
          console.log(error);
      });
  }

  renderFavoritesWrapper = () => {
    this.setState({loading: true});
    this.props.renderFavorites();
  }

  async getProfile() {
    this.setState({loading: true});

    const id = await AsyncStorage.getItem(Keys.USER_ID);
    const sessionID = await AsyncStorage.getItem(Keys.SESSION_ID);

    await axios.get('https://crave-scoop.herokuapp.com/user/' + sessionID + '/' + id).then(async(response) => {

      await AsyncStorage.getItem(Keys.PICTURE, (err, result) => {
        this.setState({user: response.data, profilePic: result || this.state.profilePic, loading: false});
      });

      // was this
      // const picUrl = await AsyncStorage.getItem(Keys.PICTURE);
      // this.setState({user: response.data, profilePic: picUrl, loading: false});

    }).catch(error => {
      console.log('error fetching restaurants');
    });
  }

  _editProfile = () => {
    console.log('yuh');
  };

  render() {
    const { user } = this.state;
    const frame = Dimensions.get('window');
    return(
      <View style={styles.container} >
        <StatusBar
          barStyle="dark-content"
        />
        <CustomNavBar
          title={'SETTINGS'}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/close.png')}/>}
          leftOnPress={this.props.dismissFunc}
          rightButton={<Text style={styles.navBarRightButton}>Log Out</Text>}
          rightOnPress={() => this.logOutReset()}
          styles={styles.navBar}
          />
        <View style={styles.infoView} >
          <View style={styles.imageView}>

              <Image style={styles.image} source={{uri: this.state.profilePic}}/>
          </View>

          <Text style={styles.name} textColor='black'>{this.state.user.name}</Text>
          <Text style={styles.location} textColor='grey'>{this.state.userLocation}</Text>

          <View style={styles.button}>
            <RoundButton title='EDIT PROFILE' onPress={this._editProfile} bgColor={Colors.DARK_BLUE} textColor='white' borderOn={false}/>
          </View>

        </View>

          <View style={styles.optionsContainer}>

            <View style={styles.favoritesView}>
                <View >
                  <Image style={styles.options_Image} source={require('../assets/images/heart.png')} ></Image>
                </View>

                <TouchableOpacity style={styles.optionsView_Text} onPress={this.renderFavoritesWrapper}>
                  <Text style={styles.options_Text} >Favorites</Text>
                </TouchableOpacity>

                <View style={{marginTop: 12}}>
                  <Image style={styles.options_Arrow} source={require('../assets/images/right-arrow.png')} ></Image>
                </View>

            </View>
            <View style={styles.underline}></View>
            {/*
            <View style={styles.notificationsView}>

              <View >
                <Image style={styles.options_Image} source={require('../assets/images/interface.png')} ></Image>
              </View>

              <TouchableOpacity style={styles.optionsView_Text} >
                <Text style={styles.options_Text} >Notifications</Text>
              </TouchableOpacity>
              <View style={{marginTop: 12}}>
                <Image style={styles.options_Arrow} source={require('../assets/images/right-arrow.png')} ></Image>
              </View>

            </View>

            <View style={styles.underline}></View>
            */}

          </View>
          {this.state.loading ?
          <View style={{position: 'absolute', top: 0, left: 0,height: frame.height, width: frame.width, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <ActivityIndicator animating={this.state.loading} size='large' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
          </View>
          : null }
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch'
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  favoritesView:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    height: 36
  },
  notificationsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    height: 36
  },
  imageView: {
    alignItems: 'center'
  },
  navBarLeftButton:{
    height: 12,
    width: 12,
    marginRight: 36
  },
  navBarRightButton:{
    height: 16,
    ...Platform.select({
      ios: {
        width: 64,
        marginLeft: 36,
      },
      android: {
        width: 100,
        marginLeft: 36,
        height:20
      },
    }),
    color: 'red',
    fontFamily: 'varela-round'
  },
  image: {
    height: 72,
    width: 72,
    marginTop: 32,
    borderRadius: 36,
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'varela-round'
  },
  location: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
    color: 'gray',
    fontFamily: 'varela-round'
  },
  button: {
    alignItems: 'stretch',
    marginLeft: 84,
    marginRight: 84
  },
  navBar:{
    ...Platform.select({
      android: {
        marginTop: 0,
      },
    }),
  },
  settingOptionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  optionsContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 32,
    marginRight: 32
  },
  options_Image: {
    height: 20,
    width: 20,
    marginTop: 1,
    tintColor: 'grey'
  },
  optionsView_Text: {
    flex: 1,
    marginLeft: 12
  },
  options_Text: {
    fontSize: 18,
    fontFamily: 'varela-round',
    color: Colors.DARK_GREY
  },
  options_Arrow: {
    height: 12,
    width: 12,
    tintColor: Colors.BLUE
  },
  underline: {
    marginBottom: 32,
    height: 2,
    marginLeft: 32,
    backgroundColor: Colors.LIGHT_GREY
  },
});

var mapStateToProps = state => {
  return {
    currentVendors: state.vendorHelper.vendors,
    user: state.auth.user
    // picture:
  }
}

// mapStateToProps
