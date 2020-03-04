import { setErrorMessage, setModal, setLoading, logoutUser } from 'ducks/actions';
import * as Sentry from '@sentry/browser';

export const handleApiError = (err, payload = 'empty') => async (dispatch, getState) => {
  let error_message = 'Unhandled Error';
  if (err || false) {
    error_message = 'React TypeError: Contact Internal Ranking';
  }

  if ((err || false).error) {
    error_message = JSON.stringify(err.error || 'Error');
  }

  if ((err || false).response || (err || false).message) {
    error_message = JSON.stringify(err.response) || JSON.stringify(err.message);
    if ((err || false).response && err.response.status === 400) {
      await dispatch(setModal({ api_error: false }));
      return dispatch(logoutUser());
    }
  }
  await dispatch(setErrorMessage(error_message));
  await dispatch(setModal({ api_error: true }));
  await dispatch(setLoading(false));

  const state = getState();

  Sentry.withScope(scope => {
    scope.setExtra('message', error_message);
    scope.setExtra('payload', payload);
    scope.setExtra('username', ((state || false).user || false).email_address);
    Sentry.captureException(err);
  });
  return err;
};
