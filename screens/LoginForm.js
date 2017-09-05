import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

class LoginForm extends React.Component {

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
          <TextInput style={styles.textInput}
            placeholder={'Email'}
            autoCapitalize = {'none'}
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email: email }) }
            value={this.state.email}
          />
          <TextInput style={styles.textInput}
            placeholder={'Password'}
            autoCapitalize = {'none'}
            autoCorrect={false}
            onChangeText={(pw) => this.setState({ password: pw }) }
            value={this.state.password}
          />
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
  loginHeader: {
    height: 64,
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
  }
})
