import { setOrganization, setLoading } from 'ducks/actions';
import { getUser } from 'ducks/operators/user';
import { postData, getData } from 'utils/axios';

export const getOrganizationConfig = organization_id => async dispatch => {
  await dispatch(setLoading(true));
  await Promise.all([dispatch(getUser()), dispatch(getOrganization(organization_id))]);
};

export const createOrganization = (data, history) => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postData(`/organizations/create`, data);
  history.push(`/organization/${res.data}`);
  return res.data;
};

export const joinOrganization = (data, history) => async dispatch => {
  await dispatch(setLoading(true));
  const res = await postData('/organizations/join', data);
  history.push(`/organization/${res.data}`);
  return res.data;
};

export const getOrganization = organization_id => async dispatch => {
  await dispatch(setLoading(true));
  const res = await getData(`/organizations/${organization_id}`);
  await dispatch(setOrganization({ ...res.data, organization_id: res.data._id }));
  return res.data;
};
