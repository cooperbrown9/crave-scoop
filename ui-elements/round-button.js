import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import RoundButtonStyle from '../styles/round-button-style.js';
// import Colors from '../colors/colors.js';


const RoundButton = (props) => (
  <TouchableOpacity
    title={props.title}
    onPress={props.onPress}
    style={RoundButtonStyle.getButtonSheet(props.bgColor, props.borderOn).style}
  >
    <Text style={RoundButtonStyle.getTextSheet(props.textColor).style}>{props.title}</Text>
  </TouchableOpacity>
);


RoundButton.propTypes = {
  title: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  borderOn: React.PropTypes.bool,
  bgColor: React.PropTypes.string,
  textColor: React.PropTypes.string
};

RoundButton.defaultProps = {
  borderOn: true,
  bgColor: 'transparent',
  textColor: 'white'
};



export default RoundButton;
