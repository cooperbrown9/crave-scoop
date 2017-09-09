
const initialModalState = {};
export default function modal (state = initialModalState, action) {

  let nextState = state;
  switch(action.type) {

    case 'VendorItemModal':

      return { model: action.model }
      break;

    default:
      return { randomProp: '' }
      break;
  }
}
