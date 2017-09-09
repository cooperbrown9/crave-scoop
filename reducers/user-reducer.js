import * as NavActionTypes from '../action-types/navigation-action-types.js';

let initialUserState = { success: false, user: {} }
export default function user (state = initialUserState, action){

  switch(action.type){

    case NavActionTypes.GET_USER:
      initialUserState = {
      ...state,
      success: true,
      user: action.user,
      currentLocation: action.location
     };

      return initialUserState;
      // return {
      //   ...state,
      //   success: true,
      //   user: action.user
      // }
      break;

    default:
      return initialUserState;
      break;
  }
}
