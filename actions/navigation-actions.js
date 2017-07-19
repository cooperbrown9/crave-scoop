import * as NavigationActions from '../actionTypes/navigation-action-types.js';

export const navigateToPlacesDetail = (name, description) => {
  return {
    type: NavigationActions.GO_TO_PLACES_DETAIL,
    name,
    description
  };
};
