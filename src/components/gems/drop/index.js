import DropPg from "../drop-pg";
import WrapperSingle from "../../../components/gems/wrapper-single";
import useWindowSize from "../../../hooks/useWindowSize";
import { currencyFormat, invokeGoogleEvent } from "../../../utils/common";

import GemsLeft from "../../../images/gems/hero-left.png";
import GemsRight from "../../../images/gems/hero-right.png";
import GemsLeftMobile from "../../../images/gems/hero-left-mobile.png";
import GemsRightMobile from "../../../images/gems/hero-right-mobile.png";
import TechPartner from "../../../images/gems/tech-part-guardian.svg";
import NGOPartner from "../../../images/gems/savethechildren.png";

import "./style.scss";

const Drop = () => {
  const size = useWindowSize();

  return (
    <>
      <WrapperSingle>
        <section className="drop-section">
          <img
            src={size < 992 ? GemsLeftMobile : GemsLeft}
            className="image-left"
          />
          <img
            src={size < 992 ? GemsRightMobile : GemsRight}
            className="image-right"
          />

          {/* <div className="drop-container">
            <div className="drop-box-image">
              <img src={GemsDropAnimation} alt="loot image"></img>
              <button className="buy-btn" onClick={handlePayment}>
                Buy Now
              </button>
            </div>
            <div className="drop-box-content">
              <div className="loot-badge">
                <img src={GemsLogo} alt="loot image"></img>
                <p>Loot Box</p>
              </div>
              <p>
                Consequat non velit velit commodo anim laboris cillum. Anim est
                magna ut nulla non et nisi cupidatat pariatur esse cillum quis
                eu. Adipisicing ipsum aliqua ipsum voluptate exercitation ea.
                Sit id consectetur irure ad incididunt ipsum sit dolore ea
                aliqua amet ullamco qui.
              </p>
              <div className="info-badge">
                <p>
                  Drop starts on {` `}
                  <span> 20.07.2022</span>
                </p>
              </div>
              <div className="d-flex gap-3 counter-box">
                <div className="d-flex flex-column pill-box">
                  <div className="d-flex value-label">
                    <p className="key-label">Quantity</p>
                    <span
                      className="add-btn"
                      onClick={() =>
                        setQuantity(quantity - 1 <= 1 ? 1 : quantity - 1)
                      }
                    >
                      -
                    </span>
                    <p>{quantity}</p>
                    <span
                      className="add-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
              <div className="price-badge">
                <p>
                  Price {` `}
                  <span>{currencyFormat(amount * quantity, "inr")}</span>
                </p>
              </div>
            </div>
          </div> */}
          <div className="drop-box-scroll">
            {/* <DropPg premium /> */}
            <DropPg />
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
      </WrapperSingle>
    </>
  );
};

export default Drop;
