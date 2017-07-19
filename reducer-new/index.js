
export default function RootReducer(state={}, action) {
  switch(action.type) {
    case 'CHANGE_TEXT':
      return {
        text: action.text
      }
    case 'GO_TO_PLACES_DETAIL':
      return {
        name: action.name,
        description: action.description
      }
    default:
      return state;
  }
}
