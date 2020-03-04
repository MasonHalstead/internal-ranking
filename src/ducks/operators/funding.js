import { setFunding } from 'ducks/actions';
import { postData } from 'utils/axios';
import moment from 'moment';

export const getFunding = pair => async dispatch => {
  const res = await postData(`/bitmex/funding/${pair}`);
  const {
    fundingInterval,
    fundingRate,
    fundingRateDaily,
    timestamp,
  } = res.data[0];
  await dispatch(
    setFunding({
      interval: fundingInterval,
      funding_rate: fundingRate,
      funding_rate_daily: fundingRateDaily,
      funding_time: moment(timestamp)
        .utc()
        .format('MM/DD/YY HH:mm'),
    }),
  );
  return res.data;
};
