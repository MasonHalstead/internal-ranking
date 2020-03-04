import { getWallet } from 'ducks/operators/wallet';
import { handleApiError } from 'ducks/operators/settings';
import { getCandle } from 'ducks/operators/candle';
import { getStrategy } from 'ducks/operators/strategy';
import { getFunding } from 'ducks/operators/funding';

export const getBitmexStrategy = pair => async dispatch => {
  try {
    const candle = await dispatch(getCandle({ pair }));
    await Promise.all([
      dispatch(getStrategy(pair)),
      dispatch(getWallet(candle)),
      dispatch(getFunding(pair)),
    ]);
  } catch (err) {
    dispatch(handleApiError(err, pair));
  }
};
