import React, { useEffect } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import WrapperSingle from "../wrapper-single";
import HeroLogo from "../../../images/gems/hero-pg-logo.svg";
import GemsLeft from "../../../images/gems/hero-left.png";
import GemsRight from "../../../images/gems/hero-right.png";

import GemsLeftMobile from "../../../images/gems/hero-left-mobile.png";
import GemsRightMobile from "../../../images/gems/hero-right-mobile.png";

import TechPartner from "../../../images/gems/tech-part-guardian.svg";
import NGOPartner from "../../../images/gems/savethechildren.png";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import {
  googleEventDefaultOptions,
  gtag_event_types,
  invokeGoogleEvent,
} from "../../../utils/common";
import useWindowSize from "../../../hooks/useWindowSize";

import webSlider001 from "../../../images/gems/hero-slider/Pre-book-buy-carousel1.jpg";
import webSlider002 from "../../../images/gems/hero-slider/Pre-book-buy-carousel2.jpg";
import webSlider003 from "../../../images/gems/hero-slider/Pre-book-buy-carousel3.jpg";
import webSlider004 from "../../../images/gems/hero-slider/Pre-book-buy-carousel4.jpg";
import webSlider005 from "../../../images/gems/hero-slider/Pre-book-buy-carousel5.jpg";
import webSlider006 from "../../../images/gems/hero-slider/Pre-book-buy-carousel6.jpg";

import mobileSlide001 from "../../../images/gems/hero-slider/Carousel-13.jpg";
import mobileSlide002 from "../../../images/gems/hero-slider/Carousel-14.jpg";
import mobileSlide003 from "../../../images/gems/hero-slider/Carousel-15.jpg";
import mobileSlide004 from "../../../images/gems/hero-slider/Carousel-16.jpg";
import mobileSlide005 from "../../../images/gems/hero-slider/Carousel-17.jpg";
import mobileSlide006 from "../../../images/gems/hero-slider/Carousel-18.jpg";
import { fire_gtag_event } from "../../../redux/actions/gtag_action";
import useQuery from "../../../hooks/useQuery";
import { capture_user_origin_source } from "../../../redux/actions/user_action";

const HomePage = () => {
  const { user } = useSelector((state) => state);
  const size = useWindowSize();
  const dispatch = useDispatch();
  const query = useQuery();

  useEffect(() => {
    let sources = {
      utm_source: query.get("utm_source"),
      utm_medium: query.get("utm_medium"),
    };
    dispatch(capture_user_origin_source(sources));
  }, []);

  const handleCarousalNavigationClick = ({ target }) => {
    let eventLabel = "right";
    if (
      target?.className.includes("owl-prev") ||
      target?.ariaLabel === "Previous"
    )
      eventLabel = "left";
    invokeGoogleEvent("banner_swipe", { eventLabel });
  };

  return (
    <>
      <WrapperSingle>
        <section className="home-hero-section">
          <img
            src={size < 992 ? GemsLeftMobile : GemsLeft}
            className="image-left"
          />
          <img
            src={size < 992 ? GemsRightMobile : GemsRight}
            className="image-right"
          />
          {size < 768 ? (
            <OwlCarousel
              className="owl-theme carousel-block"
              items={1}
              nav={true}
              dots
              loop
              playsInline={true}
              autoplay={true}
              autoplaySpeed={1000}
              autoplayTimeout={3000}
              autoplayHoverPause={true}
              onClick={handleCarousalNavigationClick}
            >
              <img src={HeroLogo} className="hero-logo" />
              <img src={mobileSlide001} className="hero-logo" />
              <img src={mobileSlide002} className="hero-logo" />
              <img src={mobileSlide003} className="hero-logo" />
              <img src={mobileSlide004} className="hero-logo" />
              <img src={mobileSlide005} className="hero-logo" />
              <img src={mobileSlide006} className="hero-logo" />
            </OwlCarousel>
          ) : (
            <OwlCarousel
              className="owl-theme carousel-block"
              items={1}
              nav={true}
              dots
              loop
              playsInline={true}
              autoplay={true}
              autoplaySpeed={1000}
              autoplayTimeout={3000}
              autoplayHoverPause={true}
              onClick={handleCarousalNavigationClick}
            >
              <img src={HeroLogo} className="hero-logo" />
              <img src={webSlider001} className="hero-logo" />
              <img src={webSlider002} className="hero-logo" />
              <img src={webSlider003} className="hero-logo" />
              <img src={webSlider004} className="hero-logo" />
              <img src={webSlider005} className="hero-logo" />
              <img src={webSlider006} className="hero-logo" />
              
            </OwlCarousel>
          )}

          {size < 992 ? (
            <div className="gems-btn-block">
              {user?.login ? (
                <>
                  {/* <Nav.Link
                    href={`/upload-your-artwork`}
                    target="_self"
                    className="pink-btn"
                    onClick={() =>
                      invokeGoogleEvent("upload_art_click", {
                        eventLabel: "logged in",
                      })
                    }
                  >
                    Upload Your Art
                  </Nav.Link> */}
                </>
              ) : (
                <>
                  {/* <Nav.Link
                    href={`/upload-your-artwork`}
                    target="_self"
                    className="pink-btn"
                    onClick={() =>
                      invokeGoogleEvent("upload_art_click", {
                        eventLabel: "non logged in",
                      })
                    }
                  >
                    Upload Your Art
                  </Nav.Link> */}
                  <Nav.Link
                    href={`/signup`}
                    target="_self"
                    className="blue-btn"
                    onClick={() => invokeGoogleEvent("signup_click")}
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
          <p>
            Let your child create a piece of art with Cadbury Gems and become an
            NFT creator.
            <br /> What's more - Every NFT sold helps sponsor an
            under-privileged child's education.
          </p>
          <div className="hero-btn-block">
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

export default HomePage;
