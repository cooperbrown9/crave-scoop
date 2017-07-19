import * as NavigationActions from '../actionTypes/Navigation-action-types.js';

export const navigateToPlacesDetail = (name, description) => {
  return {
    type: NavigationActions.GO_TO_PLACES_DETAIL,
    name,
    description
  };
};
