import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import DARK_BLUE from '../colors/colors.js';
import UserID from '../test-user/user.js';
import axios from 'react-native-axios';
import CustomNavBar from '../ui-elements/custom-nav-bar';
// import ProfileModel from '../models/profile-model.js';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({
    header: null,

  });
  state = {
    user: {},

  }
  static propTypes = {
    name: React.PropTypes.string,
    location: React.PropTypes.string,
    person: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      location: React.PropTypes.string.isRequired
    }),
    dismissFunc: React.PropTypes.func.isRequired
  };

  componentDidMount(){
    this.getProfiles();
  }
  getProfiles = () => {
    axios.get('https://crave-scoop.herokuapp.com/get-user/' + UserID).then(response => {
      this.setState({user: response.data});
      // console.log(this.state.restaurants);
    }).catch(error => {
      // console.log('error fetching restaurants');
    });
  }

  _editProfile = () => {
    console.log('yuh');

    for (var i = 0; i < 10; i++) {
      console.log(i);
    }

  };

  render() {

    return(
      <View style={styles.container} >
        <CustomNavBar
          title={this.props.name}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/close.png')}/>}
          leftOnPress={this.props.dismissFunc}
          rightButton={<Text style={styles.navBarRightButton}>Log Out</Text>}/>
        <View style={styles.infoView} >

          <View style={styles.imageView}>

              <Image style={styles.image} source={require('../assets/images/cupcake.png')}/>
          </View>

          <Text style={styles.name} textColor='black'>{this.state.user.name}</Text>
          <Text style={styles.location} textColor='grey'>{this.state.user.location}</Text>

          <View style={styles.button}>
            <RoundButton title='EDIT PROFILE' onPress={this._editProfile} bgColor='blue' textColor='white' borderOn={false}/>
          </View>

        </View>

        <View style={styles.settingOptionsContainer} >

          <View style={styles.optionsContainer}>

            <View style={styles.optionView}>

              <View >
                <Image style={styles.options_Image} source={require('../assets/images/heart.png')} color='red'></Image>
              </View>

              <View style={styles.optionsView_Text} >
                <Text style={styles.options_Text} color='grey'>Favorites</Text>
              </View>

              <View >
                <Image style={styles.options_Arrow} source={require('../assets/images/right-arrow.png')} ></Image>
              </View>
            </View>
            <View style={styles.underline} backgroundColor='grey'></View>


            <View style={styles.optionView}>

              <View >
                <Image style={styles.options_Image} source={require('../assets/images/heart.png')} ></Image>
              </View>

              <View style={styles.optionsView_Text} >
                <Text style={styles.options_Text} color='grey'>Notifications</Text>
              </View>

              <View >
                <Image style={styles.options_Arrow} source={require('../assets/images/right-arrow.png')} ></Image>
              </View>

            </View>
            <View style={styles.underline} backgroundColor='grey'></View>
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
    marginTop: 32
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
    marginBottom: 16
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
  optionView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
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
    marginLeft: 32
  },


});
