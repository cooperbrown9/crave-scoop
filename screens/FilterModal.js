import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import RoundButton from '../ui-elements/round-button.js';
import * as Colors from '../colors/colors.js';
import CustomNavBar from '../ui-elements/custom-nav-bar.js';

export default class FilterModal extends React.Component {

  static propTypes = {
    dismissFunc: React.PropTypes.func.isRequired
  };

  state = {
    favoriteChecked: false,
    openNowChecked: false
  };

  _checkFavorite = () => {
    this.setState({favoriteChecked: !this.state.favoriteChecked});
  }

  _checkOpenNow = () => {
    this.setState({openNowChecked: !this.state.openNowChecked});
  }

  render() {
    var favCheck = this.state.favoriteChecked ? require('../assets/images/check-mark.png') : null;
    var openNowCheck = this.state.openNowChecked ? require('../assets/images/check-mark.png') : null;

    return(
      <View style={styles.container}  >


        <CustomNavBar
          title={'Filters'}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/close.png')}/>}
          rightButton={<Text style={styles.navBarRightButton}>Reset</Text>}
          leftOnPress={this.props.dismissFunc}/>

        <Text style={{height: 24, width: 120, fontSize: 20, fontWeight: 'bold', marginTop: 16, marginLeft: 16, }} textColor='black' >My Crave</Text>

        <View style={styles.optionsView} >
          <Text style={styles.text}>Favorites</Text>
            <TouchableOpacity onPress={this._checkFavorite} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.favoriteChecked) ? Colors.DARK_BLUE : 'transparent', width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: Colors.DARK_GREY}} >
              <Image source={favCheck} style={{width: 18, height: 18}} />
            </TouchableOpacity>
          </View>
        <View style={styles.underline}></View>

        <View style={styles.optionsView} >
          <Text style={styles.text}>Open Now</Text>
            <TouchableOpacity onPress={this._checkOpenNow} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.openNowChecked) ? Colors.DARK_BLUE : 'transparent', width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: Colors.DARK_GREY}} >
              <Image source={openNowCheck} style={{width: 18, height: 18}} />
            </TouchableOpacity>
        </View>
        <View style={styles.underline}></View>
        <Text style={{height: 24, width: 120, fontSize: 20, fontWeight: 'bold', marginTop: 42, marginLeft: 16, }} textColor='black' >Dietary</Text>


        <View style={styles.buttonStyle} >
          <RoundButton title='VIEW PLACES' bgColor={Colors.DARK_BLUE} borderOn={false} onPress={this.props.dismissFunc}/>
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
  leftButton: {
    height: 16,
    width: 16,
    marginLeft: 16,
    marginTop: 12,
  },
  closeButton: {
    height: 16,
    width: 16,
  },
  resetText: {

  },
  titleLabel: {
    height: 20,
    fontSize: 14,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 8,
    color: Colors.CREAM,
    marginLeft: 32
  },
  rightButton: {
    height: 16,
    width: 48,
    marginRight: 16,
    marginTop: 12,
    color: 'red',
  },
  optionsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24,
  },
  checkbox: {
    backgroundColor: 'blue',
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  text: {
    fontSize: 18,
  },
  underline: {
    backgroundColor: Colors.LIGHT_GREY,
    height: 2,
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'stretch',
    marginRight: 64,
    marginLeft: 64,
    marginTop: 128
  }
})
