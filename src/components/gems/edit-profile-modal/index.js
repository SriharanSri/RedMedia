import { useEffect, useRef, useState } from "react";
import { Modal, Button, ModalFooter } from "react-bootstrap";
import userImg from "../../../images/user_1.png";
import InputText from "../../input-text";
import { FaCamera, FaRegTimesCircle } from "react-icons/fa";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { BiLoaderAlt } from "react-icons/bi";
import { user_load_by_token_thunk } from "../../../redux/thunk/user_thunk";
import { getCookies } from "../../../utils/cookies";
import {
  profileUpdateApi,
  resendOTP,
  sendOTP,
  updateAvatar,
  verifyOTP,
  verifyUpdateOTP,
} from "../../../api/methods";
import { invokeGoogleEvent } from "../../../utils/common";
import InputOTP from "../../input-otp";
import { toast } from "react-toastify";

const EditProfileModal = ({ show, onHideClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [otpCheck, setOtpCheck] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  // user?.data?.user?.private_name ? user?.data?.user?.private_name : ""
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [moShow, setMoShow] = useState(false);
  const [disabledUpdate, setDisableUpdate] = useState(false);
  const [userAvatar, setUserAvatar] = useState(() => ({
    base64: null,
    file: null,
  }));
  const [avatarLoading, setAvatarLoading] = useState(false);
  const avatarImageRef = useRef();
  const handleChangeEvent = (e) => {
    if (!e.target.value) setInvalidName(true);
    setName(e.target.value);
  };
  const handlehMobileNumber = (e) => {
    if (!e.target.value) setInvalidNumber(true);
    setMobileNumber(e.target.value);
    if (e.target.value.length > e.target.maxLength) {
    }
  };
  const handleKeyPressEvent = (e) => {
    // if (e.target.value.length == 10) return false;
  };

  const handleAvatarChange = (input) => {
    for (let file of input.target.files) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setUserAvatar({ base64: event.target.result, file: file });
      reader.readAsDataURL(file);
    }
  };
  const handleSendOTP = async () => {
    if (otpVerify) return;
    setOtpInput("");
    // if (!register.phone_no) return;
    // let mobile_no = get_phone_without_country_code(register.phone_no);
    // if (!mobile_no) return;
    let request = new FormData();
    request.append("mobile_no", mobileNumber);
    // request.append("email", register.email);
    try {
      const result = await sendOTP(request);
      if (result?.status === 200) {
        // let googleEventPayload = {
        //   email: register.email,
        //   t_c: register.accepted_terms_and_condition ? "yes" : "no",
        //   t_n: marketing ? "yes" : "no",
        // };
        // invokeGoogleEvent("user_reg_info_success", googleEventPayload);
        setOtpCheck(true);
      }
      // else invokeGoogleEvent("user_reg_info_error");
    } catch (error) {
      // invokeGoogleEvent("user_reg_info_error");
      if (error?.status === 422) {
        toast.warn(
          error?.data?.message
            ? error?.data?.message
            : "Email / Phone number is already registered"
        );
      } else {
        toast.error("Please try again after some time");
      }
      // console.log("Error in sending OTP");
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
    let mobile_no = mobileNumber;
    if (!mobile_no) return;
    try {
      let request = new FormData();
      request.append("mobile_no", mobile_no);
      request.append("otp", otpInput);
      const result = await verifyOTP(request);

      if (result?.data?.type === "success") {
        // setOtpCheck(false);
        // invokeGoogleEvent("user_reg_otp_success", {
        //   eventAction: "otp",
        //   email: register.email,
        // });
        setOtpVerify(true);

        try {
          let request_param = new FormData();
          request_param.append("mobile_no", mobileNumber);
          const updateNumber = await verifyUpdateOTP(request_param);
          if (updateNumber.data.success == true) {
            toast.info("Phone number already verified");
            handleUpdate();
            setModalShow(false);
          }
          // console.log(updateNumber.data, "result");
        } catch (error) {
          // console.log(error, "err");
          toast.error("Please try again after some time");
          // console.log("Error in sending after verfy OTP");
        }
      } else {
        toast.error("OTP does not match");
      }
    } catch (error) {
      toast.error("Please try again after some time");
      // console.log("Error in verifying OTP");
    }
  };

  const handleResendOTP = async () => {
    invokeGoogleEvent("user_reg_otp_resend");
    let request = new FormData();
    try {
      request.append("mobile_no", mobileNumber);
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
    }
  };

  const handleSaveAvatar = async () => {
    try {
      if (!userAvatar?.file) return;
      setAvatarLoading(true);
      var formData = new FormData();
      formData.append("user[user_profile_attributes][avatar]", userAvatar.file);
      await updateAvatar(user?.data?.user?.slug, formData);
      setAvatarLoading(false);
      setUserAvatar({ file: null, base64: null });
      // dispatch(user_load_by_token_thunk(getCookies()));
    } catch (error) {
      setAvatarLoading(false);
      // console.log("🚀 ~ handleSaveAvatar ~ error", error);
    }
  };

  const HandleMobileUpdate = () => {
    setModalShow(true);
    setMoShow(false);
    handleSendOTP();
  };
  const handleClose = () => setModalShow(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      invokeGoogleEvent("profile_edit", {
        eventAction: "edit",
        eventLabel: "update",
      });
      if (userAvatar?.file !== null) await handleSaveAvatar();
      if (
        name &&
        name !== user?.data?.user?.private_name &&
        user?.data?.user?.slug
      ) {
        let updateData = {
          first_name: name,
          avatar_url: userAvatar,
          last_name: "",
          private: false,
          private_name: name,
          phone_no: user?.data?.user?.phone_no,
          phone_code: user?.data?.user?.phone_code,
          user_profile_attributes: {
            desc: "",
            website: "",
            social_links: {
              facebook: "",
              instagram: "",
              telegram: "",
              twitter: "",
            },
          },
        };
        const result = await profileUpdateApi({
          slug: user?.data?.user?.slug,
          data: {
            user: updateData,
          },
        });
      }
      if (
        (userAvatar && userAvatar?.file !== null) ||
        (name &&
          name !== user?.data?.user?.private_name &&
          user?.data?.user?.slug)
      ) {
        const token = getCookies();
        if (token) {
          dispatch(user_load_by_token_thunk(token));
        }
      }
    } catch (err) {
      if (err.data.message === "Your name has already been taken")
        console.log(err.data.message);
    } finally {
      setLoading(false);
      onHideClose();
    }
  };

  useEffect(() => {
    if (
      userAvatar?.file === null &&
      (name === user?.data?.user?.private_name || name === "")
    )
      setDisableUpdate(true);
    else setDisableUpdate(false);
  }, [userAvatar?.file, name]);

  useEffect(() => {
    show && setMoShow(true);
    invokeGoogleEvent("profile_edit", { eventAction: "edit" });
  }, [show]);

  return (
    <>
      <Modal
        show={moShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit your profile
          </Modal.Title>
          <span onClick={onHideClose} className="model-close-btn">
            <FaRegTimesCircle />
          </span>
        </Modal.Header>
        <Modal.Body>
          <div
            className="user-profile-image-block"
            onClick={() => avatarImageRef.current.click()}
          >
            <img
              className="user-image"
              src={(() => {
                if (userAvatar?.base64) {
                  return userAvatar?.base64;
                } else if (user?.data?.user?.avatar_url) {
                  return user?.data?.user?.avatar_url;
                } else {
                  return userImg;
                }
              })()}
              alt="user-icon"
            />
            <div className="item-image-container">
              <FaCamera className="item-image" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={avatarImageRef}
              style={{ display: "none" }}
              onClick={(event) => {
                event.target.value = null;
              }}
              onChange={handleAvatarChange}
            />
            {avatarLoading && (
              <div className="item-loading">
                <BiLoaderAlt size={25} className="fa fa-spin" color="white" />
              </div>
            )}
          </div>
          <InputText
            className="name"
            title={"Name"}
            name="first_name"
            value={name}
            // onKeyPress={handleKeyPressEvent}
            onChange={handleChangeEvent}
            placeholder="Change your name"
          />
          {!user?.data?.user?.phone_no && (
            <InputText
              className="number"
              title={"Mobile number"}
              name="number"
              value={mobileNumber}
              onKeyPress={handleKeyPressEvent}
              onChange={handlehMobileNumber}
              placeholder="Enter your number"
              pattern="/^-?\d+\.?\d*$/"
              maxLength={10}
              type="text"
            />
          )}

          {/* {validation.artist_name && (
            <p className="error_text">Please enter a valid name</p>
          )} */}
          <div></div>
        </Modal.Body>
        <Modal.Footer>
          {user?.data?.user?.phone_no ? (
            <Button disabled={disabledUpdate || loading} onClick={handleUpdate}>
              {loading ? "Updating..." : "Update"}
            </Button>
          ) : (
            <Button
              disabled={mobileNumber.length !== 10}
              onClick={HandleMobileUpdate}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title> Verify phone number</Modal.Title>
        </Modal.Header>

        <div className="bl_form_box gem-decor otp">
          <div className="form-cntnt-box">
            {/* <h3 className="bl_form_heading_otp text-center">
              Verify phone number
            </h3> */}
            <p className="text-center fw-bold">
              We sent you a code to verify your phone number
            </p>
            <p className="bl_form_send_otp mt-1 text-center fw-bold color-red">
              sent to +91{mobileNumber}
            </p>
            <div className="form-group mb-3">
              <InputOTP value={otpInput} onChange={(otp) => setOtpInput(otp)} />
            </div>

            <div role={"button"} className="text-center mb-3">
              I didn't receive a code!
              <br />
              <a className="theme-link" onClick={handleResendOTP}>
                Resend
              </a>
            </div>
            <ModalFooter>
              <div className="form-group btnor-group mb-2 align-footer">
                <button
                  type="button"
                  className="bl_btn"
                  onClick={handleVerifyOTP}
                  disabled={otpInput.length !== 6}
                >
                  {`${loading ? "verifying OTP ..." : "verify"}`}
                </button>
                <a
                  className="mx-2 theme-link"
                  onClick={() => {
                    setOtpCheck(false);
                    setModalShow(false);
                  }}
                >
                  Cancel
                </a>
              </div>
            </ModalFooter>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModal;
