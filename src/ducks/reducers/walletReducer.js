import { SET_WALLET, CLEAR_WALLET } from 'ducks/types';

export const walletReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_WALLET:
      return action.payload;
    case CLEAR_WALLET:
      return {};
    default:
      return state;
  }
};
