import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

import {
  user_login_reset_thunk,
  user_token_from_social_media_thunk,
} from "./../../redux/thunk/user_thunk";
import { getCookies } from "../../utils/cookies";
import { useQuery } from "./../../hooks/url-params";
import { fire_gtag_event } from "../../redux/actions/gtag_action";
import { gtag_event_types, invokeGoogleEvent } from "../../utils/common";
import { signInWithGoogleApi } from "../../api/methods";

import "./style.scss";

function ReactGoogleLogin() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();
  const query = useQuery(location.search);
  const redirect = query.get("redirect");

  const responseGoogle = async (response) => {
    if (user.login && getCookies()) {
      if (redirect) {
        window.open(redirect, "_self");
      } else {
        if (location.state?.from) {
          history.push(location.state?.from.pathname);
        } else {
          // window.open(`${process.env.REACT_APP_MARKETPLACE_URL}`, "_self");
          history.push("/");
        }
      }
    } else {
      if (response.access_token) {
        const token_type = response.token_type ? response.token_type : "";
        const access_token = response.access_token ? response.access_token : "";
        const token = `${token_type} ${access_token}`;
        await handleSignIn(token);
      } else if (response.credential)
        await handleSignIn(`Bearer ${response.credential}`);
    }
  };

  const handleSignIn = async (token) => {
    try {
      //dispatch(user_login_thunk(login, setError, setOTP));
      const signData = await signInWithGoogleApi({
        utm_source: user?.utm_source,
        utm_medium: user?.utm_medium,
        token,
      });
      if (signData?.data?.data?.token) {
        // setCookies(signData.data.data.token);
        dispatch(
          user_token_from_social_media_thunk(
            signData.data.data.token,
            "google",
            signData?.data?.data?.existing_user
          )
        );
      }
    } catch (error) {
      // setReLoading(false);
      invokeGoogleEvent("user_login_error", {
        eventAction: "google login click",
      });
      toast.error("An unexpected error occured. Please try again  later");

      console.log(
        "🚀 ~ file: index.js ~ line 92 ~ responseGoogle ~ error",
        error
      );
    }
  };

  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
  });

  const handleClick = () => {
    invokeGoogleEvent("user_login", { eventAction: "google login click" });
    // if (window.fbq && typeof window.fbq === "function")
    //   window.fbq("trackCustom", "GemsNFT_LoginGoogle");
    // if (location.pathname.includes("/signin/upload"))
    // dispatch(fire_gtag_event(gtag_event_types["signin/upload-google"]));
    // else {
    // dispatch(fire_gtag_event(gtag_event_types["signup-google"]));
    // dispatch(fire_gtag_event(gtag_event_types["ads-login-google"]));
    // }
    login();
  };

  useEffect(() => {
    if (user.login && getCookies()) {
      if (redirect) {
        window.open(redirect, "_self");
      } else {
        if (location.state?.from) {
          history.push(location.state?.from.pathname);
        } else {
          //  window.open(`${process.env.REACT_APP_MARKETPLACE_URL}`, "_self");
          history.push("/accounts/profile");
        }
      }
    }
  }, [user, history, location.state?.from, redirect]);

  useEffect(() => {
    if (!(user.login && getCookies())) {
      dispatch(user_login_reset_thunk());
    }
  }, []);

  return (
    <>
      {/* <GoogleLogin
        onSuccess={responseGoogle}
        onError={responseGoogle}
        size="medium"
        text="signup_with"
        shape="rectangular"
        // type="icon"
        logo_alignment="center"
        className="signup_inline_button"
      /> */}
      <button onClick={() => handleClick()} className="login-with-btn">
        Login with
        <FaGoogle />
      </button>
    </>
  );
}

const GoogleLogin = () => {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={client_id} className="signup_button">
      <ReactGoogleLogin />
    </GoogleOAuthProvider>
  );
};
export default GoogleLogin;
