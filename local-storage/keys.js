import React from 'react';
import {

  AsyncStorage,
} from 'react-native';

export const USER_ID = '@user_id:key';
export const FACEBOOK_ID = '@fb_id:key';

export async function resetKeys(callback) {
  await AsyncStorage.removeItem(USER_ID);
  await AsyncStorage.removeItem(FACEBOOK_ID);
  callback();
  console.log('keys resey');
}

export function setDummyKeys(){
  AsyncStorage.setItem(USER_ID, '59765d2df60c01001198f3b5', () => {
    AsyncStorage.setItem(FACEBOOK_ID, 'ABC');
  });
}
