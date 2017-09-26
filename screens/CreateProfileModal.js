import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Text, TouchableOpacity,
  Image, TextInput, AsyncStorage, Dimensions,
  ActivityIndicator, Alert
} from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import * as Colors from '../colors/colors.js';
import UserID from '../test-user/user.js';
import axios from 'react-native-axios';
import * as Keys from '../local-storage/keys.js';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import { connect } from 'react-redux';

class CreateProfileModal extends Component {
  state = {
    name: '',
    passwordVisible: true,
    zipcode: '',
    password: '',
    email: '',
    loading: false
  }

  static propTypes:{
    dismissFunc: React.PropTypes.func,
    getUser: React.PropTypes.func,
    sendStatus: React.PropTypes.func,
    createAndDismiss: React.PropTypes.func,
    createUser: React.PropTypes.func
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  createUser() {
    this.setState({ loading: true });
    this.props.createUser(this.state.name, this.state.email, this.state.password, 'null', 'null');
  }

  errorOnCreate() {
    this.setState({ loading: false }, () => {
      // this.props.createAndDismiss(false);
    });
  }

  passwordVisible = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  }

  render () {
    var icon = this.state.passwordVisible ? require('../assets/images/eye-close.png') : require('../assets/images/eye-open.png');
    const frame = Dimensions.get('window');
    return(
        <View style={styles.container}>
          <StatusBar
            barStyle="dark-content"
          />

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Account</Text>
          </View>

          <View style={styles.textInputsContainer}>
            <Text style={styles.textInputTitle}></Text>
            <View style={styles.fieldContainer}>
              <TextInput style={styles.textInput}
                placeholder={'Name'}
                autoCapitalize = {'none'}
                autoCorrect={false}
                onChangeText={(name) => this.setState({ name: name }) }
                value={this.state.name}
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInput style={styles.textInput}
                placeholder={'Zip Code'}
                autoCapitalize = {'none'}
                autoCorrect={false}
                onChangeText={(zip) => this.setState({ zipcode: zip }) }
                value={this.state.location}
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInput style={styles.textInput}
                placeholder={'Email'}
                autoCapitalize = {'none'}
                autoCorrect={false}
                onChangeText={(em) => this.setState({ email: em }) }
                value={this.state.email}
              />
            </View>

            <View style={styles.fieldContainer}>
              <TextInput style={styles.textInput}
                secureTextEntry={this.state.passwordVisible}
                placeholder={'Create Password'}
                autoCapitalize = {'none'}
                autoCorrect={false}
                onChangeText={(pw) => this.setState({password: pw})}
                value={this.state.password}
              />

              <TouchableOpacity onPress={() => this.passwordVisible()} style={{justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={styles.passwordVisibleButton} source={icon}/>
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
                <RoundButton title='Sign Up' onPress={() => this.createUser()} bgColor={Colors.BLUE} color='white' borderOn={false}/>
            </View>

            <View style={styles.loginContainer}>
              <Text style={{fontFamily: 'varela-round'}}>Already have an account?</Text>
              <View style={{ borderBottomColor: '#41d9f4', borderBottomWidth: 1, marginTop: 8}}>
                <TouchableOpacity>
                  <Text style={{color: Colors.BLUE, fontFamily: 'varela-round'}}>Log in!</Text>
                </TouchableOpacity>
              </View>
            </View>

        </View>

        {this.state.loading ?
        <View style={{position: 'absolute', top: 0, left: 0,height: frame.height, width: frame.width, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <ActivityIndicator animating={this.state.loading} size='large' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}} />
        </View>
        : null }

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
    fontFamily: 'varela-round'
  },
  fieldContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
    flexDirection: 'row'
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
    flex: 3,
  },
  textInputTitle:{
    height: 20,
    width: 100,
    color: 'gray',
    marginLeft: 32,
    fontFamily: 'varela-round'
  },
  emailInput:{
    borderColor: 'gray',
  },
  textInput: {
    flex: 1,
    height: 40,
    fontFamily: 'varela-round'
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

export default CreateProfileModal;
