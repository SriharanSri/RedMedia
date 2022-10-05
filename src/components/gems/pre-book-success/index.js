import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import WrapperSingle from "../../../components/gems/wrapper-single";

import GemsLeft from "../../../images/gems/hero-left.png";
import GemsRight from "../../../images/gems/hero-right.png";

import GemsLeftMobile from "../../../images/gems/hero-left-mobile.png";
import GemsRightMobile from "../../../images/gems/hero-right-mobile.png";

import TechPartner from "../../../images/gems/tech-part-guardian.svg";
import NGOPartner from "../../../images/gems/savethechildren.png";
import useWindowSize from "../../../hooks/useWindowSize";
import { invokeGoogleEvent } from "../../../utils/common";
import "./style.scss";
import useQuery from "../../../hooks/useQuery";

const PreBookSuccess = () => {
  const size = useWindowSize();
  const history = useHistory();
  const query = useQuery
    ();
  const type = query.get("type");


  useEffect(() => {
    invokeGoogleEvent("user_profile_share", {
      eventLabel: "",
      // price: amount,
    });
  }, []);
  return (
    <WrapperSingle>
      <section className="prebook-hero-section">
        <img
          src={size < 992 ? GemsLeftMobile : GemsLeft}
          className="image-left"
        />
        <img
          src={size < 992 ? GemsRightMobile : GemsRight}
          className="image-right"
        />
        <div className="d-flex flex-column align-items-center justify-content-center pre-book-success">
          <div className="success-msg">
            <p className="pink-msg">Congratulations!</p>
            <p>
              You have successfully <br />{" "}
              {`${type === "pre-book" ? " pre-booked " : " bought "}`} your NFT
            </p>
          </div>
        </div>
        <div className="prebooknfts">
          <button
            className="preview-btn mb-5"
            onClick={() => {

              let opts = {}
              console.log(type)
              if (type === "pre-book") {
                opts = {
                  eventName: "view_prebooked_nfts",
                  eventAction: "view prebooked nfts ",
                  eventCategory: 'prebook'
                }
              }
              else {
                opts = {
                  eventName: "view_your_nfts",
                  eventAction: "view nfts",
                  eventCategory: "drop"
                }
              }

              invokeGoogleEvent(opts.eventName, opts)
              history.push("/accounts/profile")
            }
            }
          >
            VIEW YOUR {`${type === "pre-book" ? " PRE-BOOKED " : " "}`} NFTs
          </button>
          {type === "pre-book" ?
            <button
              className="preview-btn mb-5"
              onClick={() => {
                invokeGoogleEvent("prebook_another", {
                  eventName: "",
                  eventAction: 'prebook another',
                  eventLabel: 'click',
                }

                )
                history.push("/pre-book")
              }}
            >
              PRE-BOOK ANOTHER NFT
            </button> : <button
              className="preview-btn mb-5"
              onClick={() => {
                invokeGoogleEvent("buy_another", {
                  eventAction: 'buy another',
                  eventLabel: 'click',
                }

                )
                history.push("/drop")
              }}
            >
              BUY ANOTHER NFT</button>}
        </div>
        <div className="prebook-btn-block">
          <a
            href="https://www.guardianlink.io/"
            target="_blank"
            onClick={() => {
              invokeGoogleEvent("parner_link_click", {
                eventAction: "tech partner",
              });
            }}
          >
            Technology Partner{" "}
            <span className="img-box">
              <img src={TechPartner} />
            </span>
          </a>
          <a
            href="https://www.savethechildren.in/"
            target="_blank"
            onClick={() => {
              invokeGoogleEvent("parner_link_click", {
                eventAction: "ngo partner",
              });
            }}
          >
            NGO Partner{" "}
            <span className="img-box">
              <img src={NGOPartner} />
            </span>
          </a>
        </div>
      </section>
    </WrapperSingle >
  );
};

export default PreBookSuccess;
