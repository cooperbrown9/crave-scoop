import axios from 'react-native-axios';

export async function GetUserByID (id) {
  return axios.get('https://crave-scoop.herokuapp.com/get-user/' + id).then(response => response.data).done(data => 'ghgh' );
}
