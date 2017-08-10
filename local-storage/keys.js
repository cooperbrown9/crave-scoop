import React from 'react';
import {

  AsyncStorage,
} from 'react-native';

export const USER_ID = '@user_id:key';
export const FACEBOOK_ID = '@fb_id:key';
export const PICTURE = '@profile_picture:key';

export function resetKeys(callback) {
  AsyncStorage.removeItem(USER_ID, () => {
    AsyncStorage.removeItem(FACEBOOK_ID, () => {
      AsyncStorage.removeItem(PICTURE, () => {
        console.log('keys resey');
        callback();
      });
    });
  });
}

export function setDummyKeys(callback){
  AsyncStorage.setItem(USER_ID, '59765d2df60c01001198f3b5', () => {
    AsyncStorage.setItem(FACEBOOK_ID, 'ABC', () => {
      callback();
    });
  });
}
