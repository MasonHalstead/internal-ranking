import { setWallet } from 'ducks/actions';
import { getData } from 'utils/axios';

export const getWallet = candle => async dispatch => {
  const satoshi_conversion = 0.00000001;
  const { close } = candle;
  let balance = '$0.00';
  let satoshi_balance = 0;
  let margin_balance = '$0.00';
  let satoshi_margin_balance = 0;
  let satoshi_avail_margin_balance = 0;
  let leverage = 1;

  const res = await getData(`/bitmex/wallet`);
  const {
    walletBalance,
    marginBalance,
    availableMargin,
    marginLeverage,
  } = res.data;

  if (walletBalance) {
    balance = `$${(walletBalance * satoshi_conversion * close).toFixed(2)}`;
    satoshi_balance = (walletBalance * satoshi_conversion).toFixed(8);
  }
  if (marginBalance) {
    margin_balance = `$${(marginBalance * satoshi_conversion * close).toFixed(
      2,
    )}`;
    satoshi_margin_balance = (marginBalance * satoshi_conversion).toFixed(8);
  }
  if (availableMargin) {
    satoshi_avail_margin_balance = (
      availableMargin * satoshi_conversion
    ).toFixed(8);
  }
  if (marginLeverage) {
    leverage = marginLeverage.toFixed(4);
  }
  await dispatch(
    setWallet({
      balance,
      satoshi_balance,
      margin_balance,
      satoshi_margin_balance,
      satoshi_avail_margin_balance,
      leverage,
    }),
  );
  return res.data;
};
