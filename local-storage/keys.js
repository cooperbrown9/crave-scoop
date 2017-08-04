import React from 'react';
import {

  AsyncStorage,
} from 'react-native';

export const USER_ID = '@user_id:key';
export const FACEBOOK_ID = '@fb_id:key';

export function resetKeys() {
  AsyncStorage.removeItem(USER_ID, () => {
    AsyncStorage.removeItem(FACEBOOK_ID)
  });
}
