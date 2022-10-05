import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";

import usdt from "../../images/usdt.svg";
import stripe from "../../images/stripe.svg";
import fracto from "../../images/fracto.svg";
import upi from "../../images/upi.svg";
import cashfree from "../../images/cashfree.svg";
import trade from "../../images/trade.svg";
import { currencyFormat } from "./../../utils/common";

import "./style.scss";

const PaymentMethodListWithdraw = ({ balanceInfo, handleSelectedPay }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <PayCardWith
        method={"crypto"}
        title={"Crypto (USDT)"}
        balance={balanceInfo?.balance?.crypto}
        fee={balanceInfo?.fees.find((obj) => obj.category === "crypto")}
        desc="Available Balance"
        image={usdt}
        onClick={handleSelectedPay}
      />
      <PayCardWith
        method={"fracto_crypto"}
        title={"Fracto Crypto"}
        balance={balanceInfo?.balance?.fracto_crypto}
        fee={balanceInfo?.fees.find((obj) => obj.category === "fracto_crypto")}
        desc="Available Balance"
        image={fracto}
        onClick={handleSelectedPay}
      />
      <PayCardWith
        method={"stripe"}
        title={"Stripe"}
        balance={balanceInfo?.balance?.stripe}
        desc="Available Balance"
        image={stripe}
        fee={balanceInfo?.fees.find((obj) => obj.category === "stripe")}
        onClick={handleSelectedPay}
      />{" "}
      <PayCardWith
        method={"fracto_card"}
        title={"Fracto Card"}
        balance={balanceInfo?.balance?.fracto_card}
        desc="Available Balance"
        image={fracto}
        fee={balanceInfo?.fees.find((obj) => obj.category === "fracto_card")}
        onClick={handleSelectedPay}
      />
      <PayCardWith
        method={"fracto_ach"}
        title={"Fracto ACH"}
        balance={balanceInfo?.balance?.fracto_ach}
        desc="Available Balance"
        image={fracto}
        fee={balanceInfo?.fees.find((obj) => obj.category === "fracto_ach")}
        onClick={handleSelectedPay}
      />
      <PayCardWith
        method={"cashfree"}
        title={"UPI/Card/NetBanking"}
        balance={balanceInfo?.balance?.cashfree}
        desc="Available Balance"
        image={cashfree}
        fee={balanceInfo?.fees.find((obj) => obj.category === "cashfree")}
        onClick={handleSelectedPay}
      />
      <PayCardWith
        method={"ippo"}
        title={"UPI"}
        balance={balanceInfo?.balance?.ippopay}
        desc="Available Balance"
        image={upi}
        fee={balanceInfo?.fees.find((obj) => obj.category === "ippopay")}
        onClick={handleSelectedPay}
      />
      {/*
      <PayCardWith
        method={"trade"}
        title={"Trade"}
        balance={balanceInfo?.balance?.trade}
        desc="Available Balance"
        image={trade}
        fee={balanceInfo?.fees}
        onClick={handleSelectedPay}
      /> */}
    </>
  );
};

export default PaymentMethodListWithdraw;

const PayCardWith = ({
  method,
  title,
  fee,
  desc,
  image,
  balance,
  onClick,
  disabled = false,
}) => {
  const { user } = useSelector((state) => state.user.data);

  return (
    <div
      className="pay-list-container"
      role="button"
      style={disabled ? { backgroundColor: "#f2f2f2" } : {}}
      onClick={() => {
        !disabled &&
          balance !== null &&
          balance !== undefined &&
          onClick(method, balance, fee);
      }}
    >
      <div className="icon-block">
        <img src={image} alt={title} />
      </div>
      <div className="first">
        <div className="pay-list-title">{title}</div>
        <div className="pay-list-desc">{desc}</div>
        <div className="pay-list-balance">
          {balance !== null && balance !== undefined
            ? currencyFormat(balance, user.currency_name)
            : "Fetching balance..."}
        </div>
      </div>
      <div style={{ width: "70px", textAlign: "right" }}>
        {!disabled ? <FiArrowRight size={30} /> : "Currently Disabled"}
      </div>
    </div>
  );
};
