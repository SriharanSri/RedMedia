import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";

import usdt from "../../images/usdt.svg";
import stripe from "../../images/stripe.svg";
import upi from "../../images/upi.svg";
import ramp from "../../images/ramp.svg";
import cashfree from "../../images/cashfree.svg";
import fracto from "../../images/fracto.svg";
// import ach from "../../images/bank-transfer.svg";

import "./style.scss";

const PaymentMethodList = ({ handleSelectedPay }) => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <>
      <PayCard
        method={"crypto"}
        title={"Pay with Crypto (USDT)"}
        desc={
          "Preferred Currency - USDT | 24*7 Available | No Limits In Transaction Amount"
        }
        image={usdt}
        onClick={handleSelectedPay}
      />
      <PayCard
        method={"fracto_crypto"}
        title={"Pay with Crypto"}
        desc={
          "Support Popular Cryptocurrencies | 24*7 Available | No Limits In Transaction Amount"
        }
        image={fracto}
        onClick={handleSelectedPay}
      />
      {/* <PayCard
        method={"ramp"}
        title={"Pay with RAMP"}
        desc={
          "24*7 Available | No Limits* In Transaction Amount | Safe and Secure"
        }
        image={ramp}
        onClick={handleSelectedPay}
      /> */}
      <PayCard
        method={"fracto"}
        title={"Pay with Credit Card"}
        desc={
          "24*7 Available | Limits* In Transaction Amount | Safe and Secure"
        }
        image={fracto}
        onClick={user.kyc_status !== "success" ? () => {} : handleSelectedPay}
        // onClick={handleSelectedPay}
        kyc={user.kyc_status !== "success"}
      />
      <PayCard
        method={"ach"}
        title={"Pay with ACH Transfer"}
        desc={
          "24*7 Available | Limits* In Transaction Amount | Safe and Secure"
        }
        image={fracto}
        onClick={handleSelectedPay}
      />
      {/* <PayCard
        method={"stripe"}
        title={"Pay with Stripe"}
        desc={"24*7 Available | Limits* In Transaction Subject To Bank Rules"}
        image={stripe}
        onClick={handleSelectedPay}
      /> */}
      <PayCard
        method={"cashfree"}
        title={"Pay with UPI/Card/NetBanking"}
        desc={"24*7 Available | Limits* In Transaction Subject To Bank Rules"}
        image={cashfree}
        onClick={handleSelectedPay}
      />
      <PayCard
        method={"ippo"}
        title={"Pay with UPI"}
        desc={"24*7 Available | Limits* In Transaction Subject To Bank Rules"}
        image={upi}
        onClick={handleSelectedPay}
      />
    </>
  );
};

export default PaymentMethodList;

const PayCard = ({
  method,
  title,
  desc,
  image,
  success,
  onClick,
  disabled = false,
  kyc = false,
}) => {
  return (
    <div
      className={`pay-list-container ${kyc && "fade-light"}`}
      style={disabled ? { backgroundColor: "#f2f2f2" } : {}}
      role="button"
      onClick={() => !disabled && onClick(method)}
    >
      <div className="icon-block">
        <img src={image} alt={title} />
      </div>
      <div className="first">
        <div className="pay-list-title">{title}</div>
        <div className="pay-list-desc">{desc}</div>
        {kyc && (
          <small className="text-danger kyc-text">
            Complete your KYC to proceed
          </small>
        )}
      </div>
      {!kyc && (
        <div style={{ width: "50px", textAlign: "right" }}>
          {!disabled ? <FiArrowRight size={30} /> : "Coming soon"}
        </div>
      )}
    </div>
  );
};
