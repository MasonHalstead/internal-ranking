import { SET_CANDLE, CLEAR_CANDLE } from 'ducks/types';

export const candleReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CANDLE:
      return action.payload;
    case CLEAR_CANDLE:
      return {};
    default:
      return state;
  }
};
