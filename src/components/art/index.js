import React, { useEffect } from "react";
import "./style.scss";
import { detectWhatsapp, invokeGoogleEvent } from "../../utils/common";

const Art = ({ art }) => {
  const shareUrl = `${process.env.REACT_APP_WEBSITE_URL}/art/${art?.slug}`;
  return (
    <>
      <article className="nft-detail-section">
        <div className="image-block">
          <img src={art?.image_url} alt={art?.name}></img>
        </div>
        <div className="info-block">
          <div className="nft-info-box">
            <h2>{art?.name}</h2>
            <ul className="nft-info-flex">
              <li>
                <span className="key">Artist name</span>
                <span className="value">{art?.artist_name}</span>
              </li>
              <li>
                <span className="key">Age</span>
                <span className="value">{art?.artist_age}</span>
              </li>
            </ul>
          </div>
          <div className="share-box">
            <h5>share this on social media</h5>
            <ul className="popup-share-links">
              <li>
                <a
                  className="fb"
                  target="_blank"
                  // onClick={() =>
                  //   window.open(
                  //     `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}}%26quote=${encodeURIComponent(
                  //       "My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in"
                  //     )}`
                  //   )
                  // }
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
        </div>
      </article>
    </>
  );
};

export default Art;
