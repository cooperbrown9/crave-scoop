import React from 'react';
import { StyleSheet } from 'react-native';

export default class RoundButtonStyle {
  static getButtonSheet(bgColor, borderOn) {
    return StyleSheet.create({
      style: {
        backgroundColor: bgColor,
        height: 54,
        borderRadius: 27,
        borderColor: 'white',
        borderWidth: borderOn ? 2 : 0,
        marginBottom: 16,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 8},
        shadowRadius: 8,
        shadowOpacity: 0.2,
        alignItems: 'center'
      }
    });
  }

  static getTextSheet(textColor) {
    return StyleSheet.create({
      style: {
        justifyContent: 'center',
        textAlign: 'center',
        height: 22,
        marginTop: 16,
        fontSize: 16,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        color: textColor,
        letterSpacing: 2
      }
    });
  }
}
