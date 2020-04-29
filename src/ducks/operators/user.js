import { setUser, setLoading, setModal } from 'ducks/actions';
import { postData, putData, getData, postPublicData } from 'utils/axios';

export const loginUser = data => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postPublicData(`/users/login`, data);
  await dispatch(setUser(res.data));
  return res.data;
};

export const getUser = () => async dispatch => {
  await dispatch(setLoading(true));
  await dispatch(getUserToken());
  const res = await getData(`/users/me`);
  await dispatch(setUser({ ...res.data, user_id: res.data._id }));
  return res.data;
};

export const getUserToken = () => async dispatch => {
  await dispatch(setLoading(true));
  const res = await getData(`/users/token`);
  await dispatch(setUser({ token: res.data }));
  return res.data;
};

export const updateUser = data => async dispatch => {
  await dispatch(setLoading(true));
  const res = await putData(`/users/update`, data);
  await dispatch(setUser({ ...res.data }));
  return res.data;
};

export const registerUser = data => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postPublicData(`/users/register`, data);
  await dispatch(setUser({ token: res.data }));
  return res.data;
};

export const emailUser = data => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postData(`/users/reset`, data);
  await dispatch(setModal({ user_success: true }));
  return res.data;
};
