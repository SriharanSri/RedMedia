/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Nav, NavItem } from "react-bootstrap";

import {
  market_live_thunk,
  user_logout_thunk,
} from "../../redux/thunk/user_thunk";
import userImg from "../../images/user_1.png";
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
// import JumpTradeLogo from "../../images/jump-trade/jump-trade-logo.svg";
import GemsLogo from "../../images/gems/hero-pg-logo.svg";
import NFTCounter from "../nft-counter/index";
import { useHistory } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import { initGoogleTagManager, invokeGoogleEvent } from "../../utils/common";

import "./style.scss";

const Header2 = () => {
  const size = useWindowSize();
  const market_start_date = "Jan 22, 2022 15:00:00";
  const [market_time, set_market_time] = useState();

  const dispatch = useDispatch();
  const { user, gtag } = useSelector((state) => state);
  const history = useHistory();

  const timeFunction = (check = false) => {
    var offset = new Date().getTimezoneOffset();

    var market_start_date_utc = new Date(market_start_date);
    market_start_date_utc.setMinutes(
      market_start_date_utc.getMinutes() - offset
    );

    var s_time = new Date();

    if (check) s_time.setSeconds(s_time.getSeconds() + 2);

    if (new Date(market_start_date_utc) < s_time) {
      // set_market_started(true);
      // setIsLive(true);
      dispatch(market_live_thunk());
    } else {
      set_market_time(market_start_date_utc);
    }
  };
  useEffect(() => {
    timeFunction(false);
    initGoogleTagManager();
    // dispatch(fire_gtag_event(gtag_event_types["reset"]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCheck = () => {
    timeFunction(true);
  };

  const DropToggle = React.forwardRef(({ onClick }, ref) => {
    return (
      <>
        <Nav.Link
          id="drop_outer"
          role={"button"}
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          <img
            className="user-image"
            src={
              user?.data?.user?.avatar_url
                ? user?.data?.user?.avatar_url
                : userImg
            }
            alt="user-icon"
          />
          <FaAngleDown></FaAngleDown>
        </Nav.Link>
      </>
    );
  });

  const HamBurgerMenu = React.forwardRef(({ onClick }, ref) => {
    return (
      <Nav.Link
        id="drop_outer"
        role={"button"}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          invokeGoogleEvent("hamburger_click");
          onClick(e);
        }}
      >
        <HiOutlineMenu></HiOutlineMenu>
      </Nav.Link>
    );
  });

  const NavBar = () => (
    <Nav className="gems-header-nav">
      <NavItem className="flex-left">
        <Nav.Link href="/" target="_self">
          Home
        </Nav.Link>
        <Nav.Link
          href="/pre-book"
          target="_self"
          onClick={() =>
            invokeGoogleEvent("navigation_click", {
              eventAction: "pre-book",
            })
          }
        >
          Pre-book
        </Nav.Link>
        <Nav.Link href="" target="_self">
          Drop
          <span className="nav-pill">6 Days To Go !</span>
        </Nav.Link>
      </NavItem>
      <NavItem className="flex-right">
        {user?.login ? (
          <>
            {/* <Nav.Link
              href={`/upload-your-artwork`}
              target="_self"
              className="pink-btn"
            >
              Upload Your Art
            </Nav.Link> */}
            <Dropdown
              autoClose={["inside", "outside"]}
              className="me-0 user-profile"
            >
              <Dropdown.Toggle
                align="start"
                drop="start"
                as={DropToggle}
              ></Dropdown.Toggle>

              <Dropdown.Menu align="end" className="dropdown">
                <Dropdown.Item
                  as="button"
                  onClick={() => history.push("/accounts/profile")}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => dispatch(user_logout_thunk())}
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Nav.Link
              href={`/signup`}
              target="_self"
              className="blue-btn"
              onClick={() => invokeGoogleEvent("signup_click")}
            >
              Sign Up
            </Nav.Link>
            {/* <Nav.Link
              href={`/upload-your-artwork`}
              target="_self"
              className="pink-btn"
            >
              Upload Your Art
            </Nav.Link> */}
          </>
        )}
      </NavItem>
    </Nav >
  );

  const NavBarMobile = () => (
    <Dropdown
      autoClose={["inside", "outside"]}
      className="me-0 user-profile mobile-menu"
    >
      <Dropdown.Toggle
        align="start"
        drop="start"
        as={HamBurgerMenu}
      ></Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Nav className="gems-header-nav">
          <NavItem className="flex-left">
            <Nav.Link
              href="/"
              target="_self"
              onClick={() =>
                invokeGoogleEvent("navigation_click", { eventAction: "home" })
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/pre-book"
              target="_self"
              onClick={() =>
                invokeGoogleEvent("navigation_click", {
                  eventAction: "pre-book",
                })
              }
            >
              Pre-book
            </Nav.Link>
            <Nav.Link
              href=""
              target="_self"
              onClick={() =>
                invokeGoogleEvent("navigation_click", { eventAction: "drop" })
              }
            >
              Drop<span className="nav-pill">6 Days To Go !</span>

            </Nav.Link>
          </NavItem>
          <NavItem className="flex-right">
            {user?.login ? (
              <>
                {/* <Nav.Link
                  href={`/upload-your-artwork`}
                  target="_self"
                  className="pink-btn"
                >
                  Upload Your Art
                </Nav.Link> */}

                <Nav.Link
                  onClick={() => {
                    invokeGoogleEvent("navigation_click", {
                      eventAction: "profile",
                    });
                    history.push("/accounts/profile");
                  }}
                >
                  <img
                    className="user-image"
                    src={
                      user?.data?.user?.avatar_url
                        ? user?.data?.user?.avatar_url
                        : userImg
                    }
                    alt="user-icon"
                  />
                  Profile
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    invokeGoogleEvent("navigation_click", {
                      eventAction: "sign out",
                    });
                    dispatch(user_logout_thunk());
                  }}
                >
                  Sign out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  href={`/signup`}
                  target="_self"
                  className="blue-btn"
                  onClick={() => invokeGoogleEvent("signup_click")}
                >
                  Sign Up
                </Nav.Link>
                {/* <Nav.Link
                  href={`/upload-your-artwork`}
                  target="_self"
                  className="pink-btn"
                >
                  Upload Your Art
                </Nav.Link> */}
              </>
            )}
          </NavItem>
        </Nav>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <div className="bl_header">
        <div style={{ display: "none" }}>
          {market_time && (
            <NFTCounter time={market_time} handleEndEvent={handleCheck} />
          )}
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="flex-nav">
                <div className="bl_logo pt-2 pb-2">
                  <img
                    className="brand-logo"
                    src={GemsLogo}
                    onClick={() =>
                      window.open(process.env.REACT_APP_WEBSITE_URL, "_self")
                    }
                    role="button"
                  />
                  <a
                    className="guardian-link-brand"
                    href="https://www.guardianlink.io/"
                    target="_blank"
                  >
                    <small>Powered by </small>&nbsp;GuardianLink
                  </a>
                </div>

                {size < 992 ? <NavBarMobile /> : <NavBar />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header2;
