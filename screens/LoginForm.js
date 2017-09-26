import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import * as Colors from '../colors/colors';

class LoginForm extends React.Component {

  static propTypes = {
    dismissFunc: React.PropTypes.func,
    loginFunc: React.PropTypes.func
  }

  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View style={styles.container} >

        <TouchableOpacity style={{ position: 'absolute', left: 0, top: 64, marginLeft: 24, zIndex: 4 }} onPress={this.props.dismissFunc} >
          <Image style={{ height: 24, width: 24 }} source={require('../assets/images/close.png')} />
        </TouchableOpacity>

        <View style={styles.loginHeader} >
          <Text style={styles.loginHeaderText}>LOGIN</Text>
        </View>

        <View style={styles.fieldView} >
          <View style={styles.field}>
            <TextInput style={styles.textInput}
              placeholder={'Email'}
              autoCapitalize = {'none'}
              autoCorrect={false}
              onChangeText={(email) => this.setState({ email: email }) }
              value={this.state.email}
            />
          </View>
          <View style={styles.field}>
            <TextInput style={styles.textInput}
              placeholder={'Password'}
              autoCapitalize = {'none'}
              autoCorrect={false}
              onChangeText={(pw) => this.setState({ password: pw }) }
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.loginButton} >
          <RoundButton title='LOGIN' bgColor={Colors.DARK_BLUE} onPress={() => {this.props.loginFunc(this.state.email, this.state.password)}} borderOn={false} />
        </View>

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
    justifyContent: 'center'
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
