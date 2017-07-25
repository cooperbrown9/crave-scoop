import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Button from 'react-native-button';
import * as Colors from '../colors/colors.js';


const CustomNavBar = (props) => (
  <View style={styles.navBar} backgroundColor={Colors.CREAM}>
    <View style={styles.navBarButtonContainer}>
      <TouchableOpacity style={styles.leftButton} onPress={props.leftOnPress}>
        {props.leftButton}
      </TouchableOpacity>
    </View>
    <View style={styles.navBarTitleContainer}>
      <Text style={styles.titleLabel} >{props.title}</Text>
    </View>
    <View style={styles.navBarButtonContainer}>
      <TouchableOpacity style={styles.rightButton} onPress={props.rightOnPress}>
        {props.rightButton}
      </TouchableOpacity>
    </View>
  </View>
);


CustomNavBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  leftOnPress: React.PropTypes.func,
  leftButton: React.PropTypes.element,
  rightOnPress: React.PropTypes.func,
  rightButton: React.PropTypes.element,

};

CustomNavBar.defaultProps = {
  leftButton: <View/>,
  rightButton: <View/>,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'blue'
  },
  navBar: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  leftButton: {
    height: 40,
    width:64,
    marginTop: 12,
    marginLeft: 32,
    justifyContent:'center',
    alignItems:'center'
  },

  defaultButton: {
    height: 16,
    width: 16,
  },
  navBarTitleContainer: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    height: 20,
    fontSize: 14,
    alignItems: 'center',
    marginTop: 8,
    color: Colors.DARK_GREY,
  },
  rightButton: {
    height: 40,
    marginTop: 12,
    marginRight: 32,
    width:64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  optionsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 24
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
    marginRight: 64,
    marginLeft: 64,
    marginTop: 128
  }
})


export default CustomNavBar;
