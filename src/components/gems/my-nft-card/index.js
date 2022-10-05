import React, { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { toast } from "react-toastify";
import { currencyFormat,invokeGoogleEvent } from "../../../utils/common";
import GemsDropAnimation from "../../../images/gems/gems_drop_animation.gif";
import GoldExplosion from "../../../images/gems/gold_explosion.gif";
import placeholderNft from "../../../images/gems/artwork/My-Backyard.jpg";
import "./style.scss";
import { useDispatch } from "react-redux";
import { claim_loot } from "../../../redux/actions/drop_action";
// import { useHistory } from "react-router-dom";

const MyNftCard = (props) => {
  const { isClaimed = false } = props;
  const [showClaimModel, setShowClaimModel] = useState(false);
  const [displayNft, setDisplayNft] = useState(false);
  const [shakeNft, setShakeNft] = useState(false);
  const dispatch = useDispatch();
  // const history = useHistory();

  const copyToClipboard = (uinNo) => {
    navigator.clipboard.writeText(uinNo);
    toast.success(`UIN copied to your clipboard`);
  };

  const handleModalOpen = () => {
    console.log(props)
    invokeGoogleEvent("reveal_nft", { 
      eventLabel:props?.name,
      artistName:props?.artist_name,
    });
    console.log(props?.artist_name)
    setShowClaimModel(true);
    setTimeout(() => setDisplayNft(true), 4300);
    setTimeout(() => setShakeNft(true), 6500);
  };
  const handleModalClose = () => {
    setShowClaimModel(false);
    dispatch(claim_loot({ ...props }));
  };

  const renderTooltip = (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          UIN can be used for searching an NFT that you want to pre-book in the
          Pre-Booking window.
        </p>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <article className="my-nft gems-nft-cart">
        <div className="gems-nft-img-block">
          {!isClaimed ? (
            <img
              src={GemsDropAnimation}
              alt="gems-drop-animation"
              className={`gems-nft-img drop-bg`}
            />
          ) : (
            props?.image_url && (
              <img
                src={placeholderNft}
                alt="nft-img"
                className="gems-nft-img"
                // onClick={() =>
                //   props?.slug && history.push(`/art/${props?.slug}`)
                // }
              />
            )
          )}
        </div>

        <div className="gems-nft-content-block">
          {isClaimed && (
            <div className="uin-band">
              <>
                <h5 className="key">
                  UIN{" "}
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 250 }}
                    overlay={renderTooltip}
                  >
                    <span>
                      {" "}
                      <BsQuestionCircle />
                    </span>
                  </OverlayTrigger>
                </h5>
                <h5
                  className="value"
                  onClick={() => copyToClipboard(props?.uin)}
                >
                  {props?.uin}
                </h5>{" "}
              </>
            </div>
          )}
          {!isClaimed ? (
            <div className="reveal">
              <button className="buy-btn" onClick={handleModalOpen}>
                Reveal
              </button>
            </div>
          ) : (
            <>
              <h4 className="nft-name">{props?.name}</h4>
              <ul className="nft-add-info">
                {props?.artist_name && (
                  <li>
                    <h5 className="key">Artist Name</h5>
                    <h5 className="value">{props?.artist_name}</h5>
                  </li>
                )}
                {props?.artist_age && (
                  <li>
                    <h5 className="key">Age</h5>
                    <h5 className="value">{props?.artist_age}</h5>
                  </li>
                )}
                {props?.total_amount && (
                  <li>
                    <h5 className="key">Price</h5>
                    <h5 className="value">
                      {currencyFormat(props?.total_amount)}
                    </h5>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
        {showClaimModel && (
          <Modal
            show={showClaimModel}
            onHide={handleModalClose}
            className={"claim-revel-modal"}
            fullscreen
          >
            <Modal.Header closeButton />
            <Modal.Body className="claim-container">
              {/* <img
                src={GoldExplosion}
                className="gold-explosion"
                onEnded={() => console.log("Ended")}
              ></img> */}
              <img
                className={`nft ${displayNft && "openNft"} ${
                  shakeNft && "shakeNft"
                } `}
                src={placeholderNft}
              />
            </Modal.Body>
          </Modal>
        )}
      </article>
    </>
  );
};

export default MyNftCard;
