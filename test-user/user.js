import { AsyncStorage } from 'react-native';
export const UserID = '59765d2df60c01001198f3b5';

export async function GetUserID() {
  const name = await AsyncStorage.getItem('@test_username:key');
  console.log(name);
};
