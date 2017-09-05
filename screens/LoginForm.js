import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
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

        <View style={styles.loginHeader} >
          <Text style={styles.loginHeaderText}>LOGIN</Text>
        </View>

        <View style={styles.fieldView} >
          <View style={{flex: 1, bottomBorderColor: 'black', bottomBorderWidth: 2}}>
            <TextInput style={styles.textInput}
              placeholder={'Email'}
              autoCapitalize = {'none'}
              autoCorrect={false}
              onChangeText={(email) => this.setState({ email: email }) }
              value={this.state.email}
            />
          </View>
          <View style={{flex: 1, bottomBorderColor: 'black', bottomBorderWidth: 2}}>
            <TextInput style={styles.textInput}
              placeholder={'Password'}
              autoCapitalize = {'none'}
              autoCorrect={false}
              onChangeText={(pw) => this.setState({ password: pw }) }
              value={this.state.password}
            />
          </View>
        </View>
        <View style={styles.loginButton} >
          <RoundButton title='LOGIN' bgColor={Colors.BLUE}/>
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
    marginRight: 64
  },
  loginHeader: {
    height: 64,
    marginTop: 64,
    alignItems: 'stretch'
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
    fontFamily: 'varela-round'
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 64,
    marginRight: 64
  }
});

export default LoginForm;
