import { SET_STRATEGIES, CLEAR_STRATEGIES } from 'ducks/types';

export const strategiesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_STRATEGIES:
      return action.payload;
    case CLEAR_STRATEGIES:
      return [];
    default:
      return state;
  }
};
