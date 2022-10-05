import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Facebook from 'react-facebook-login';
import Facebook from "react-facebook-login/dist/facebook-login-render-props";

import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import {
  user_login_reset_thunk,
  user_token_from_social_media_thunk,
} from "../../redux/thunk/user_thunk";
import { getCookies } from "../../utils/cookies";
import { useQuery } from "../../hooks/url-params";

import { signInWithFacebookApi } from "../../api/methods";

//import GoogleImg from "../../images/icons8-google.svg";

import "./style.scss";
import { FaFacebook } from "react-icons/fa";
import { fire_gtag_event } from "../../redux/actions/gtag_action";
import { gtag_event_types, invokeGoogleEvent } from "../../utils/common";

function FacebookLogin() {
  const client_id = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();
  const query = useQuery(location.search);
  const redirect = query.get("redirect");

  const [reLoading, setReLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [error, setError] = useState();

  const responseFacebook = async (response) => {
    console.log("callback");
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
      if (response?.accessToken) {
        const token_type = "Bearer";
        const access_token = response.accessToken ? response.accessToken : "";
        const token = `${token_type} ${access_token}`;

        await handleSignIn(token);
      } else if (response?.credential)
        await handleSignIn(`Bearer ${response.credential}`);
    }
  };

  const handleSignIn = async (token) => {
    try {
      const signData = await signInWithFacebookApi({
        utm_source: user?.utm_source,
        utm_medium: user?.utm_medium,
        token,
      });

      if (signData) {
        setVerifyLoading(false);
        setNavigate(true);
        dispatch(
          user_token_from_social_media_thunk(
            signData.data.data.token,
            "fb",
            signData?.data?.data?.existing_user
          )
        );
      }
    } catch {
      invokeGoogleEvent("user_login_error", { eventAction: "fb login click" });
      toast.error("An unexpected error occured. Please try again later");
      console.log("🚀 ~ handleSignIn ~ error", error);
    }
  };
  useEffect(() => {
    if (user.login && getCookies()) {
      if (redirect) {
        window.open(redirect, "_self");
      } else {
        if (location.state?.from) {
          history.push(location.state?.from.pathname);
        } else {
          //      window.open(`${process.env.REACT_APP_MARKETPLACE_URL}`, "_self");
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

  const componentClicked = (_) => {
    invokeGoogleEvent("user_login", { eventAction: "fb login click" });
    // if (window.fbq && typeof window.fbq === "function")
    //   window.fbq("trackCustom", "GemsNFT_LoginFB");
    // if (location.pathname.includes("/signin/upload"))
    // dispatch(fire_gtag_event(gtag_event_types["signin/upload-facebook"]));
    // else {
    // dispatch(fire_gtag_event(gtag_event_types["signup-facebook"]));
    // dispatch(fire_gtag_event(gtag_event_types["ads-login-facebook"]));
    // }
  };
  return (
    <>
      <Facebook
        appId={client_id}
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} className="login-with-btn">
            Login with
            <FaFacebook />
          </button>
        )}
        disableMobileRedirect={true}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default FacebookLogin;
