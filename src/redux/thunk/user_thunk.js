import { toast } from "react-toastify";
import { signInApi } from "../../api/methods";
import { getCookies, setCookies, removeCookies } from "../../utils/cookies";
import { signOutApi, userApi } from "./../../api/methods";

import {
  user_login_otp_action,
  user_login_action_request,
  user_login_action_success,
  user_login_action_failure,
  user_logout_action,
  user_login_action_reset,
  market_live,
} from "../actions/user_action";
import { getCartListApi } from "../../api/methods-marketplace";
import { get_cart_list } from "../actions/user_cart_action";
import { invokeHubspotAPI } from "../../api/methods-hubspot";
import { gtag_event_types, invokeGoogleEvent } from "../../utils/common";
import { fire_gtag_event } from "../actions/gtag_action";

export const user_login_thunk = (input, returnMessage, setOTP = null) => {
  return async (dispatch) => {
    try {
      dispatch(user_login_action_request());
      // dispatch(fire_gtag_event(gtag_event_types["signin/upload-login"]));
      const result = await signInApi(input);

      if (result.data.status === 200) {
        if (
          result.data.message === "verification required" &&
          setOTP !== null
        ) {
          setOTP(true);

          dispatch(user_login_otp_action());
        } else {
          setCookies(result.data.data.token);
          invokeGoogleEvent("user_login_success", {
            eventAction: "login click",
          });
          try {
            const user = await userApi(result.data.data.token);

            dispatch(user_login_action_success(user.data.data));
          } catch (u_err) {
            if (u_err?.status === 401) {
              returnMessage("Invalid credential(s)");
            } else {
              toast.error(
                "An unexpected error occured. Please try again  later"
              );
            }
            dispatch(user_login_action_failure(u_err));
          }
        }
      }
    } catch (err) {
      if (err?.status === 422) {
        if (err?.data?.message === "email otp locked") {
          returnMessage(
            "Account lock for security reasons, please login again after 10 mins"
          );
        } else {
          returnMessage("Invalid credential(s)");
        }
      } else if (err?.status === 406) {
        if (err?.data.message === "login locked") returnMessage("login-locked");
        else returnMessage("confirm-email");
      } else {
        toast.error("An unexpected error occured. Please try again  later");
      }

      dispatch(user_login_action_failure(err));
    }
  };
};

export const user_logout_thunk = () => {
  return async (dispatch) => {
    try {
      const token = getCookies();
      if (token) await signOutApi();
    } catch (err) {
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    } finally {
      removeCookies();
      dispatch(user_logout_action());
    }
  };
};

export const user_token_from_social_media_thunk = (
  token,
  provider = "",
  existing_user
) => {
  return async (dispatch) => {
    try {
      setCookies(token);
      const user = await userApi(token);
      if (existing_user) {
        let eventAction = `${provider} login click`;
        invokeGoogleEvent("user_login_success", { eventAction });
      } else {
        invokeGoogleEvent("user_reg_otp_success", {
          eventAction: provider,
          email: user?.data?.data?.user?.email,
        });
      }
      await invokeHubspotAPI(user?.data?.data?.user);
      dispatch(user_login_action_success(user.data.data));
    } catch (err) {
      if (err?.status === 401) {
        removeCookies();
        toast.error(
          "Your Session Has Expired. Please Login Again To Continue. "
        );
      }
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
  };
};

export const user_load_by_token_thunk = (token) => {
  return async (dispatch) => {
    try {
      setCookies(token);
      const user = await userApi(token);

      dispatch(user_login_action_success(user.data.data));
    } catch (err) {
      if (err?.status === 401) {
        removeCookies();
        toast.error(
          "Your Session Has Expired. Please Login Again To Continue. "
        );
      }
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
  };
};

export const user_login_reset_thunk = () => {
  return async (dispatch) => {
    try {
      dispatch(user_login_action_reset());
    } catch (err) {
      console.log("🚀 ~ file: user_thunk.js ~ line 58 ~ return ~ err", err);
    }
  };
};

export const user_social_login_thunk_by_token = (token, returnMessage) => {
  return async (dispatch) => {
    try {
      dispatch(user_login_action_request());

      const result = await userApi(token);

      if (result.data.status === 200) {
        if (result.data.message === "verification required") {
          dispatch(user_login_otp_action());
        } else {
          setCookies(token);

          try {
            // const user = await userApi(result.data.data.token);
            dispatch(user_login_action_success(result.data.data));
          } catch (u_err) {
            if (u_err?.status === 401) {
              returnMessage("Invalid credential(s)");
            } else {
              toast.error(
                "An unexpected error occured. Please try again  later"
              );
            }
            dispatch(user_login_action_failure(u_err));
          }
        }
      }
    } catch (err) {
      if (err?.status === 422) {
        if (err?.data?.message === "email otp locked") {
          returnMessage(
            "Account lock for security reasons, please login again after 10 mins"
          );
        } else {
          returnMessage("Invalid credential(s)");
        }
      } else if (err?.status === 406) {
        if (err?.data.message === "login locked") returnMessage("login-locked");
        else returnMessage("confirm-email");
      } else {
        toast.error("An unexpected error occured. Please try again  later");
      }

      dispatch(user_login_action_failure(err));
    }
  };
};

export const market_live_thunk = () => {
  return async (dispatch) => {
    dispatch(market_live());
  };
};

export const get_cart_list_thunk = () => {
  return async (dispatch) => {
    try {
      const result = await getCartListApi();
      dispatch(get_cart_list(result.data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
