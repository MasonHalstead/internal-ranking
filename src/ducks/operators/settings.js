import { setErrorMessage, setModal, setLoading, setStatusMessage } from 'ducks/actions';
import * as Sentry from '@sentry/browser';

export const handleApiError = (err, payload = 'empty') => async (dispatch, getState) => {
  let error_message = null;
  let status_message = null;

  if ((err || false).error) {
    error_message = JSON.stringify(err.error || 'Error');
  }

  if ((err || false).message || false) {
    status_message = JSON.stringify(err.message);
  }

  if ((err || false).response || false) {
    error_message = JSON.stringify(err.response.data);
  }

  await dispatch(setStatusMessage(status_message));
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
