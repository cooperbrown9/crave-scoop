import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar, Text, TextInput, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import * as Colors from '../colors/colors';

class LoginForm extends Component {

  static propTypes = {
    dismissFunc: PropTypes.func,
    loginFunc: PropTypes.func
  }

  state = {
    email: '',
    password: '',
    loading: false
  }

  login = () => {
    this.setState({ loading: true });
    this.props.loginFunc(this.state.email, this.state.password);
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container} >
        <StatusBar
          barStyle="dark-content"
        />

      <TouchableOpacity style={{ position: 'absolute', left: 0, top: 20, marginLeft: 24, zIndex: 4 }} onPress={this.props.dismissFunc} >
          <Image style={{ height: 24, width: 24 }} source={require('../assets/images/close.png')} />
        </TouchableOpacity>

        <View style={styles.loginHeader} >
          <Text style={styles.loginHeaderText}>LOGIN</Text>
        </View>

        <View style={styles.fieldView} >
          <View style={styles.field}>
            <TextInput style={styles.textInput}
              placeholder={'Email'}
              underlineColorAndroid={'transparent'}
              autoCapitalize = {'none'}
              autoCorrect={false}
              onChangeText={(email) => this.setState({ email: email }) }
              value={this.state.email}
            />
          </View>
          <View style={styles.field}>
            <TextInput style={styles.textInput}
              placeholder={'Password'}
              underlineColorAndroid={'transparent'}
              autoCapitalize = {'none'}
              autoCorrect={false}
              onChangeText={(pw) => this.setState({ password: pw }) }
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.loginButton} >
          <RoundButton title='LOGIN' bgColor={Colors.DARK_BLUE} onPress={() => {this.login();/*this.props.loginFunc(this.state.email, this.state.password)*/}} borderOn={false} />
        </View>

        {(this.state.loading) ?
        <View style={{position: 'absolute', top: 0, left: 0,height: height, width: width, backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 4 }} >
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
    flexDirection: 'column'
  },
  fieldView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 64,
    marginRight: 64,
    marginTop: 32
  },
  field: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 48
  },
  loginHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16
  },
  loginHeaderText: {
    fontSize: 24,
    fontFamily: 'varela-round',
    textAlign: 'center',
    color: 'black'
  },
  textInput: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'varela-round',
    color: 'black'
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 64,
    marginRight: 64
  }
});

export default LoginForm;
