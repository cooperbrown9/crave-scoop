import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image,TextInput, AsyncStorage } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import DARK_BLUE from '../colors/colors.js';
import UserID from '../test-user/user.js';
import axios from 'react-native-axios';
import CustomNavBar from '../ui-elements/custom-nav-bar';
import * as Keys from '../local-storage/keys.js';

export default class CreateProfileModal extends React.Component {
  state = {
    firstName: 'Tony',
    user: {}

  }
  static propTypes:{
    dismissFunc: React.PropTypes.func,
  }

  _createUserAndDismissModal = () => {
    const id = '';
    axios.put('https://crave-scoop.herokuapp.com/add-user/' + this.state.firstName + '/user/Spokane/').then(async (response) => {
      await AsyncStorage.setItem(Keys.USER_ID, response.data);
      return response.data;
    }).then((id) => {
      debugger;
      axios.get('https://crave-scoop.herokuapp.com/get-user/' + id + '/').then(async (response) =>{
        await this.setState({user: response.data});
      })
    }).then(() =>
      this.props.dismissFunc()
    )
  }



  render () {
    var icon = this.state.passwordVisible ? require('../assets/images/eye-close.png') : require('../assets/images/eye-open.png');
    return(
        <View style={styles.container}>
          <CustomNavBar
            title={''}
            leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/close.png')}/>}
            leftOnPress={this.props.dismissFunc}/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Account</Text>
          </View>

          <View style={styles.textInputsContainer}>

            <Text style={styles.textInputTitle}>Email Address</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 32, marginRight: 32, flexDirection: 'row',}}>
              <TextInput style={{height: 40, flex:1,}}
                placeholder={'john.doe@gmail.com'}
                autoCapitalize = {'none'}
                onChangeText={(username) => this.setState({firstName:username})}
              />
            </View>

            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 32, marginRight: 32, flexDirection: 'row', }}>
              <TextInput style={{height: 40, flex:1}}
                secureTextEntry={this.state.passwordVisible}
                placeholder={'Create Password'}
                autoCapitalize = {'none'}
                />
              <TouchableOpacity onPress={this._passwordVisible} style={{justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={styles.passwordVisibleButton} source={icon}/>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <RoundButton title='Sign Up' onPress={this._createUserAndDismissModal.bind(this)} bgColor='#41d9f4' color='white' borderOn={false}/>
            </View>
            <View style={styles.loginContainer}>
              <Text >Already have an account?</Text>
              <View style={{ borderBottomColor: '#41d9f4', borderBottomWidth: 1}}>
                <TouchableOpacity>
                  <Text style={{color: '#41d9f4'}}>Log in!</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',

  },
  titleContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'


  },
  title:{
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',

  },
  navBarLeftButton:{
    height: 12,
    width: 12,
    marginRight: 36
  },
  button: {
    alignItems: 'stretch',
    marginTop:30,
    marginLeft: 64,
    marginRight: 64
  },
  passwordVisibleButton:{
    height: 24,
    width: 24,
    tintColor: '#41d9f4'
  },
  textInputsContainer:{
    flex: 2,
  },
  textInputTitle:{
    height: 20,
    width: 100,
    color: 'gray',
    marginLeft: 32
  },
  emailInput:{
    borderColor: 'gray',

  },
  loginContainer:{
    alignItems: 'center',
  },
  underline: {
    marginBottom: 20,
    height: 1,
    marginLeft: 32,
    marginRight: 32,
  },


});
