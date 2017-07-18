import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import * as Colors from '../colors/colors.js';


const CustomNavBar = (props) => (
  <View style={styles.navBar} backgroundColor={Colors.CREAM}>
    <TouchableOpacity style={styles.rightButton} onPress={props.rightOnPress}>
      {props.rightButton}
    </TouchableOpacity>

    <Text style={styles.titleLabel} >{props.title}</Text>

    <TouchableOpacity style={styles.rightButton} onPress={props.rightOnPress}>
      {props.rightButton}
    </TouchableOpacity>
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
  leftOnPress: null,
  leftButton: <Text>LB</Text>,
  rightOnPress: null,
  rightButton: <Text>LB</Text>,
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
    alignItems: 'center'
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
  titleLabel: {
    height: 20,
    fontSize: 14,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 8,
    color: Colors.DARK_GREY,
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
