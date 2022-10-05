import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import InputText from "../input-text";
import Wrapper from "../gems/wrapper";
import { validateEmail } from "./../../utils/common";
import { forgotPasswordApi } from "./../../api/methods";
import { openWindowBlank } from "./../../utils/common";
import ToolTip from "../tooltip";
import guardian_logo from "../../images/jump-trade/guardianLinkLogo.png";

const ForgotPasswordComponent = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    email: false,
    valid_email: false,
  });
  const [input, setInput] = useState({
    email: "",
  });

  const handleSubmit = async () => {
    if (checkValidation()) {
      try {
        setLoading(true);
        const result = await forgotPasswordApi(input.email);

        setLoading(false);
        if (result.status === 200) {
          setSuccess(true);
        }
      } catch (err) {
        toast.error("An unexpected error occured. Please try again ");
        console.log("🚀 ~ file: index.js ~ line 106 ~ handleSignUp ~ err", err);

        setLoading(false);
      }
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };

    if (!input.email) {
      c_validation = { ...c_validation, email: true };
    } else {
      if (validateEmail(input.email)) {
        c_validation = { ...c_validation, valid_email: false };
      } else {
        c_validation = { ...c_validation, valid_email: true };
      }
    }

    setValidation(c_validation);
    if (!c_validation.email && !c_validation.valid_email) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeEvent = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    if (e.target.value) {
      setValidation({ ...validation, [e.target.name]: false });
    } else {
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Wrapper>
        {success ? (
          <div className="bl_form_box gem-decor">
            <div className="form-cntnt-box">
              <h4>We've Sent A Mail To Reset Your Password!</h4>
              <p>
                Check your email and follow the simple procedures to reset your
                password.
              </p>
              <p className="mb-4">
                The reset password link is valid only for 10 minutes! Act fast
                to regain your access to your account!
              </p>
              <p className="mb-4">
                Please <Link to="/signin"> click here </Link> to login{" "}
              </p>
            </div>
          </div>
        ) : (
          <div className="bl_form_box gem-decor forget_block">
            <div className="form-cntnt-box">
              <h4>Forgot Password</h4>
              <div className="form-group mb-3">
                <InputText
                  type="email"
                  title={"Email Address"}
                  required={validation.email}
                  name="email"
                  placeholder="eg example@gmail.com"
                  onChange={handleChangeEvent}
                  onKeyPress={handleKeyPressEvent}
                />
                {validation.valid_email && (
                  <p className="error_text">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              <div className="form-group btnor-group">
                <button
                  disabled={loading}
                  type="button"
                  className="bl_btn"
                  onClick={handleSubmit}
                >
                  {"Send Email"}
                </button>
                {/* <button className="bl_btn bl_btn_border">Cancel</button> */}
              </div>
            </div>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default ForgotPasswordComponent;
