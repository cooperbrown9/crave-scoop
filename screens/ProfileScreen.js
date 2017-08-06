import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
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
      first_name: '',
      last_name: '',
      location: ''
    },
  }

  static propTypes = {
    name: React.PropTypes.string,
    location: React.PropTypes.string,
    dismissFunc: React.PropTypes.func,
    logOutFunc: React.PropTypes.func
  };

  async logOutReset() {
    await Keys.resetKeys(() => {
      this.props.logOutFunc();
      this.props.dismissFunc();
    });

    
  }

  componentDidMount(){
    this.getProfiles();
    console.log(this.state.user);
  }
  async getProfiles() {

    const id = await AsyncStorage.getItem('@user_id:key');

    axios.get('https://crave-scoop.herokuapp.com/get-user/' + id + '/').then(async(response) =>{

      await this.setState({user: response.data});
      console.log(this.state.user);

    }).catch(error => {
      console.log('error fetching restaurants');
    });
  }

  _editProfile = () => {
    console.log('yuh');

    for (var i = 0; i < 10; i++) {
      console.log(i);
    }

  };

  render() {
    const { user } = this.state;
    return(
      <View style={styles.container} >
        <CustomNavBar
          title={''}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/close.png')}/>}
          leftOnPress={this.props.dismissFunc}
          rightButton={<Text style={styles.navBarRightButton}>Log Out</Text>}
          rightOnPress={() => this.logOutReset()}
          />
        <View style={styles.infoView} >
          <View style={styles.imageView}>

              <Image style={styles.image} source={require('../assets/images/Emma-Watson.png')}/>
          </View>

          <Text style={styles.name} textColor='black'>{this.state.user.first_name + ' ' + this.state.user.last_name}</Text>
          <Text style={styles.location} textColor='grey'>{this.state.user.location}</Text>

          <View style={styles.button}>
            <RoundButton title='EDIT PROFILE' onPress={this._editProfile} bgColor={Colors.DARK_BLUE} textColor='white' borderOn={false}/>
          </View>

        </View>


          <View style={styles.optionsContainer}>

            <View style={styles.favoritesView}>
                <View >
                  <Image style={styles.options_Image} source={require('../assets/images/heart.png')} ></Image>
                </View>

                <TouchableOpacity style={styles.optionsView_Text} >
                  <Text style={styles.options_Text} >Favorites</Text>
                </TouchableOpacity>

                <View style={{marginTop: 7}}>
                  <Image style={styles.options_Arrow} source={require('../assets/images/right-arrow.png')} ></Image>
                </View>

            </View>




            <View style={styles.notificationsView}>

              <View >
                <Image style={styles.options_Image} source={require('../assets/images/heart.png')} ></Image>
              </View>

              <TouchableOpacity style={styles.optionsView_Text} >
                <Text style={styles.options_Text} >Notifications</Text>
              </TouchableOpacity>

              <View style={{marginTop: 7}}>
                <Image style={styles.options_Arrow} source={require('../assets/images/right-arrow.png')} ></Image>
              </View>

            </View>
          </View>

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
    marginBottom: 24,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 36

  },
  notificationsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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
    width: 64,
    marginLeft: 36,
    color: 'red'
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
    marginTop: 16
  },
  location: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
    color: 'gray'
  },
  button: {
    alignItems: 'stretch',
    marginLeft: 84,
    marginRight: 84
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
    fontSize: 18
  },
  options_Arrow: {
    height: 12,
    width: 12,
    tintColor: 'red'
  },
  underline: {
    marginBottom: 20,
    height: 1,
    marginLeft: 32,
    backgroundColor: 'gray'
  },
});

// mapStateToProps
