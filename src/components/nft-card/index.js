import React from "react";
import { useSelector } from "react-redux";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  currencyFormat,
  openWindowBlank,
  calculateTimeLeft,
} from "../../utils/common";
import postOne from "../../images/post1.png";

import batsmanIcon from "../../images/jump-trade/batsman_ico.png";
import bowlerIcon from "../../images/jump-trade/bowler_ico.png";

import lvl001 from "../../images/jump-trade/player_levels/1.png";
import lvl002 from "../../images/jump-trade/player_levels/2.png";
import lvl003 from "../../images/jump-trade/player_levels/3.png";
import lvl004 from "../../images/jump-trade/player_levels/4.png";
import lvl005 from "../../images/jump-trade/player_levels/5.png";
import lvl006 from "../../images/jump-trade/player_levels/6.png";
import lvl007 from "../../images/jump-trade/player_levels/7.png";
import lvl008 from "../../images/jump-trade/player_levels/8.png";
import lvl009 from "../../images/jump-trade/player_levels/9.png";
import lvl0010 from "../../images/jump-trade/player_levels/10.png";
import lvl0011 from "../../images/jump-trade/player_levels/11.png";
import lvl0012 from "../../images/jump-trade/player_levels/12.png";
import lvl0013 from "../../images/jump-trade/player_levels/13.png";
import lvl0014 from "../../images/jump-trade/player_levels/14.png";
import lvl0015 from "../../images/jump-trade/player_levels/15.png";

import "./style.scss";

