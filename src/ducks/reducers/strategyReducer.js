import { SET_STRATEGY, CLEAR_STRATEGY } from 'ducks/types';

export const strategyReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_STRATEGY:
      return action.payload;
    case CLEAR_STRATEGY:
      return {};
    default:
      return state;
  }
};
