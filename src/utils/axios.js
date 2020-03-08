import axios from 'axios';
import { isObject } from 'utils/helpers';

const { REACT_APP_HOST } = process.env;

export function postPublicData(url, data) {
  return axios({
    method: 'post',
    url: `${REACT_APP_HOST}${url}`,
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
}
export function getPublicData(url) {
  return axios({
    method: 'get',
    url: `${REACT_APP_HOST}${url}`,
    headers: { 'Content-Type': 'application/json' },
  });
}
export function getData(url) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isObject(user) || !user.token) {
    throw new Error('Error authenticating credentials');
  }

  const { token } = user;

  return axios({
    method: 'get',
    url: `${REACT_APP_HOST}${url}`,
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
}

export function putData(url, data) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isObject(user) || !user.token) {
    throw new Error('Error authenticating credentials');
  }

  const raw_data = JSON.stringify(data);
  const { token } = user;

  return axios({
    method: 'put',
    url: `${REACT_APP_HOST}${url}`,
    data: raw_data,
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
}

export function postData(url, data = {}) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isObject(user) || !user.token) {
    throw new Error('Error authenticating credentials');
  }

  const raw_data = JSON.stringify(data);
  const { token } = user;

  return axios({
    method: 'post',
    url: `${REACT_APP_HOST}${url}`,
    data: raw_data,
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  });
}
