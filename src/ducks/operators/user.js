import { setUser, setLoading, setModal } from 'ducks/actions';
import { postData } from 'utils/axios';

export const loginUser = data => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postData(`/users/login`, data);
  await dispatch(setUser(res.data));
  return res.data;
};

export const registerUser = data => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postData(`/users/register`, data);
  await dispatch(setUser(res.data));
  return res.data;
};

export const emailUser = data => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postData(`/users/reset`, data);
  await dispatch(setModal({ user_success: true }));
  return res.data;
};
