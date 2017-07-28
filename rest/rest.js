import axios from 'react-native-axios';

export function GetUserByID (id) {
  axios.get('https://crave-scoop.herokuapp.com/get-user/' + id).then(response => response.data).done(data => 'ghgh' );
}