const NFTCard = ({
  nft,
  data,
  putOnSale = false,
  isLive = false,
  marketplace = false,
  onsale = false,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const { days, hours, minutes, seconds } = calculateTimeLeft(nft.launch_time);

  var rem_text = "";

  if (days > 0) {
    rem_text += days + "d ";
  }
  if (hours > 0) {
    rem_text += hours + "h ";
  }
  if (minutes > 0) {
    rem_text += minutes + "m ";
  }

  const popover = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          Your NFT will be available to be listed for sale in <b>{rem_text}</b>
        </p>
      </Popover.Body>
    </Popover>
  );

  const kycPopOver = () => (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          Please complete your KYC process to be eligible for listing NFTs for
          sale.
        </p>
      </Popover.Body>
    </Popover>
  );

  const level = [
    {
      type: "1",
      name: "LVL 1",
      value: lvl001,
    },
    {
      type: "2",
      name: "LVL 2",
      value: lvl002,
    },
    {
      type: "3",
      name: "LVL 3",
      value: lvl003,
    },
    {
      type: "4",
      name: "LVL 4",
      value: lvl004,
    },
    {
      type: "5",
      name: "LVL 5",
      value: lvl005,
    },
    {
      type: "6",
      name: "LVL 6",
      value: lvl006,
    },
    {
      type: "7",
      name: "LVL 7",
      value: lvl007,
    },
    {
      type: "8",
      name: "LVL 8",
      value: lvl008,
    },
    {
      type: "9",
      name: "LVL 9",
      value: lvl009,
    },
    {
      type: "10",
      name: "LVL 10",
      value: lvl0010,
    },
    {
      type: "11",
      name: "LVL 11",
      value: lvl0011,
    },
    {
      type: "12",
      name: "LVL 12",
      value: lvl0012,
    },
    {
      type: "13",
      name: "LVL 13",
      value: lvl0013,
    },
    {
      type: "14",
      name: "LVL 14",
      value: lvl0014,
    },
    {
      type: "15",
      name: "LVL 15",
      value: lvl0015,
    },
  ];

  const role = [
    {
      type: "Batsman",
      name: "BATSMAN",
      value: batsmanIcon,
    },
    {
      type: "Bowler",
      name: "BOWLER",
      value: bowlerIcon,
    },
    {
      type: "Bat",
      name: "BAT",
      value: batsmanIcon,
    },
  ];

  const playerCategory = [
    {
      type: "ROOKIE",
      value: "RO",
      color: "#3b56ff",
    },
    {
      type: "RARE",
      value: "RA",
      color: "#f58220",
    },
    {
      type: "EPIC",
      value: "EP",
      color: "#9e6cef",
    },
    {
      type: "LEGEND",
      value: "LG",
      color: "linear-gradient(202deg, #e2ff00, #18e0e0, #e8318d)",
    },
    {
      type: "SUPER RARE",
      value: "SR",
      color: "#803cef",
    },
    {
      type: "ULTRA RARE",
      value: "UR",
      color: "#803cef",
    },
    {
      type: "IMMORTAL",
      value: "IM",
      color: "#803cef",
    },
  ];

  const levelData = level.find(
    (obj) => obj.type === nft?.core_statistics?.level
  );
  const roleData = role.find((obj) => obj.type === nft?.core_statistics?.role);
  const playerCatData = playerCategory.find(
    (obj) => obj.type === nft?.core_statistics?.category
  );

  return (
    <div className="col-xl-4 col-lg-4 col-sm-6">
      <div className="mynft-card-box">
        <div className="block-box user-post jt-card">
          <div className="item-post">
            <span className="nft-type-badge">{nft.nft_type.toUpperCase()}</span>
            <article className={`player_stats `}>
              {roleData && (
                <div className="player-type">
                  <img src={roleData?.value} />
                </div>
              )}

              {playerCatData && (
                <div
                  className="player-range"
                  style={{
                    borderBottom: levelData ? "0.1rem solid #fff" : "none",
                  }}
                >
                  <span
                    className="band"
                    style={{
                      background: playerCatData?.color
                        ? playerCatData?.color
                        : "",
                    }}
                  >
                    {playerCatData?.value}
                  </span>
                </div>
              )}

              {levelData && (
                <div className="player-level">
                  <h6>{levelData?.name}</h6>
                  <img src={levelData?.value} />
                </div>
              )}
            </article>
            <img
              src={
                nft?.asset_url
                  ? nft?.asset_url
                  : nft?.image_url
                  ? nft?.image_url
                  : postOne
              }
              width="100%"
              alt="nft logo"
              role="button"
              onClick={() => {
                if (putOnSale) {
                  openWindowBlank(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/details/${nft.slug}`
                  );
                } else {
                  if (onsale) {
                    openWindowBlank(
                      `${process.env.REACT_APP_MARKETPLACE_URL}/order/details/${nft.slug}/${nft?.order_slug}`
                    );
                  } else if (marketplace) {
                    openWindowBlank(
                      `${process.env.REACT_APP_MARKETPLACE_URL}/details/${nft.slug}`
                    );
                  } else if (nft?.is_loot) {
                    openWindowBlank(
                      `${
                        nft.celebrity_url
                          ? nft.celebrity_url
                          : data.celebrity_url
                      }/loot/nft/detail/${nft.slug}`
                    );
                  } else if (nft?.child) {
                    openWindowBlank(
                      `${
                        nft.celebrity_url
                          ? nft.celebrity_url
                          : data.celebrity_url
                      }/details/child/nft/${nft.slug}`
                    );
                  } else {
                    openWindowBlank(
                      `${
                        nft.celebrity_url
                          ? nft.celebrity_url
                          : data.celebrity_url
                      }/details/${nft.slug}`
                    );
                  }
                }
              }}
            />
          </div>
          <div className="item-content">
            <p className="mt-2">
              {/* {nft.category_name} */}
              {/* {nft?.core_statistics?.role && nft?.core_statistics?.role === "Bat"
            ? "Meta Cricket League Signed Bat"
            : nft?.core_statistics?.role && nft?.core_statistics?.role !== "Bat"
            ? "Meta Cricket League Player"
            : " Meta Cricket League Collection"} */}
              {/* |{" "}
          {nft.celebrity_name ? nft.celebrity_name : data.celebrity_name} */}
            </p>
            <h6 className="post-title">{nft.name}</h6>
            {/* <p className="post-description">{nft?.core_statistics?.category}</p> */}
            <div className="post-cost pw_we  d-flex  justify-content-between">
              <div className="left-bids">
                {/* <div className="post-sold-text">Price</div>
            <div className="post-sold-cost">
              {currencyFormat(nft.price, user.currency_name)}
            </div> */}
              </div>
              <div className="right-bid">
                {nft.quantity && (
                  <>
                    <div className="post-sold-text end">You Own</div>
                    <div className="post-sold-cost end">{nft.quantity}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {putOnSale && (
          <>
            {user?.kyc_status !== "success" ? (
              <OverlayTrigger
                trigger={["click"]}
                rootClose={true}
                placement="top"
                overlay={kycPopOver()}
              >
                <button
                  type="button"
                  className={`btn ${
                    !nft.is_on_sale ? "btn-dark" : "btn-outline-dark"
                  } w-100 rounded-pill btn-af-pay mt-4 mb-4`}
                >
                  List for sale
                </button>
              </OverlayTrigger>
            ) : days === 0 && hours === 0 && minutes === 0 && seconds < 0.2 ? (
              <button
                type="button"
                className={`btn ${
                  !nft.is_on_sale ? "btn-dark" : "btn-outline-dark"
                } w-100 rounded-pill btn-af-pay mt-4 mb-4`}
                onClick={() => {
                  openWindowBlank(
                    `${process.env.REACT_APP_MARKETPLACE_URL}/details/${nft.slug}`
                  );
                }}
              >
                {!nft.is_on_sale ? "List for sale" : "Listed on sale"}
              </button>
            ) : (
              <OverlayTrigger
                trigger={["click"]}
                rootClose={true}
                placement="top"
                overlay={popover()}
              >
                <button
                  type="button"
                  className={`btn ${
                    !nft.is_on_sale ? "btn-dark" : "btn-outline-dark"
                  } w-100 rounded-pill btn-af-pay mt-4 mb-4`}
                >
                  List for sale
                </button>
              </OverlayTrigger>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NFTCard;
