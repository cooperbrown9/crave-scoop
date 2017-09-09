
let initialLoadingState = { loading: true }
export default function loading(state = initialLoadingState, action) {
  switch(action.type) {
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: false
      }
      break;
    case 'START_LOADING':
      return {
        ...state,
        loading: true
      }
      break;
    default:
      return state;
  }
}
