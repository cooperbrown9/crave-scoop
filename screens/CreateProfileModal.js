import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity,
  Image,TextInput, AsyncStorage, Dimensions,
  ActivityIndicator, Alert
} from 'react-native';
import RoundButton from '../ui-elements/round-button.js';
import DARK_BLUE from '../colors/colors.js';
import UserID from '../test-user/user.js';
import axios from 'react-native-axios';
import CustomNavBar from '../ui-elements/custom-nav-bar';
import * as Keys from '../local-storage/keys.js';
import * as NavActionTypes from '../action-types/navigation-action-types.js';
import { connect } from 'react-redux';

class CreateProfileModal extends React.Component {
  state = {
    name: '',
    passwordVisible: true,
    location: 'Spokane',
    loading: false
  }

  static propTypes:{
    dismissFunc: React.PropTypes.func,
    getUser: React.PropTypes.func,
    sendStatus: React.PropTypes.func
  }

  componentWillUnmount() {
    this.setState({ loading: false });
  }

  createUser() {
    this.setState({ loading: true });
    axios.put('https://crave-scoop.herokuapp.com/add-user/' + this.state.name + '/' + ' /' + this.state.location + '/' + 'null' + '/' + 'null')
      .then((response) => {
        axios.get('https://crave-scoop.herokuapp.com/get-user/' + response.data).then(async(user) => {
          await AsyncStorage.setItem(Keys.USER_ID, user.data._id);
          this.props.dismissFunc(true);
        }).catch((error) => {
          this.errorOnCreate();
        })
      }).catch(() => {
        this.errorOnCreate();
      });
  }

  errorOnCreate() {
    this.setState({loading: false}, () => {
      debugger;
      this.props.dismissFunc(false);
    });

  }

  passwordVisible = () => {
    this.setState({passwordVisible: !this.state.passwordVisible});
  }

  render () {
    var icon = this.state.passwordVisible ? require('../assets/images/eye-close.png') : require('../assets/images/eye-open.png');
    const frame = Dimensions.get('window');
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

            <Text style={styles.textInputTitle}></Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 32, marginRight: 32, flexDirection: 'row',}}>
              <TextInput style={{height: 40, flex:1,}}
                placeholder={'Name'}
                autoCapitalize = {'none'}
                onChangeText={(name) => this.setState({ name: name }) }
                value={this.state.name}
              />
            </View>

            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginLeft: 32, marginRight: 32, flexDirection: 'row', }}>
              <TextInput style={{height: 40, flex:1}}
                secureTextEntry={this.state.passwordVisible}
                placeholder={'Create Password'}
                autoCapitalize = {'none'}
                />
              <TouchableOpacity onPress={() => this.passwordVisible()} style={{justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={styles.passwordVisibleButton} source={icon}/>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <RoundButton title='Sign Up' onPress={() => this.createUser()} bgColor='#41d9f4' color='white' borderOn={false}/>
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

export default CreateProfileModal;
