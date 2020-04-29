import * as constants from 'ducks/types';

// ------ USER ACTIONS ------ //
export const loginUser = user => ({
  type: constants.LOGIN_USER,
  payload: user,
});
export const updateUser = user => ({
  type: constants.UPDATE_USER,
  payload: user,
});
export const setUser = user => ({
  type: constants.UPDATE_USER,
  payload: user,
});
export const logoutUser = () => ({
  type: constants.LOGOUT_USER,
});

// ------ ORGANIZATION ACTIONS ------ //
export const setOrganization = organization => ({
  type: constants.SET_ORGANIZATION,
  payload: organization,
});
export const clearOrganization = () => ({
  type: constants.CLEAR_ORGANIZATION,
});

// ------ MODALS ACTIONS ------ //
export const setModal = modal => ({
  type: constants.SET_MODAL,
  payload: modal,
});

// ------ SETTINGS ACTIONS ------ //
export const setErrorMessage = error_message => ({
  type: constants.SET_ERROR_MESSAGE,
  payload: error_message,
});
export const setStatusMessage = status_message => ({
  type: constants.SET_STATUS_MESSAGE,
  payload: status_message,
});
export const setLoading = loading => ({
  type: constants.SET_LOADING,
  payload: loading,
});
