import React from 'react';
import axios from 'axios';

export function verifySession(sessionID, userID, callback) {
  axios.get('https://crave-scoop.herokuapp.com/verify-session/' + sessionID + '/' + userID).then(response => {
    callback(response);
  });
}
