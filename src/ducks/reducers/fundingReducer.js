import { SET_FUNDING, CLEAR_FUNDING } from 'ducks/types';

export const fundingReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FUNDING:
      return action.payload;
    case CLEAR_FUNDING:
      return {};
    default:
      return state;
  }
};
