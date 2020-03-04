import { SET_MODAL } from 'ducks/types';

const modalsState = {
  api_error: false,
  user_settings: false,
  user_login: false,
};
export const modalsReducer = (state = modalsState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
