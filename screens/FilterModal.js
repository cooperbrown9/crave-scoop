import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import CheckBox from 'react-native-check-box';
import RoundButton from '../ui-elements/round-button.js';
import * as Colors from '../colors/colors.js';
import CustomNavBar from '../ui-elements/custom-nav-bar.js';
import axios from 'react-native-axios';
import { connect } from 'react-redux';
import * as NavActionTypes from '../action-types/navigation-action-types.js';

class FilterModal extends React.Component {

  static propTypes = {
    dismissFunc: React.PropTypes.func.isRequired,
    name: React.PropTypes.string,
    filterFunc: React.PropTypes.func,
    renderFavorites: React.PropTypes.func,
    renderNearby: React.PropTypes.func,
    resetVendors: React.PropTypes.func
  };

  state = {
    favoriteChecked: false,
    openNowChecked: false,
    nearMeChecked: false,
    loading: false
  };

  filterVendors = () => {
    this.setState({loading: true});
    if (this.state.nearMeChecked) {
      this.props.renderNearby();
    } else if (this.state.favoriteChecked) {
      this.props.renderFavorites();
    }
  }

  _getVendorsNearby() {
    return function(dispatch) {
      return axios.get('https://crave-scoop.herokuapp.com/geolocate-vendors/47.659195/117.4208805/10').then(
        vendors => dispatch({type: NavActionTypes.NEARBY, vendors: vendors.data})
      )
    }
  }

  _getFavoriteVendors() {
    return function(dispatch) {
      return axios.get('https://crave-scoop.herokuapp.com/get-favorite-vendors/59765d2df60c01001198f3b5').then(
        vendors => dispatch({type: NavActionTypes.FAVORITES, vendors: vendors.data})
      )
    }
  }

  resetVendors() {
    this.setState({loading: true});
    this.props.resetVendors();
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.setState({loading: false});
  }

  _dismissPrototype() {
    this.getVendor();
  }

  _checkFavorite = () => {
    this.setState({favoriteChecked: !this.state.favoriteChecked});
  }

  _checkOpenNow = () => {
    this.setState({openNowChecked: !this.state.openNowChecked});
  }

  _checkNearMe = () => {
    this.setState({nearMeChecked: !this.state.nearMeChecked});
  }

  render() {
    var favCheck = this.state.favoriteChecked ? require('../assets/images/check-mark.png') : null;
    var openNowCheck = this.state.openNowChecked ? require('../assets/images/check-mark.png') : null;
    var nearMeCheck = this.state.nearMeChecked ? require('../assets/images/check-mark.png') : null;
    const frame = Dimensions.get('window');

    return(
      <View style={styles.container} >

        <CustomNavBar
          title={'FILTER'}
          leftButton={<Image style={styles.navBarLeftButton} source={require('../assets/images/close.png')}/>}
          rightButton={<Text style={styles.navBarRightButton}>Reset</Text>}
          leftOnPress={this.props.dismissFunc}
          rightOnPress={() => this.resetVendors()}
        />

        <Text style={{height: 24, width: 120, fontSize: 20, fontWeight: 'bold', marginTop: 16, marginLeft: 16, marginBottom: 16 }} textColor='black' >My Crave</Text>

        <TouchableOpacity onPress={() => this._checkFavorite()} style={styles.optionsView} >
          <Text style={styles.text}>Favorites</Text>
          <TouchableOpacity onPress={this._checkFavorite} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.favoriteChecked) ? Colors.DARK_BLUE : 'transparent', width: 26, height: 26, borderRadius: 4, borderWidth: 1, borderColor: Colors.DARK_GREY}} >
            <Image source={favCheck} style={{width: 16, height: 16}} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.underline}></View>

        <TouchableOpacity onPress={() => this._checkOpenNow()} style={styles.optionsView} >
          <Text style={styles.text}>Open Now</Text>
          <TouchableOpacity onPress={this._checkOpenNow} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.openNowChecked) ? Colors.DARK_BLUE : 'transparent', width: 24, height: 24, borderRadius: 4, borderWidth: 1, borderColor: Colors.DARK_GREY}} >
            <Image source={openNowCheck} style={{width: 16, height: 16}} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.underline}></View>


        <TouchableOpacity onPress={() => this._checkNearMe()} style={styles.optionsView} >
          <Text style={styles.text}>Near Me</Text>
          <TouchableOpacity onPress={this._checkNearMe} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: (this.state.nearMeChecked) ? Colors.DARK_BLUE : 'transparent', width: 24, height: 24, borderRadius: 4, borderWidth: 1, borderColor: Colors.DARK_GREY}} >
            <Image source={nearMeCheck} style={{width: 16, height: 16}} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.underline}></View>
        <Text style={{height: 24, width: 120, fontSize: 20, fontWeight: 'bold', marginTop: 42, marginLeft: 16, }} textColor='black' ></Text>


        <View style={styles.buttonStyle} >
          <RoundButton title='VIEW PLACES' onPress={this.filterVendors} bgColor={Colors.DARK_BLUE} borderOn={false} />
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
  navBarLeftButton:{
    height: 12,
    width: 12,
    marginRight: 36
  },
  navBarRightButton:{
    height: 16,
    width: 64,
    marginLeft: 36,
    color: 'red',
    fontFamily: 'varela-round',
    color: Colors.DARK_BLUE
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
    marginLeft: 32,
    fontFamily: 'varela-round'
  },
  rightButton: {
    height: 16,
    width: 48,
    marginRight: 16,
    marginTop: 12,
    color: 'red',
  },
  optionsView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
  checkbox: {
    backgroundColor: 'blue',
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  text: {
    marginTop: 4,
    fontSize: 16,
    fontFamily: 'varela-round'
  },
  underline: {
    backgroundColor: Colors.LIGHT_GREY,
    height: 2,
    marginLeft: 16,
    marginTop: 8,
    marginRight: 16,
    marginBottom: 16
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'stretch',
    marginRight: 64,
    marginLeft: 64,
    marginBottom: 32
  }
});

var mapStateToProps = (state) => {

  return {
    vendors: state.vendorHelper.vendors
  }
}

export default connect(mapStateToProps)(FilterModal);
