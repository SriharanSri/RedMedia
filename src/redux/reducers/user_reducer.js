import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_OTP,
  USER_LOGIN_FAILURE,
  USER_LOGIN_RESET,
  USER_LOGOUT,
  MARKET_LIVE,
  USER_ORIGIN_SOURCE,
} from "./../actions/user_action";

const initState = {
  data: {},
  login: false,
  loading: false,
  error: false,
  errorData: {},
  marketLive: false,
  utm_source: "",
  utm_medium: "",
};

const user_reducer = (state = initState, { payload, type }) => {
  if (type === USER_LOGIN_REQUEST) {
    state = { ...state, loading: true };
  }

  if (type === USER_LOGIN_SUCCESS) {
    state = { ...state, loading: false, login: true, data: payload };
  }

  if (type === USER_LOGIN_RESET) {
    state = { ...state, loading: false, login: false };
  }

  if (type === USER_LOGIN_OTP) {
    state = { ...state, loading: false, login: false };
  }

  if (type === USER_LOGIN_FAILURE) {
    state = { ...state, loading: false, error: true, errorData: payload };
  }

  if (type === MARKET_LIVE) {
    state = { ...state, marketLive: true };
  }

  if (type === USER_LOGOUT) {
    state = {
      ...state,
      data: {},
      login: false,
      loading: false,
      error: false,
      errorData: {},
    };
  }

  if (type === USER_ORIGIN_SOURCE) {
    state = { ...state, ...payload };
  }

  return state;
};

export default user_reducer;
