import React, { useState } from "react";

import { changePasswordApi } from "../../api/methods";
import { toast } from "react-toastify";
import InputText from "./../input-text";
import { validatePassword } from "./../../utils/common";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
        if (validatePassword(password)) {
          try {
            setError(null);
            setLoading(true);

            const result = await changePasswordApi(data);
            if (result.status === 200) {
              toast.success("Password Updated Successfully");
              setData({
                current_password: "",
                password: "",
                password_confirmation: "",
              });
            }
          } catch (err) {
            setLoading(false);

            if (err?.status === 422) {
              setError(
                "The Current Password Is Invalid. Please Create A New Password Compliant With Our Password Policy. "
              );
            } else {
              toast.error("An unexpected error occured. Please try again ");
              console.log(
                "🚀 ~ file: index.js ~ line 106 ~ handleSignUp ~ err",
                err
              );
            }
          }

          setLoading(false);
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

  return (
    <>
      {/* <div className="col-md-10"> */}
      <div className="main-content-block container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="wallet-user mt-3">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <h3 className="wallet-title">Settings </h3>{" "}
                </div>
              </div>
            </div>
            <div className="bid-activity">
              <div className="banner-content">
                <div className="media">
                  <div className="media-body">
                    <h4 className="transaction-history-title">Password</h4>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="user-settings mt-3 mb-5">
              <div className="passwordChange">
                <div className="mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <InputText
                        title="Current Password"
                        type="password"
                        required={validation.current_password}
                        name="current_password"
                        placeholder="Enter Current Password"
                        onChange={handleChangeEvent}
                        value={data.current_password}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <InputText
                        title="Set New Password"
                        type="password"
                        required={validation.password}
                        name="password"
                        onChange={handleChangeEvent}
                        value={data.password}
                        placeholder="Enter New Password"
                        isPop
                        popText="Your password should have a minimum of 6 characters, and should
                        include an uppercase letter and a number."
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <InputText
                        title="Confirm Your New Password"
                        type="password"
                        required={validation.password_confirmation}
                        name="password_confirmation"
                        onChange={handleChangeEvent}
                        placeholder="Enter Confirm Your New Password"
                        value={data.password_confirmation}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    {error && <div className="text-danger mb-2">{error}</div>}
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={handleChangePassword}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Change Password"}
                    </button>
                  </div>
                </div>
                {/* <hr className="hr-form" />
                <div className="bid-activity">
                  <div className="banner-content">
                    <div className="media">
                      <div className="media-body">
                        <h4 className="transaction-history-title">
                          Notifications Settings{" "}
                        </h4>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">All</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: "60%" }}>When you win a bid</td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck132"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck132"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div className="switch-col">
                          <div className="switch">
                            <input
                              id="switch-1"
                              type="checkbox"
                              className="switch-input"
                            />
                            <label htmlFor="switch-1" className="switch-label">
                              Switch
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%" }}>When someone follows you</td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck27"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck27"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck21"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck21"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div className="switch-col">
                          <div className="switch">
                            <input
                              id="switch-2"
                              type="checkbox"
                              className="switch-input"
                            />
                            <label htmlFor="switch-2" className="switch-label">
                              Switch
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "60%" }}>
                        When someone bids higher than you
                      </td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck35"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck35"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck65"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck65"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div className="switch-col">
                          <div className="switch">
                            <input
                              id="switch-3"
                              type="checkbox"
                              className="switch-input"
                            />
                            <label htmlFor="switch-3" className="switch-label">
                              Switch
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
