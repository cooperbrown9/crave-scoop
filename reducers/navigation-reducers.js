import * as NavigationActions from '../actionTypes/navigation-action-types.js';

const initialState = [
  {

  }
]

export default function NavigationReducer(state=initialState, action) {
  switch(action.type) {
    case NavigationActions.GO_TO_PLACES_DETAIL:
      return {
        ...state,
          name: action.name,
          description: action.description
      }
  }
}
