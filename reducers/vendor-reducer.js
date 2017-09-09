import * as NavActionTypes from '../action-types/navigation-action-types.js';

const initialVendorState = { vendors: [], success: false, placeDetail: { vendor: { hours: [] , location: {}, description: '', name: '' } } };
export default function vendorHelper(state = initialVendorState, action) {

  switch(action.type) {

    case NavActionTypes.NEARBY:
      return {
        type: action.type,
        ...state,
        vendors: action.vendors,
        success: true
      }
      break;

    case NavActionTypes.FAVORITES:
      return {
        type: action.type,
        ...state,
        vendors: action.vendors,
        success: true
      }
      break;

    case NavActionTypes.GET_VENDOR:
      return {
        ...state,
        placeDetail: {
        type: action.type,
        ...state,
        vendor: action.vendor,
        success: true
        }
      }
      break;

    default:
      return state;
      break;
  }
}
