/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router";
import InputOTP from "./../input-otp";

import Wrapper from "../gems/wrapper";
import InputText from "../input-text";
import InputPhone from "./../input-phone";
import { getCookies, getSourceCookies } from "../../utils/cookies";
import {
  registerApi,
  trackIP,
  resendOTP,
  sendOTP,
  verifyOTP,
} from "./../../api/methods";
// import { resendOTP, sendOTP, verifyOTP } from "./../../api/methods-otp";
import {
  validateEmail,
  validateName,
  validInternationalPhone,
  validateNameReplace,
  validatePasswordMinimal,
  gtag_event_types,
  invokeGoogleEvent,
} from "./../../utils/common";

import "./style.scss";
import { useQuery } from "../../hooks/url-params";
import FacebookLogin from "../FacebookLogin";
import GoogleLogin from "../GoogleLogin";
import { invokeHubspotAPI } from "../../api/methods-hubspot";
import { useDispatch, useSelector } from "react-redux";
import { user_login_thunk } from "../../redux/thunk/user_thunk";
// import { useQuery } from "../hooks/url-params";

const RegisterComponent = ({ show_success = false }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { source } = useRouteMatch().params;
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("in");
  const [otpVerify, setOtpVerify] = useState(false);

  const [captcha, setCaptcha] = useState(false);
  const [password, setPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [error, setError] = useState("");
  const [couponError, setCouponError] = useState("");

  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_no: "",
    coupon: "",
    accepted_terms_and_condition: false,
  });

  const [checked, setChecked] = useState(false);
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [otpCheck, setOtpCheck] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [validation, setValidation] = useState({
    first_name: false,
    valid_first_name: false,
    last_name: false,
    valid_last_name: false,
    email: false,
    valid_email: false,
    password: false,
    valid_password: false,
    confirm_password: false,
    valid_confirm_password: false,
    phone_no: false,
    valid_phone_no: false,
    captcha: false,
    accepted_terms_and_condition: false,
  });
  const location = useLocation();
  const reLoading = true;
  const query = useQuery(location.search);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.login && getCookies()) {
      history.push("/accounts/profile");
    }
  }, [user, history]);

  useEffect(() => {
    // dispatch(fire_gtag_event(gtag_event_types["signup"]));
    getLocationDetails();
  }, []);

  useEffect(() => {
    otpVerify && handleSignUp();
  }, [otpVerify]);

  // useEffect(() => {
  //   const coupon = query.get("promocode") ? query.get("promocode") : "";
  //   if (coupon) {
  //     setChecked(true);
  //     setRegister({
  //       ...register,
  //       coupon: coupon,
  //     });
  //   }
  // }, []);

  const getLocationDetails = async () => {
    try {
      const result = await trackIP();

      const ip_code = result.data?.country_code;

      if (ip_code) {
        setCountry(ip_code.toLowerCase());
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 70 ~ getLocationDetails ~ error",
        error
      );
    }
  };

  const handleChangeEvent = (e) => {
    if (e.target.type === "checkbox") {
      setRegister({ ...register, [e.target.name]: e.target.checked });
      setValidation({ ...validation, [e.target.name]: false });
    } else if (e.target.value) {
      if (e.target.name === "first_name" || e.target.name === "last_name") {
        if (validateName(e.target.value)) {
          setRegister({
            ...register,
            [e.target.name]: validateNameReplace(e.target.value),
          });
          setValidation({ ...validation, [e.target.name]: false });
        }
      } else if (e.target.name === "email") {
        setRegister({ ...register, [e.target.name]: e.target.value.trim() });
        setValidation({ ...validation, [e.target.name]: false });
      } else {
        if (e.target.name === "confirm_password")
          setConfirmPassword(e.target.value);
        else setRegister({ ...register, [e.target.name]: e.target.value });
        setValidation({ ...validation, [e.target.name]: false });
      }
    } else {
      if (e.target.name === "confirm_password")
        setConfirmPassword(e.target.value);
      else setRegister({ ...register, [e.target.name]: e.target.value });
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const checkValidation = () => {
    let isValid = false;
    let c_validation = { ...validation };
    if (!register.first_name) {
      c_validation = { ...c_validation, first_name: true };
    } else {
      if (validateName(register.first_name)) {
        c_validation = { ...c_validation, valid_first_name: false };
      } else {
        c_validation = { ...c_validation, valid_first_name: true };
      }
    }

    // if (!register.last_name) {
    //   c_validation = { ...c_validation, last_name: true };
    // } else {
    //   if (validateName(register.last_name)) {
    //     c_validation = { ...c_validation, valid_last_name: false };
    //   } else {
    //     c_validation = { ...c_validation, valid_last_name: true };
    //   }
    // }
    if (!register.email) {
      c_validation = { ...c_validation, email: true };
    } else {
      if (validateEmail(register.email)) {
        c_validation = { ...c_validation, valid_email: false };
      } else {
        c_validation = { ...c_validation, valid_email: true };
      }
    }
    if (!register.password) {
      c_validation = { ...c_validation, password: true };
    } else {
      if (validatePasswordMinimal(register.password)) {
        c_validation = { ...c_validation, valid_password: false };
      } else {
        c_validation = { ...c_validation, valid_password: true };
      }
    }

    if (!confirmPassword) {
      c_validation = { ...c_validation, confirm_password: true };
    } else {
      if (register.password === confirmPassword) {
        c_validation = { ...c_validation, valid_confirm_password: false };
      } else {
        c_validation = { ...c_validation, valid_confirm_password: true };
      }
    }

    if (!register.phone_no) {
      c_validation = { ...c_validation, phone_no: true };
    } else {
      if (validInternationalPhone(register.phone_no, register.phone_code)) {
        c_validation = { ...c_validation, valid_phone_no: false };
      } else {
        c_validation = { ...c_validation, valid_phone_no: true };
      }
    }
    if (!register.accepted_terms_and_condition) {
      c_validation = { ...c_validation, accepted_terms_and_condition: true };
    } else {
      c_validation = { ...c_validation, accepted_terms_and_condition: false };
    }

    if (checked && !register.coupon) {
      c_validation = { ...c_validation, coupon: true };
    } else {
      c_validation = { ...c_validation, valid_coupon: false };
    }

    if (captcha) {
      c_validation = { ...c_validation, captcha: false };
    } else {
      c_validation = { ...c_validation, captcha: true };
    }

    if (process.env.REACT_APP_ENVIRONMENT === "local") {
      c_validation = { ...c_validation, captcha: false };
    }

    setValidation(c_validation);
    if (
      !c_validation.first_name &&
      !c_validation.valid_first_name &&
      // !c_validation.last_name &&
      // !c_validation.valid_last_name &&
      !c_validation.email &&
      !c_validation.password &&
      !c_validation.phone_no &&
      !c_validation.confirm_password &&
      !c_validation.valid_confirm_password &&
      !c_validation.valid_email &&
      !c_validation.valid_password &&
      !c_validation.valid_phone_no &&
      !c_validation.accepted_terms_and_condition
    ) {
      isValid = true;
    } else {
      isValid = false;
    }

    !isValid && invokeGoogleEvent("user_reg_info_error");

    if (
      !otpVerify &&
      get_phone_without_country_code(register.phone_no) &&
      isValid
    ) {
      // setOtpCheck(true);
      handleSendOTP();
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (checkValidation()) {
      // dispatch(fire_gtag_event(gtag_event_types["signup-register"]));
      try {
        if (!otpVerify) {
          handleSendOTP();
          return;
        }
        setLoading(true);

        let apiInput = { ...register };

        if (!checked) {
          apiInput = { ...register, coupon: null };
        }

        if (source) {
          apiInput = { ...register, source };
        } else {
          const c_source = getSourceCookies();

          if (c_source && c_source !== undefined && c_source !== "undefined") {
            apiInput = { ...register, source: c_source };
          } else {
            apiInput = { ...register, source: null };
          }
        }
        apiInput = {
          ...apiInput,
          utm_source: user?.utm_source,
          utm_medium: user?.utm_medium,
        };
        const result = await registerApi(apiInput);

        if (result.status === 201) {
          let loginApiRequest = {
            email: get_phone_without_country_code(register.phone_no),
            password: register.password,
          };
          dispatch(user_login_thunk(loginApiRequest, setError, null));
          await invokeHubspotAPI({
            ...apiInput,
            gems_email_optin: marketing,
          });

          // setRegisterSuccess(true);
          // if (source === "orangecomet") {
          //   window.open("/signup/success/orangecomet", "_self");
          // } else {
          //   window.open("/signup/success", "_self");
          // }
        }
      } catch (err) {
        setLoading(false);
        if (err?.status === 422) {
          if (err?.data?.error_code === 0) {
            if (register.email) {
              window.open(`/signin?email=${register.email}`, "_self");
              // window.open(`/signin`, "_self");
            } else {
              setError(
                "This Email is already associated with a GuardianLink ID. Please Login or use a different email to register."
              );
            }
          }
          if (err?.data?.error_code === 1) {
            setCouponError("You have entered an invaild coupon code");
          }
        } else {
          toast.error("An unexpected error occured. Please try again ");
          console.log(
            "🚀 ~ file: index.js ~ line 106 ~ handleSignUp ~ err",
            err
          );
        }
      }

      setLoading(false);
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleSignUp();
    }
  };
  const get_phone_without_country_code = (phno) =>
    phno.substring(2).length === 10 ? phno.substring(2) : false;

  const handleSendOTP = async () => {
    if (otpVerify) return;
    setOtpInput("");
    if (!register.phone_no) return;
    let mobile_no = get_phone_without_country_code(register.phone_no);
    if (!mobile_no) return;
    let request = new FormData();
    request.append("mobile_no", mobile_no);
    request.append("email", register.email);
    try {
      const result = await sendOTP(request);
      if (result?.status === 200) {
        let googleEventPayload = {
          email: register.email,
          t_c: register.accepted_terms_and_condition ? "yes" : "no",
          t_n: marketing ? "yes" : "no",
        };
        invokeGoogleEvent("user_reg_info_success", googleEventPayload);
        setOtpCheck(true);
      } else invokeGoogleEvent("user_reg_info_error");
    } catch (error) {
      invokeGoogleEvent("user_reg_info_error");
      if (error?.status === 422) {
        toast.warn(
          error?.data?.message
            ? error?.data?.message
            : "Email / Phone number is already registered"
        );
      } else {
        toast.error("Please try again after some time");
      }
      console.log("Error in sending OTP");
    }
  };
  const handleVerifyOTP = async () => {
    // if (window.fbq && typeof window.fbq === "function")
    //   window.fbq("trackCustom", "GemsNFT_VerifyOTP");
    // dispatch(fire_gtag_event(gtag_event_types["ads-submit-otp"]));
    if (otpVerify) {
      toast.info("Phone number already verified");
      return;
    }
    let mobile_no = get_phone_without_country_code(register.phone_no);
    if (!mobile_no) return;
    try {
      let request = new FormData();
      request.append("mobile_no", mobile_no);
      request.append("otp", otpInput);
      const result = await verifyOTP(request);
      if (result?.data?.type === "success") {
        // setOtpCheck(false);
        invokeGoogleEvent("user_reg_otp_success", {
          eventAction: "otp",
          email: register.email,
        });
        setOtpVerify(true);
      } else {
        toast.error("OTP does not match");
      }
    } catch (error) {
      toast.error("Please try again after some time");
      console.log("Error in verifying OTP");
    }
  };

  const handleResendOTP = async () => {
    invokeGoogleEvent("user_reg_otp_resend");
    let request = new FormData();
    try {
      request.append(
        "mobile_no",
        get_phone_without_country_code(register.phone_no)
      );
      const result = await resendOTP(request);
      if (result?.data?.type === "success") {
        setOtpInput("");
        toast.info("OTP has been sent to your mobile number.");
      } else {
        toast.info(
          "OTP retry count is maxed out. Please try again after some time."
        );
      }
    } catch (error) {
      toast.error("Please try again after some time");
      console.log("Error in re-sending the OTP");
    }
  };

  const RegisterLogics = () => {
    return (
      <>
        {!otpCheck ? (
          <>
            {show_success ? (
              <div className="bl_form_box gem-decor">
                <div className="form-cntnt-box">
                  <h4>Welcome to Cadbury Gems Junior NFT!!!</h4>
                  <p>You're just a step away from uploading your artworks.</p>

                  <p className="mb-4">
                    Please <Link to="/signin"> login </Link> to continue{" "}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bl_form_box gem-decor align-self-start">
                <div className="form-cntnt-box">
                  <h3 className="bl_form_heading">Sign up</h3>

                  <div className="form-group mb-3">
                    <InputText
                      title={"Name *"}
                      name="first_name"
                      value={register.first_name}
                      required={validation.first_name}
                      onKeyPress={handleKeyPressEvent}
                      onChange={handleChangeEvent}
                      placeholder="Enter your name here"
                    />
                    {validation.valid_first_name && (
                      <p className="error_text">
                        Please enter a valid first name
                      </p>
                    )}
                  </div>
                  {/* <div className="form-group mb-3">
                <InputText
                  title={"Last name"}
                  name="last_name"
                  value={register.last_name}
                  required={validation.last_name}
                  onKeyPress={handleKeyPressEvent}
                  onChange={handleChangeEvent}
                />
                {validation.valid_last_name && (
                  <p className="error_text">Please enter a valid last name</p>
                )}
              </div> */}
                  <div className="form-group mb-3">
                    <InputText
                      title={"Email id *"}
                      name="email"
                      required={validation.email}
                      value={register.email}
                      onKeyPress={handleKeyPressEvent}
                      onChange={handleChangeEvent}
                      placeholder="Enter your email here"
                    />
                    {validation.valid_email && (
                      <p className="error_text">
                        Please enter a valid email address
                      </p>
                    )}
                    {error && <p className="error_text">{error}</p>}
                  </div>
                  <div className="form-group mb-3 float-icon">
                    <InputPhone
                      title={"Phone Number *"}
                      defaultCountry={country}
                      value={register.phone_no}
                      required={validation.phone_no}
                      onEnterKeyPress={handleSignUp}
                      onlyCountries={["in"]}
                      countryCodeEditable={false}
                      onChange={(e, c_code) => {
                        setRegister({
                          ...register,
                          phone_no: e,
                          phone_code: c_code.countryCode.toUpperCase(),
                        });
                        if (e) {
                          setValidation({ ...validation, phone_no: false });
                        } else {
                          setValidation({ ...validation, phone_no: true });
                        }
                      }}
                    />
                    {validation.valid_phone_no && (
                      <p className="error_text">
                        Please enter a valid phone number
                      </p>
                    )}
                    {/* <span className="eye" onClick={() => handleSendOTP()}>
                      {`${otpVerify ? "verified" : "verify"}`}
                    </span> */}
                  </div>
                  <div className="form-group mb-3 float-icon">
                    <InputText
                      title={"Password *"}
                      type={password ? "password" : "text"}
                      name="password"
                      required={validation.password}
                      value={register.password}
                      onKeyPress={handleKeyPressEvent}
                      onChange={handleChangeEvent}
                      isPop
                      popText="Your password should have a minimum of 8 characters."
                    />

                    {!password ? (
                      <span
                        className="eye"
                        onClick={() => setPassword(!password)}
                      >
                        Hide
                      </span>
                    ) : (
                      <span
                        className="eye"
                        onClick={() => setPassword(!password)}
                      >
                        Show
                      </span>
                    )}
                  </div>

                  {validation.valid_password && (
                    <p className="error_text">
                      Your password does not comply with our password policy.
                    </p>
                  )}

                  <div className="form-group mb-3 float-icon">
                    <InputText
                      title={"Confirm Password *"}
                      type={confirmPasswordType ? "password" : "text"}
                      name="confirm_password"
                      required={validation.confirm_password}
                      value={confirmPassword}
                      onKeyPress={handleKeyPressEvent}
                      onChange={handleChangeEvent}
                      isPop
                      popText="Your password should have a minimum of 8 characters."
                    />

                    {!confirmPasswordType ? (
                      <span
                        className="eye"
                        onClick={() =>
                          setConfirmPasswordType(!confirmPasswordType)
                        }
                      >
                        Hide
                      </span>
                    ) : (
                      <span
                        className="eye"
                        onClick={() =>
                          setConfirmPasswordType(!confirmPasswordType)
                        }
                      >
                        Show
                      </span>
                    )}
                  </div>

                  {validation.valid_confirm_password && (
                    <p className="error_text">Your password does not match.</p>
                  )}

                  <div className="form-group mb-3">
                    <input
                      type="checkbox"
                      name="accepted_terms_and_condition"
                      role={"button"}
                      checked={register.accepted_terms_and_condition}
                      required={validation.accepted_terms_and_condition}
                      onKeyPress={handleKeyPressEvent}
                      onChange={handleChangeEvent}
                      className="styled-checkbox"
                      id="styled-checkbox-1"
                    />{" "}
                    <label htmlFor="styled-checkbox-1">
                      By clicking on REGISTER, you agree to our{" "}
                      <a href="/terms-and-conditions">T&Cs</a> and{" "}
                      <a href="/privacy-policy">Privacy Policy</a>{" "}
                    </label>{" "}
                    {validation.accepted_terms_and_condition && (
                      <p className="error_text">
                        Please accept the Terms and Conditions
                      </p>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="checkbox"
                      name="marketing_communication"
                      role={"button"}
                      checked={marketing}
                      onChange={() => setMarketing(!marketing)}
                      className="styled-checkbox"
                      id="styled-checkbox-2"
                    />{" "}
                    <label htmlFor="styled-checkbox-2">
                      I would like to receive promotional communications from
                      Mondelēz (Cadbury) about its products and offers.{" "}
                    </label>{" "}
                  </div>
                  {/* {checked && (
                <div className="form-group mb-3">
                  <InputText
                    title={"Coupon Code"}
                    type="text"
                    value={register.coupon}
                    required={validation.coupon}
                    onKeyPress={handleKeyPressEvent}
                    onChange={(e) => {
                      setRegister({
                        ...register,
                        coupon: e.target.value,
                      });
                      if (e) {
                        setValidation({ ...validation, coupon: false });
                      } else {
                        setValidation({ ...validation, coupon: true });
                      }
                    }}
                  />
                  {validation.valid_coupon && (
                    <p className="error_text">
                      Please enter a valid coupon code
                    </p>
                  )}
                  {couponError && <p className="error_text">{couponError}</p>}
                </div>
              )} */}

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
                      disabled={loading}
                      type="button"
                      className="bl_btn"
                      onClick={handleSignUp}
                    >
                      {loading ? "Loading..." : "Register"}
                    </button>
                    <span>Or</span>
                    <Link
                      to="/signin"
                      className="bl_link-btn"
                      onClick={() =>
                        invokeGoogleEvent("user_login", {
                          eventAction: "login click",
                        })
                      }
                    >
                      Login
                    </Link>
                    <small>If already registered</small>
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
            )}
          </>
        ) : (
          <div className="bl_form_box gem-decor otp">
            <div className="form-cntnt-box">
              <h3 className="bl_form_heading_otp text-center">
                Verify phone number
              </h3>
              <p className="mt-5 text-center fw-bold">
                We sent you a code to verify your phone number
              </p>
              <p className="bl_form_send_otp mt-1 text-center fw-bold">
                sent to +{register.phone_no}
              </p>
              <div className="form-group mb-3">
                <InputOTP
                  value={otpInput}
                  onChange={(otp) => setOtpInput(otp)}
                />
              </div>
              {validation.valid_email && (
                <p className="error_text">Please enter a valid email address</p>
              )}

              <div role={"button"} className="text-center mb-3">
                I didn't receive a code!
                <br />
                <a className="theme-link" onClick={handleResendOTP}>
                  Resend
                </a>
              </div>

              <div className="form-group btnor-group mb-2">
                <button
                  type="button"
                  className="bl_btn"
                  onClick={handleVerifyOTP}
                  disabled={otpInput.length !== 6}
                >
                  {`${loading ? "verifying OTP ..." : "verify"}`}
                </button>
                <a
                  className="mx-2"
                  onClick={() => {
                    setOtpCheck(false);
                  }}
                >
                  Cancel
                </a>
              </div>
            </div>

            {/* <div className="form-group login-with-box mb-2">
              <FacebookLogin />
              <GoogleLogin />
            </div> */}
          </div>
        )}
      </>
    );
  };

  return <Wrapper>{RegisterLogics()}</Wrapper>;
};

export default RegisterComponent;
