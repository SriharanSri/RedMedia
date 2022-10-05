import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useSelector } from "react-redux";

import InputOTP from "./../input-otp";
import {
  currencyFormat,
  validateCurrency,
  dot,
  roundDown,
  feeCharges,
} from "./../../utils/common";
import { withdrawOTPVerifyApi, withdrawOTPApi } from "../../api/methods";

import "./style.scss";

const CryptoDetailsWithdraw = ({
  withdrawFund,
  setWithdrawFund,
  handleWithdrawProcess,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("binance");
  const [confirm, setConfirm] = useState({
    status: false,
    otp: "",
    password: "",
    sms_otp: "",
  });

  const [receive, setReceive] = useState(0);

  const handleSubmit = async () => {
    if (
      amount &&
      parseFloat(amount) >= parseFloat(withdrawFund.fee.min_amount) &&
      parseFloat(amount) <= parseFloat(withdrawFund.fee.max_amount)
    ) {
      if (parseFloat(withdrawFund.balance) >= parseFloat(amount)) {
        if (receive > 0) {
          setError("");
          try {
            setLoading(true);
            await withdrawOTPApi({
              payment_type: withdrawFund.type,
              amount: amount,
              address: address,
              network: network,
            });
            toast.success("OTP sent successfully to your email address");
            setLoading(false);
            setConfirm({ ...confirm, status: true });
          } catch (err) {
            setLoading(false);
            console.log(
              "🚀 ~ file: withdraw.js ~ line 41 ~ handleSubmit ~ err",
              err
            );
            toast.error("An unexpected error occured. Please try again later");
          }
        } else {
          setError("Receivable amount must be greater than $0.00");
        }
      } else {
        setError("Withdrawal amount greater than wallet balance");
      }
    } else {
      setError(
        `Please enter the amount minimum of ${currencyFormat(
          withdrawFund.fee.min_amount,
          user.currency_name
        )} and maximum of ${currencyFormat(
          withdrawFund.fee.max_amount,
          user.currency_name
        )} to withdraw from your wallet`
      );
    }
  };

  const handleVerify = async () => {
    if (confirm.otp.length === 6) {
      if (confirm.password) {
        setLoading(true);

        try {
          await withdrawOTPVerifyApi({
            password: confirm.password,
            email_otp: confirm.otp,
            sms_otp: confirm.m_otp,
          });

          handleWithdrawProcess({
            payment_method: "crypto",
            amount: amount,
            address: address,
            network: network,
            _setError: setError,
            _setLoading: setLoading,
            _setSuccess: setSuccess,
          });
        } catch (err) {
          setLoading(false);
          console.log(
            "🚀 ~ file: withdraw.js ~ line 59 ~ handleVerify ~ err",
            err
          );

          const result = err.data.data;
          let errText = "",
            are = false;
          if (!result.email_otp_verified) {
            errText += "Email OTP";
          }
          if (!result.password_verified) {
            if (errText) are = true;
            errText += `${errText && ", "}Password`;
          }
          if (!result.sms_otp_verified) {
            if (errText) are = true;
            errText += `${errText && ", "}SMS OTP`;
          }

          setError(`${errText} ${are ? "are" : "is"} invalid`);
        }
      } else {
        setError("Enter your Password");
      }
    } else {
      setError("Enter OTP received on your email");
    }
  };

  const calcCharges = (input, _network) => {
    // if (input) {
    //   if (withdrawFund.fee.fee_type === "percent") {
    //     const data =
    //       parseFloat(input) -
    //       (parseFloat(input) * parseFloat(withdrawFund.fee.fee_value)) / 100;
    //     setReceive(data);
    //   } else {
    //     setReceive(parseFloat(input) - withdrawFund.fee.fee_value);
    //   }
    // } else {
    //   setReceive(0);
    // }

    const net_input = _network ? _network : network;

    const data =
      parseFloat(input) -
      feeCharges.find((obj) => obj.network === net_input).fee;
    if (data > 0) {
      setReceive(roundDown(data, 2));
    } else {
      setReceive(0);
    }
  };

  const crispStyle = {
    control: (prop) => ({
      ...prop,
      padding: ".8rem 0.8rem",
      borderRadius: "0.7rem",
      minHeight: "33px",
      fontSize: "1rem",
      fontWeight: "bolder",
      borderColor: "#000",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#000",
      },
      "&:focus": {
        boxShadow: "none",
        borderColor: "#000",
      },
      "&:active": {
        boxShadow: "none",
        borderColor: "#000",
      },
    }),
    input: (prop) => ({
      ...prop,
      margin: 0,
      padding: 0,
    }),
    valueContainer: (prop) => ({
      ...prop,
      margin: 0,
      padding: 0,
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      margin: 0,
      padding: 0,
      ...(data.color ? dot(data.color) : {}),
    }),

    dropdownIndicator: (prop) => ({
      ...prop,
      margin: 0,
      padding: "0 3px 0 0",
      color: "#000",
    }),
    indicatorsContainer: (prop) => ({
      ...prop,
      margin: 0,
      padding: 0,
    }),
    clearIndicator: (prop) => ({
      ...prop,
      margin: 0,
      padding: 0,
    }),
    indicatorSeparator: (prop) => ({
      ...prop,
      margin: "3px",
      padding: 0,
    }),
    noOptionsMessage: (prop) => ({
      ...prop,
      padding: 0,
      fontSize: "12px",
    }),
    option: (prop, { isSelected }) => ({
      ...prop,
      padding: "8px",
      fontSize: "1rem",
      backgroundColor: isSelected && "#000",
      fontFamily: "neue_helvetica_medium",
      "&:hover": {
        backgroundColor: !isSelected && "#ddd",
        color: !isSelected && "#000",
      },
      "&:active": {
        backgroundColor: "#ddd",
      },
    }),
    menu: (prop) => ({
      ...prop,
      borderRadius: "3px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999, top: base.top - 5 }),
  };

  const networkOptions = [
    {
      label: `Binance - ${currencyFormat(
        feeCharges.find((obj) => obj.network === "binance").fee,
        user.currency_name
      )} Fee / Transaction`,
      value: "binance",
    },
    {
      label: `Matic - ${currencyFormat(
        feeCharges.find((obj) => obj.network === "matic").fee,
        user.currency_name
      )} Fee / Transaction`,
      value: "matic",
    },
    {
      label: `Ethereum - ${currencyFormat(
        feeCharges.find((obj) => obj.network === "ethereum").fee,
        user.currency_name
      )} Fee / Transaction`,
      value: "ethereum",
    },
  ];

  return (
    <>
      {success ? (
        <>
          <div className="success-card mt-4 ">
            <FiCheckCircle size={50} color={"green"} />
            <div>
              Your withdrawal request has been initiated, and it should reflect
              in your payment method in 2 to 3 working days.
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark w-100 rounded-pill btn-af-pay mt-3 mb-4"
            onClick={() => {
              setWithdrawFund({ ...withdrawFund, type: "" });
            }}
          >
            Okay
          </button>
        </>
      ) : (
        <>
          {confirm.status ? (
            <>
              <div
                className="pay-list-back"
                role="button"
                onClick={() => {
                  setConfirm(false);
                  setError("");
                }}
              >
                <FiArrowLeft size={25} /> Back
              </div>

              <div className="mt-3">
                <div className="d-flex justify-content-between ac-cc-title mb-2">
                  Summary
                </div>
                <div className="withdraw-summary">
                  <div className="row">
                    <div className="col text-end">Withdrawal Amount:</div>
                    <div className="col-3">
                      {currencyFormat(amount, user.currency_name)}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-end">Service Fee:</div>
                    <div className="col-3">
                      {currencyFormat(
                        feeCharges.find((obj) => obj.network === network).fee,
                        user.currency_name
                      )}
                      {withdrawFund.fee.fee_type === "percent" && "%"}
                    </div>
                  </div>
                  <hr />
                  <div className="row final">
                    <div className="col text-end">Amount you will receive:</div>
                    <div className="col-3">
                      {" "}
                      {currencyFormat(receive, user.currency_name)}
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mt-3">
                <div className="d-flex justify-content-between ac-cc-title mb-2">
                  Email OTP
                </div>
                <InputOTP
                  value={confirm.otp}
                  onChange={(o) => setConfirm({ ...confirm, otp: o })}
                  hideLabel
                />
              </div>

              {/* <div className="mt-3">
            <div className="d-flex justify-content-between ac-cc-title mb-2">
              SMS OTP
            </div>
            <InputOTP
              value={confirm.m_otp}
              onChange={(o) => setConfirm({  ...confirm, m_otp: o })}
              hideLabel
            />
          </div> */}

              <div className="mt-3 mb-3">
                <div className="d-flex justify-content-between ac-cc-title mb-2">
                  Password
                </div>
                <input
                  type="password"
                  value={confirm.password}
                  className="wallet-password"
                  maxLength={42}
                  onChange={(e) => {
                    setConfirm({ ...confirm, password: e.target.value });
                  }}
                />
              </div>
              {error && (
                <div className="mb-3">
                  <h6 className="text-danger mb-0">{error}</h6>
                </div>
              )}

              <button
                disabled={loading}
                type="button"
                className="btn btn-dark w-100 rounded-pill btn-af-pay"
                onClick={handleVerify}
              >
                {loading ? "Processing please wait..." : "Withdraw"}
              </button>
            </>
          ) : (
            <>
              <div
                className="pay-list-back"
                role="button"
                onClick={() => setWithdrawFund({ ...withdrawFund, type: "" })}
              >
                <FiArrowLeft size={25} /> Back
              </div>

              <div className="bg-white mt-3 p-3 current-balance">
                <div className="cb-title">Available Crypto Balance</div>
                <div>
                  <div className="cb-balance">
                    {currencyFormat(withdrawFund.balance, user.currency_name)}
                  </div>
                </div>
              </div>

              {proceed && (
                <>
                  <div className="mt-3">
                    <div className="mt-3 mb-3">
                      <div className="text-secondary mt-5 ac-step">Step 1</div>
                      <div className="d-flex justify-content-between ac-cc-title">
                        Network
                      </div>
                      <Select
                        options={networkOptions}
                        value={networkOptions.find((o) => o.value === network)}
                        styles={crispStyle}
                        onChange={(data) => {
                          setNetwork(data.value);
                          calcCharges(amount, data.value);
                        }}
                      />
                    </div>

                    <div className="text-secondary mt-3 ac-step">Step 2</div>
                    <div className="d-flex justify-content-between ac-cc-title">
                      Withdrawal Amount
                    </div>
                    <div className="sf-amt-container">
                      <div className="af-symbol">$</div>
                      <input
                        type="text"
                        value={amount}
                        className="af-amount"
                        onChange={(e) => {
                          setError("");
                          if (e.target.value && e.target.value.length < 10) {
                            if (validateCurrency(e.target.value)) {
                              setAmount(e.target.value);
                              calcCharges(e.target.value);
                            } else {
                              if (e.target.value.indexOf(".") !== -1) {
                                const str = e.target.value;
                                setAmount(str.substring(0, str.length - 1));
                                calcCharges(str.substring(0, str.length - 1));
                              } else {
                                setAmount("");
                                calcCharges("");
                              }
                            }
                          } else {
                            setAmount("");
                            calcCharges("");
                          }
                        }}
                      />
                    </div>

                    <div className="mt-3 mb-3">
                      <div className="text-secondary mt-3 ac-step">Step 3</div>
                      <div className="d-flex justify-content-between ac-cc-title">
                        Withdrawal Address
                      </div>
                      <input
                        type="text"
                        value={address}
                        className="wallet-address"
                        placeholder="0xc896..."
                        maxLength={42}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    {error && (
                      <div className="mb-3">
                        <h6 className="text-danger mb-0">{error}</h6>
                      </div>
                    )}
                    <button
                      disabled={loading}
                      type="button"
                      className="btn btn-dark w-100 rounded-pill btn-af-pay mt-2 mb-1"
                      onClick={handleSubmit}
                    >
                      {loading ? "Processing please wait..." : "Submit"}
                    </button>
                    <div className="text-center">
                      <div>
                        <label className="loaded-info">
                          {currencyFormat(
                            feeCharges.find((obj) => obj.network === network)
                              .fee,
                            user.currency_name
                          )}
                          {withdrawFund.fee.fee_type === "percent" && "%"}{" "}
                          Transaction Fee Applies | Final Amount{" "}
                          {currencyFormat(receive, user.currency_name)}
                        </label>
                      </div>
                      <label className="loaded-info">
                        Minimum Withdrawal{" "}
                        {currencyFormat(
                          withdrawFund.fee.min_amount,
                          user.currency_name
                        )}
                        <br />
                        Maximum Withdrawal: No Limit{" "}
                        {/* {currencyFormat(
                          withdrawFund.fee.max_amount,
                          user.currency_name
                        )} */}
                      </label>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className="mt-4 mb-3 p-3 rounded-3 border ">
            <p className="card-info">
              Please double-check your destination address & network. Please be
              informed that withdrawals to wrong addresses and
              wrong/non-compliant networks (including but not limited to smart
              contract addresses, ICOs and Airdrops) will result in an
              irreversible/irrecoverable loss of funds. Withdrawals cannot be
              cancelled after submission.
            </p>
          </div>

          {!proceed && (
            <button
              type="button"
              className="btn btn-dark w-100 rounded-pill btn-af-pay mb-4"
              onClick={() => {
                setProceed(true);
              }}
            >
              Proceed
            </button>
          )}
        </>
      )}
    </>
  );
};

export default CryptoDetailsWithdraw;
