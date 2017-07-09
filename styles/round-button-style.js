import React from 'react';
import { StyleSheet } from 'react-native';

export default class RoundButtonStyle {
  static getButtonSheet(bgColor) {
    return StyleSheet.create({
      style: {
        backgroundColor: bgColor,
        height: 64,
        borderRadius: 32,
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 16
      }
    });
  }

  static getTextSheet(textColor) {
    return StyleSheet.create({
      style: {
        textAlign: 'center',
        height: 22,
        marginTop: 20,
        fontSize: 20,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        color: textColor
      }
    });
  }
}
