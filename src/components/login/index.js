/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import GoogleLogin from "../GoogleLogin";
import FacebookLogin from "../FacebookLogin";

import InputText from "../input-text";
import Wrapper from "../gems/wrapper";
import InputOTP from "./../input-otp";
import {
  user_load_by_token_thunk,
  user_login_reset_thunk,
  user_login_thunk,
} from "./../../redux/thunk/user_thunk";
import {
  gtag_event_types,
  invokeGoogleEvent,
  validateEmail,
  validatePasswordMinimal,
  validatePhone,
} from "./../../utils/common";
import { useQuery } from "./../../hooks/url-params";
import { getCookies, setCookies } from "../../utils/cookies";
import {
  resendConfirmationApi,
  resendOtpApi,
  verifyOtpApi,
} from "./../../api/methods";

import "./style.scss";
//import GoogleLogin from "../GoogleLogin/index";
//import FacebookLogin from "../Facebook Login/index";
import { useParams } from "react-router";
import { fire_gtag_event } from "../../redux/actions/gtag_action";

const LoginComponent = ({ signuppage }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();
  const query = useQuery(location.search);
  const redirect = query.get("redirect");
  const email = query.get("email");

  const { source } = useParams();

  const [password, setPassword] = useState(true);
  const [captcha, setCaptcha] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [error, setError] = useState();
  const [otp, setOTP] = useState(false);
  const [otpValue, setOTPValue] = useState("");
  const [reLoading, setReLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState("");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    email: false,
    valid_email: false,
    password: false,
    valid_password: false,
    captcha: false,
  });

  useEffect(() => {
    if (user.login && getCookies()) {
      if (redirect) {
        window.open(redirect, "_self");
      } else {
        if (location.state?.from) {
          history.push(location.state?.from.pathname);
        } else {
          // window.open(`${process.env.REACT_APP_MARKETPLACE_URL}`, "_self");
          history.push("/accounts/profile");
        }
      }
    }
  }, [user, history, location.state?.from, redirect]);

  useEffect(() => {
    if (email) {
      setLogin({ ...login, email: email.trim() });
      setAlreadyExist(
        "We noticed that your email or phone number is already registered with us. Please proceed with your login credentials."
      );
      history.push("/signin");
    }
  }, [email]);

  useEffect(() => {
    // if (source === "upload")
    // dispatch(fire_gtag_event(gtag_event_types["signin/upload"]));
    if (!(user.login && getCookies())) {
      dispatch(user_login_reset_thunk());
    }
  }, []);

  const handleLogin = () => {
    setError(null);
    if (checkValidation()) {
      dispatch(user_login_thunk(login, setError, setOTP));
    } else
      invokeGoogleEvent("user_login_error", { eventAction: "login click" });
  };

  const checkValidation = () => {
    let c_validation = { ...validation };

    if (!login.email) {
      c_validation = { ...c_validation, email: true };
    } else {
      if (validateEmail(login.email)) {
        c_validation = { ...c_validation, valid_email: false };
      } else if (validatePhone(login.email)) {
        c_validation = { ...c_validation, valid_email: false };
      } else {
        c_validation = { ...c_validation, valid_email: true };
      }
    }

    if (!login.password) {
      c_validation = { ...c_validation, password: true };
    } else {
      if (validatePasswordMinimal(login.password)) {
        c_validation = { ...c_validation, valid_password: false };
      } else {
        c_validation = { ...c_validation, valid_password: true };
      }
    }

    if (captcha) {
      c_validation = { ...c_validation, captcha: false };
    } else {
      c_validation = { ...c_validation, captcha: true };
    }

    if (process.env.REACT_APP_ENVIRONMENT === "local") {
      c_validation = { ...c_validation, captcha: false };
    }
    c_validation = { ...c_validation, captcha: false };

    setValidation(c_validation);
    if (
      !c_validation.email &&
      !c_validation.password &&
      !c_validation.valid_email &&
      !c_validation.valid_password &&
      !c_validation.captcha
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeEvent = (e) => {
    setError(null);
    setLogin({ ...login, [e.target.name]: e.target.value.trim() });
    if (e.target.value) {
      setValidation({ ...validation, [e.target.name]: false });
    } else {
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleResendEmail = async () => {
    try {
      setReLoading(true);
      await resendConfirmationApi(login.email);
      setReLoading(false);
      toast.success(
        "The email containing your One-Time Password to Confirm your Account has been sent to your registered email"
      );
    } catch (error) {
      setReLoading(false);
      toast.error("An unexpected error occured. Please try again  later");

      console.log(
        "🚀 ~ file: index.js ~ line 196 ~ handleResendEmail ~ error",
        error
      );
    }
  };

  const ConfirmError = () => {
    return reLoading ? (
      <p className="error_text text-center text-dark">Sending email...</p>
    ) : (
      <p className="error_text text-center">
        You need to verify your account first.{" "}
        <a href="#" onClick={handleResendEmail}>
          Click here
        </a>{" "}
        to resend the confirmation email.
      </p>
    );
  };

  const handleVerifyOTP = async () => {
    setError(null);
    if (otpValue.length === 6) {
      try {
        setVerifyLoading(true);
        const result = await verifyOtpApi(login.email, otpValue);

        // dispatch(user_login_thunk(login, setError, setOTP));

        setCookies(result.data.data.token);
        setVerifyLoading(false);
        setNavigate(true);
        dispatch(user_load_by_token_thunk(result.data.data.token));
      } catch (error) {
        setVerifyLoading(false);
        setError(
          "It seems you have entered the wrong OTP. Please check the number(s) you have entered."
        );
        console.log(
          "🚀 ~ file: index.js ~ line 172 ~ handleVerifyOTP ~ error",
          error
        );
      }
    } else {
      setError("Please enter the full OTP received through your email.");
    }
  };

  const handleResendOTP = async () => {
    if (login.email) {
      try {
        setReLoading(true);
        await resendOtpApi(login.email);
        setReLoading(false);
        toast.success(
          "Your confirmation email has been sent to your registered email address"
        );
      } catch (error) {
        setReLoading(false);

        if (error?.data?.message === "email otp locked") {
          toast.error(
            "Account lock for security reasons, please login again after 10 mins"
          );

          setOTP(false);
          setOTPValue("");
          setError(null);
          setLogin({ email: "", password: "" });
        } else {
          toast.error("An unexpected error occured. Please try again  later");
        }

        console.log(
          "🚀 ~ file: index.js ~ line 196 ~ handleResendEmail ~ error",
          error
        );
      }
    }
  };

  return (
    <>
      {otp ? (
        <Wrapper>
          <div className="bl_form_box gem-decor">
            <div className="form-cntnt-box">
              <h3 className="bl_form_heading">Verify Your Email</h3>
              <p>We have sent an OTP to your email address.</p>
              <div className="form-group mb-3">
                <InputOTP onChange={(e) => setOTPValue(e)} value={otpValue} />
              </div>
              {validation.valid_email && (
                <p className="error_text">Please enter a valid email address</p>
              )}

              <p className="text-center">
                {reLoading ? (
                  "Sending email..."
                ) : (
                  <>
                    I didn't receive a code!
                    <br />
                    <a
                      href="#"
                      className="theme-link"
                      onClick={handleResendOTP}
                    >
                      Resend
                    </a>
                  </>
                )}
              </p>

              <div className="form-group btnor-group mb-2">
                <button
                  type="button"
                  className="bl_btn"
                  onClick={handleVerifyOTP}
                  disabled={verifyLoading || navigate}
                >
                  {navigate ? (
                    "Verified Successfully, please wait..."
                  ) : (
                    <>{verifyLoading ? "Verifying..." : "Verify"}</>
                  )}
                </button>
                <a
                  className="mx-2"
                  href="#"
                  onClick={() => {
                    setOTP(false);
                    setOTPValue("");
                    setError(null);
                    setLogin({ email: "", password: "" });
                  }}
                >
                  {" "}
                  Cancel{" "}
                </a>{" "}
              </div>

              <p className="mb-4 text-center">
                {error && <p className="error_text text-center">{error}</p>}
              </p>

              {/* <p className="mb-4 text-secondary">
                Don't forget to check your Spam/Bulk folder too.
              </p> */}
            </div>
            <div className="form-group login-with-box mb-2">
              <FacebookLogin />
              <GoogleLogin />
            </div>
          </div>
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="bl_form_box gem-decor">
            <div className="form-cntnt-box">
              <h3 className="bl_form_heading">
                Login{" "}
                {source === "upload" && (
                  <span className="span">{"to upload artwork"}</span>
                )}
              </h3>
              <div className="form-group mb-3">
                <InputText
                  title={"Phone number / email"}
                  required={validation.email}
                  name="email"
                  onChange={handleChangeEvent}
                  onKeyPress={handleKeyPressEvent}
                  value={login.email}
                />
              </div>
              {validation.valid_email && (
                <p className="error_text">
                  Please enter a valid email address / phone number
                </p>
              )}
              {alreadyExist && <p className="text-secondary">{alreadyExist}</p>}
              <div className="form-group mb-3 float-icon">
                <InputText
                  title={"Password"}
                  required={validation.password}
                  type={password ? "password" : "text"}
                  name="password"
                  onChange={handleChangeEvent}
                  value={login.password}
                  onKeyPress={handleKeyPressEvent}
                />
                {!password ? (
                  <span onClick={() => setPassword(!password)} className="eye">
                    Hide
                  </span>
                ) : (
                  <span onClick={() => setPassword(!password)} className="eye">
                    Show
                  </span>
                )}
              </div>
              <div className="forgotlink-box">
                <Link className="forgot-link" to="/forgot-password">
                  {"Forgot Password?"}
                </Link>
              </div>

              {validation.valid_password && (
                <p className="error_text">Password not long enough</p>
              )}
              {/* <div className="form-group mb-3">
                <ReCAPTCHA
                  className="recaptcha_box"
                  sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                  onChange={(value) => {
                    console.log("Captcha value:", value);
                    setCaptcha(true);
                  }}
                />
                {validation.captcha && (
                  <p className="error_text">
                    Please verify the CAPTCHA to proceed
                  </p>
                )}
              </div> */}

              <div className="form-group btnor-group mb-2">
                <button
                  type="button"
                  className="bl_btn"
                  onClick={handleLogin}
                  disabled={user.loading}
                >
                  {user.loading ? "Loading..." : "Login"}
                </button>
                <span>or</span>
                <Link to="/signup" className="bl_link-btn">
                  Register
                </Link>
              </div>
              <div className="form-group mb-2">
                {(() => {
                  if (error === "confirm-email") {
                    return <ConfirmError />;
                  } else if (error === "login-locked") {
                    return (
                      <p className="error_text text-center">
                        Your login has been disabled because we detected a
                        suspicions activity on your account.{" "}
                        <a href="https://help.jump.trade/en/support/solutions/articles/84000345960-why-is-my-login-disabled-">
                          Learn more
                        </a>
                      </p>
                    );
                  } else {
                    return <p className="error_text text-center">{error}</p>;
                  }
                })()}
              </div>
            </div>
            <h5 className="seperator">
              <span>Or</span>
            </h5>
            <div className="form-group login-with-box mb-2">
              <FacebookLogin />
              <GoogleLogin />
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default LoginComponent;
