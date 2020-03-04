import { setStrategies } from 'ducks/actions';
import { getWallet } from 'ducks/operators/wallet';
import { handleApiError } from 'ducks/operators/settings';
import { getCandle } from 'ducks/operators/candle';
import { getBitmexCandles, getEquity } from 'ducks/operators/charts';
import { getFunding } from 'ducks/operators/funding';
import { normalizeBitmexStrategies } from 'utils/normalizers';
import { getData } from 'utils/axios';
import moment from 'moment';

export const getStrategiesConfig = ({ interval = 'm1', pair = 'XBTUSD' }) => async dispatch => {
  let start_date = moment
    .utc()
    .subtract(3, 'days')
    .format();
  const end_state = moment.utc().format();

  if (interval === 'h1') {
    start_date = moment
      .utc()
      .subtract(30, 'days')
      .format();
  }

  if (interval === 'd1') {
    start_date = moment
      .utc()
      .subtract(365, 'days')
      .format();
  }
  try {
    const candle = await dispatch(getCandle({ pair }));
    await Promise.all([
      dispatch(
        getBitmexCandles({
          interval,
          start_date,
          end_state,
          pair,
        }),
      ),
      dispatch(
        getEquity({
          interval,
          start_date,
          end_state,
          pair,
        }),
      ),
      dispatch(getStrategies()),
      dispatch(getWallet(candle)),
      dispatch(getFunding(pair)),
    ]);
  } catch (err) {
    dispatch(handleApiError(err, pair));
  }
};
export const getStrategies = () => async dispatch => {
  const res = await getData(`/bitmex/positions`);
  await dispatch(setStrategies(normalizeBitmexStrategies(res.data)));
  return res.data;
};
