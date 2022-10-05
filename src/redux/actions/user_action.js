export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_RESET = "USER_LOGIN_RESET";
export const USER_LOGIN_OTP = "USER_LOGIN_OTP";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_LOGOUT = "USER_LOGOUT";

export const MARKET_LIVE = "MARKET_LIVE";
export const USER_ORIGIN_SOURCE = "USER_ORIGIN_SOURCE";

export const user_login_action_request = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const user_login_action_success = (input) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: input,
  };
};

export const user_login_action_reset = () => {
  return {
    type: USER_LOGIN_RESET,
  };
};

export const user_login_action_failure = (input) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: input,
  };
};

export const user_login_otp_action = (input) => {
  return {
    type: USER_LOGIN_OTP,
  };
};

export const user_logout_action = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const market_live = () => {
  return {
    type: MARKET_LIVE,
  };
};

export const capture_user_origin_source = (sources = {}) => {
  return {
    type: USER_ORIGIN_SOURCE,
    payload: sources,
  };
};
