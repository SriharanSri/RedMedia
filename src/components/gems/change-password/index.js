import { useState, useRef } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaRegTimesCircle } from "react-icons/fa";
import InputText from "../../input-text";
import {
  invokeGoogleEvent,
  validatePasswordMinimal,
} from "../../../utils/common";
import { changePasswordApi } from "../../../api/methods";
import { toast } from "react-toastify";

const ChangePasswordModel = ({ show, onHide }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toolShow, setToolShow] = useState(false);
  const target = useRef(null);
  const [data, setData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [validation, setValidation] = useState({
    current_password: false,
    password: false,
    password_confirmation: false,
  });

  const handleChangeEvent = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.value) {
      setValidation({ ...validation, [e.target.name]: false });
    } else {
      setValidation({ ...validation, [e.target.name]: true });
    }
  };

  const handleChangePassword = async () => {
    if (checkValidation()) {
      const { password, password_confirmation } = data;

      if (password === password_confirmation) {
        if (validatePasswordMinimal(password)) {
          try {
            invokeGoogleEvent("password_edit");
            setError(null);
            setLoading(true);

            const result = await changePasswordApi(data);
            if (result.status === 200) {
              setData({
                current_password: "",
                password: "",
                password_confirmation: "",
              });
              toast.success("Password updated successfully");
              onHide();
            }
          } catch (err) {
            if (err?.status === 422) {
              setError(
                "The old password is invalid. Please create a new password compliant with our password policy. "
              );
            } else {
              console.log("🚀 ~ handleChangePassword ~ err", err);
            }
          } finally {
            setLoading(false);
          }
        } else {
          setError("Your password does not comply with our password policy.");
        }
      } else {
        setError("Passwords do not match");
      }
    }
  };

  const checkValidation = () => {
    let c_validation = { ...validation };

    if (!data.current_password) {
      c_validation = { ...c_validation, current_password: true };
    }
    if (!data.password) {
      c_validation = { ...c_validation, password: true };
    }
    if (!data.password_confirmation) {
      c_validation = { ...c_validation, password_confirmation: true };
    }

    setValidation(c_validation);
    if (
      !c_validation.current_password &&
      !c_validation.password &&
      !c_validation.password_confirmation
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleKeyPressEvent = (event) => {
    if (event.key === "Enter") {
      handleChangePassword();
    }
  };
  return (
    <>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Change your password
          </Modal.Title>
          <span onClick={onHide} className="model-close-btn">
            <FaRegTimesCircle />
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <InputText
              title={"Current Password"}
              type="password"
              required={validation.current_password}
              name="current_password"
              placeholder="Enter current password"
              onChange={handleChangeEvent}
              value={data.current_password}
              onKeyPress={handleKeyPressEvent}
            />
          </div>
          <OverlayTrigger
            delay={{ hide: 500, show: 100 }}
            overlay={(props) => (
              <Tooltip className="password-terms" {...props}>
                Your password should have a minimum of 8 characters.
              </Tooltip>
            )}
            placement="right"
          >
            <div className="mb-3">
              <InputText
                className="password-terms"
                title={"New Password"}
                type="password"
                required={validation.password}
                name="password"
                onChange={handleChangeEvent}
                value={data.password}
                placeholder="Enter new password"
                onKeyPress={handleKeyPressEvent}
                isPop
                popText="Your password should have a minimum of 8 characters."
              />
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            delay={{ hide: 500, show: 100 }}
            overlay={(props) => (
              <Tooltip className="my-tooltip" {...props}>
                Your password should have a minimum of 8 characters.
              </Tooltip>
            )}
            placement="right"
          >
            <div className="mb-3">
              <InputText
                title={"Confirm Password"}
                type="password"
                required={validation.password_confirmation}
                name="password_confirmation"
                onChange={handleChangeEvent}
                placeholder="Confirm new password"
                value={data.password_confirmation}
                onKeyPress={handleKeyPressEvent}
                isPop
                popText="Your password should have a minimum of 8 characters."
              />
            </div>
          </OverlayTrigger>
          <div></div>
        </Modal.Body>
        <Modal.Footer>
          {error && <div className="text-danger mb-2">{error}</div>}
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangePasswordModel;
