import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaRegTimesCircle } from "react-icons/fa";

import FooterLogo from "../../../images/gems/footer-logo.svg";
import MondelezLogo from "../../../images/gems/mondelez.svg";
import { invokeGoogleEvent } from "../../../utils/common";
import "./style.scss";

import "./style.scss";

const Footer = () => {
  const [showSupportModel, setShowSupportModel] = useState(false);
  const closePopup = () => setShowSupportModel(false);
  return (
    <>
      <footer className="gems-footer">
        <img className="footer-logo" src={FooterLogo} alt="footerLogo" />
        <img
          className="footer-logo mondelez"
          src={MondelezLogo}
          alt="footerLogo"
        />

        <ul className="footer-menu">
          <li>
            <a
              href="/"
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "home",
                });
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "support",
                });
                setShowSupportModel(true);
              }}
            >
              Support
            </a>
          </li>
          <li>
            <a
              href="/faq"
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "faqs",
                });
              }}
            >
              FAQ's
            </a>
          </li>
          <li>
            <a
              href="/privacy-policy"
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "privacy policy",
                });
              }}
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms-and-conditions"
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "t&c",
                });
              }}
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
        <ul className="footer-social-links">
          <li>
            <a
              className="fb"
              href="https://www.facebook.com/cadburygemsindia/"
              target="_blank"
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "facebook",
                });
              }}
            ></a>
          </li>
          <li>
            <a
              className="insta"
              href="https://www.instagram.com/cadburygems/?hl=en"
              target="_blank"
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "instagram",
                });
              }}
            ></a>
          </li>
          <li>
            <a
              className="youtube"
              href="https://www.youtube.com/user/cadburygems"
              target="_blank"
              onClick={() => {
                invokeGoogleEvent("footer_click", {
                  eventAction: "youtube",
                });
              }}
            ></a>
          </li>
        </ul>
        <Modal show={showSupportModel} size="md" onHide={closePopup} centered>
          <Modal.Header>
            <Modal.Title className="fs-3">Support</Modal.Title>
            <span onClick={closePopup} className="model-close-btn">
              <FaRegTimesCircle />
            </span>
          </Modal.Header>
          <Modal.Body>
            <p className="fs-4 mb-5">
              In case of any campaign related queries, please contact
              <a
                className="px-2 fw-bold"
                href="mailto:contactus@cadburygems.in"
              >
                contactus@cadburygems.in
              </a>
            </p>
            <p className="fs-4 mb-5">
              In case of any technical queries, please contact
              <a className="px-2 fw-bold" href="mailto:support@guardianlink.io">
                support@guardianlink.io
              </a>
            </p>
          </Modal.Body>
        </Modal>
        {/* <a
          className="footer-guardian-link-brand"
          href="https://www.guardianlink.io/"
          target="_blank"
        >
          <small>Powered by</small>&nbsp;GuardianLink
        </a> */}
      </footer>
    </>
  );
};

export default Footer;
