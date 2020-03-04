import { setCandle } from 'ducks/actions';
import { postData } from 'utils/axios';
import moment from 'moment';

export const getCandle = ({
  exchange = 'bitmex',
  interval = 'm1',
  pair,
}) => async dispatch => {
  let candle = {};
  const data = {
    start_date: moment
      .utc()
      .startOf('minute')
      .subtract(1, 'minute')
      .format(),
  };
  const res = await postData(`/candles/${exchange}/${pair}/${interval}`, data);
  if (res.data.length > 0) {
    [candle] = await res.data;
    await dispatch(setCandle(candle));
  }
  return candle;
};
