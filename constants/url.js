
export function getUser(sessionID, userID) {
  return 'https://crave-scoop.herokuapp.com/user/' + sessionID + '/' + userID;
}

export function createUser() {
  return 'https://crave-scoop.herokuapp.com/register';
}

export function createUserFB() {
  return 'https://crave-scoop.herokuapp.com/register-fb';
}

export function verifySession(sessionID, userID) {
  return 'https://crave-scoop.herokuapp.com/verify-session/' + sessionID + '/' + userID;
}

export function favorite(sessionID, userID, vendorID) {
  return 'https://crave-scoop.herokuapp.com/favorite/' + sessionID + '/' + userID + '/' + vendorID;
}

export function unfavorite(sessionID, userID, vendorID) {
  return 'https://crave-scoop.herokuapp.com/unfavorite/' + sessionID + '/' + userID + '/' + vendorID;
}

export function getVendor(vendorID) {
  return HOST + '/get-vendor/' + vendorID;
}

export const HOST = 'https://crave-scoop.herokuapp.com/';

// export const FAVORITE = 'https://crave-scoop.herokuapp.com/favorite/';
// export const UNFAVORITE = 'https://crave-scoop.herokuapp.com/unfavorite/';
