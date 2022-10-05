import React from "react";
import PreBook from "../pre-book";
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

const PreBookPg = () => {
  const size = useWindowSize();
  return (
    <>
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

          <PreBook />

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
      </WrapperSingle>
    </>
  );
};

export default PreBookPg;
