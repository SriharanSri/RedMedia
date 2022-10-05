import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  currencyFormat,
  detectWhatsapp,
  invokeGoogleEvent,
} from "../../../utils/common";
import GemsDropAnimation from "../../../images/gems/gems_drop_animation.gif";
import "./style.scss";

const PreBookedNftCard = (props) => {
  const shareUrl = `${process.env.REACT_APP_WEBSITE_URL}/art/${props?.slug}`;
  const copyToClipboard = (uinNo) => {
    navigator.clipboard.writeText(uinNo);
    toast.success(`UIN copied to your clipboard`);
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
      <article className="pre-booked-nft gems-nft-cart">
        <div className="gems-nft-img-block">
          {props?.uin && (
            <div className="share-box">
              <h5>share this on social media</h5>
              <ul className="popup-share-links">
                <li>
                  <a
                    className="fb"
                    target="_blank"
                    onClick={() => {
                      invokeGoogleEvent("user_profile_share", {
                        eventLabel: "facebook",
                      });
                      window.open(
                        `https://www.facebook.com/dialog/feed?app_id=${process.env.REACT_APP_FACEBOOK_CLIENT_ID}&display=page&caption=My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in&link=${shareUrl}&redirect_uri=${process.env.REACT_APP_WEBSITE_URL}`
                      );
                    }}
                  ></a>
                </li>
                <li>
                  <a
                    className="twitter"
                    target="_blank"
                    onClick={() => {
                      invokeGoogleEvent("user_profile_share", {
                        eventLabel: "twitter",
                      });
                      window.open(
                        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                          `My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in\n`
                        )}`
                      );
                    }}
                  ></a>
                </li>
                <li>
                  <a
                    className="whatsapp"
                    target="_blank"
                    onClick={() => {
                      detectWhatsapp(
                        `whatsapp://send?text=My child just created an NFT with Cadbury Gems Junior NFT!%0A${shareUrl}%0AThe sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in`
                      ).then((hasWhatsapp) => {
                        if (!hasWhatsapp) {
                          alert(
                            "You don't have WhatsApp, kindly install it and try again"
                          );
                        } else
                          invokeGoogleEvent("user_profile_share", {
                            eventLabel: "whatsapp",
                          });
                      });
                    }}
                  ></a>
                </li>
              </ul>
            </div>
          )}
          {!props?.uin ? (
            <img
              src={GemsDropAnimation}
              alt="gems-drop-animation"
              className={`gems-nft-img ${!props?.uin ? "drop-bg" : ""}`.trim()}
            />
          ) : (
            props?.artwork?.image_url && (
              <img
                src={props?.artwork?.image_url}
                alt="nft-img"
                className="gems-nft-img"
              />
            )
          )}
        </div>

        <div className="gems-nft-content-block">
          <div className="uin-band">
            {!props.uin ? (
              <h5 className="pb-key text-center w-100">Pre-booked NFT</h5>
            ) : (
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
            )}
          </div>
          <h4 className="nft-name">{props?.name}</h4>
          <ul className="nft-add-info">
            {!props?.uin && (
              <li>
                <h5 className="key">Quantity</h5>
                <h5 className="value">{props?.quantity}</h5>
              </li>
            )}
            {props?.artwork?.artist_name && (
              <li>
                <h5 className="key">Artist Name</h5>
                <h5 className="value">{props?.artwork?.artist_name}</h5>
              </li>
            )}
            {props?.artwork?.artist_age && (
              <li>
                <h5 className="key">Age</h5>
                <h5 className="value">{props?.artwork?.artist_age}</h5>
              </li>
            )}
            {props?.total_amount && (
              <li>
                <h5 className="key">Price</h5>
                <h5 className="value">{currencyFormat(props?.net_total, 'USD')}</h5>
              </li>
            )}
          </ul>
        </div>
      </article>
    </>
  );
};

export default PreBookedNftCard;
