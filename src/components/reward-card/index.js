import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { toast } from "react-toastify";
import { currencyFormat } from "../../utils/common";
import { moveRedeem } from "../../api/methods";
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

const RewardCard = ({ reward }) => {
  const [loading, setLoading] = useState(false);
  const handleRedeem = async () => {
    try {
      setLoading(true);
      await moveRedeem(reward?.slug);
      setLoading(false);
      toast.success("Reward claimed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <article className="item-box">
        <div className="content-block">
          <div className="progress-block">
            <CircularProgressbar
              value={reward?.achieved}
              maxValue={reward?.target}
              text={
                reward?.achieved >= reward?.target
                  ? ""
                  : `${reward?.achieved}/${reward?.target}`
              }
              styles={buildStyles({
                textColor: "black",
                pathColor: "black",
              })}
            />
            {reward?.achieved >= reward?.target && (
              <span className="tickmark"></span>
            )}
          </div>
          <div className="content-box">
            <h5>{reward?.code}</h5>
            <p>{reward?.description}</p>
          </div>
        </div>
        <div className="btn-block">
          <button
            className="filled-btn"
            disabled={reward?.is_redeemed || reward?.achieved < reward?.target}
            onClick={handleRedeem}
          >
            {reward?.is_redeemed ? "Claimed" : loading ? "Loading..." : "Claim"}{" "}
            {currencyFormat(reward?.balance, "USD")}
          </button>
        </div>
      </article>
    </>
  );
};

export default RewardCard;
