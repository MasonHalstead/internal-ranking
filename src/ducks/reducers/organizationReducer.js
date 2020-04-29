import { SET_ORGANIZATION, CLEAR_ORGANIZATION } from 'ducks/types';

export const organizationReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ORGANIZATION:
      return action.payload;
    case CLEAR_ORGANIZATION:
      return {};
    default:
      return state;
  }
};
