import { normalizeCandles, normalizeEquity } from 'utils/normalizers';

export function selectPrivateUser(state) {
  return state.user && state.user.token && !state.user.email_verified;
}
export function selectPrivateVerifiedUser(state) {
  return state.user && state.user.token && state.user.email_verified;
}
export function selectBitmexCandles(state) {
  if (state.charts && state.charts.bitmex_candles) {
    return normalizeCandles(state.charts.bitmex_candles);
  }
  return [];
}
export function selectEquity(state) {
  if (state.charts && state.charts.equity) {
    return normalizeEquity(state.charts.equity);
  }
  return [];
}
export function selectBitmexCandle(state) {
  if (state.charts.bitmex_candles) {
    const { bitmex_candles } = state.charts;
    const { length } = bitmex_candles;
    return bitmex_candles[length - 1];
  }
  return {};
}
export function selectKrakenCandles(state) {
  if (state.charts && state.charts.kraken_candles) {
    return normalizeCandles(state.charts.kraken_candles);
  }
  return [];
}
export function selectKrakenCandle(state) {
  if (state.charts.kraken_candles) {
    const { kraken_candles } = state.charts;
    const { length } = kraken_candles;
    return kraken_candles[length - 1];
  }
  return {};
}
export function selectUser(state) {
  return state.user;
}
