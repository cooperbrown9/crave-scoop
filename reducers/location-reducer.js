import * as NavActionTypes from '../action-types/navigation-action-types.js';

let initialLocationState = { latitude: '', longitude: ''}
export default function location(state = initialLocationState, action) {

  switch(action.type) {

    case NavActionTypes.UPDATE_USER_LOCATION:
      initialLocationState = {
        latitude: action.latitude,
        longitude: action.longitude
      }
      return initialLocationState;

    default:
      return initialLocationState;
  }
}
