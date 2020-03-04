import { setStrategy } from 'ducks/actions';
import { normalizeBitmexStrategy } from 'utils/normalizers';
import { getData } from 'utils/axios';

export const getStrategy = pair => async dispatch => {
  const res = await getData(`/bitmex/positions/${pair}`);
  await dispatch(setStrategy(normalizeBitmexStrategy(res.data)));
  return res.data;
};
