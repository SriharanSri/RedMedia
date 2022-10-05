import React from "react";
import {
  RiUser3Line,
  RiWallet3Line,
  RiSettings5Line,
  RiLayoutGridLine,
  RiLogoutCircleRLine,
  RiHammerFill,
  RiDropLine,
  RiShoppingCart2Line,
  RiBookmarkLine,
  RiAuctionLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useDispatch } from "react-redux";

import { user_logout_thunk } from "../../redux/thunk/user_thunk";

const SideNav = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const { page } = match.params;
  const currentPage = page ? page : "profile";
  return (
    <>
      {/* <div className="col-md-2"> */}
      <div className="side_menu" id="tab_section">
        <div className="vertical-wrapper">
          <ul className="vertical-group">
            <li
              className={`vertical-item level1 ${
                currentPage === "profile" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/profile" className="list_item_a">
                {/* <FaUser className="icon" /> */}
                <RiUser3Line />
                <span>My Profile</span>
              </Link>
            </li>
            <li
              className={`vertical-item level1 ${
                currentPage === "mynft" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/mynft" className="list_item_a">
                {/* <FaUser className="icon" /> */}
                <RiDropLine />
                <span>My NFTs</span>
              </Link>
            </li>
            <li
              className={`vertical-item level1 ${
                currentPage === "wallet" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/wallet" className="list_item_a">
                <RiWallet3Line className="icon" />{" "}
                <span>My GuardianLink Wallet</span>
              </Link>
            </li>
            <li
              className={`vertical-item level1 ${
                currentPage === "my-orders" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/my-orders" className="list_item_a">
                <RiShoppingCart2Line /> <span>My Orders</span>
                {/* <i className="fas fa-analytics"></i> */}
              </Link>
            </li>
            <li
              className={`vertical-item level1 ${
                currentPage === "pre-orders" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/pre-orders" className="list_item_a">
                <RiBookmarkLine /> <span>Pre Book</span>
              </Link>
            </li>
            <li
              className={`vertical-item level1 ${
                currentPage === "bid-activity" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/bid-activity" className="list_item_a">
                <RiAuctionLine /> <span>My Bids</span>
                {/* <i className="fas fa-analytics"></i>  */}
              </Link>
            </li>
            {/* <li
              className={`vertical-item level1 ${
                currentPage === "claim" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/claim" className="list_item_a">
                <RiHammerFill /> <span>Claim NFTs</span>
              </Link>
            </li> */}
            <li
              className={`vertical-item level1 ${
                currentPage === "user-activity" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/user-activity" className="list_item_a">
                <RiLayoutGridLine /> <span>My Activity</span>
              </Link>
            </li>
            <li
              className={`vertical-item level1 ${
                currentPage === "settings" ? "list-active" : ""
              }`}
            >
              <Link to="/accounts/settings" className="list_item_a">
                <RiSettings5Line /> <span>Settings</span>
              </Link>
            </li>
            {/* <li className={`vertical-item level1`}>
                <a
                  href={process.env.REACT_APP_CHAKRA_URL}
                  target="_self"
                  className="list_item_a"
                >
                  <FiGrid /> <span>Drops</span>
                </a>
              </li> */}
            {/* <li
                className={`vertical-item level1 ${
                  currentPage === "support" ? "list-active" : ""
                }`}
              >
                <Link to="/accounts/support" className="list_item_a">
                  <FaQuestionCircle /> <span>Support</span>
                </Link>
              </li> */}
          </ul>
          <div className="fixed-footer-aside">
            <ul className="vertical-group">
              <li className={`vertical-item level1`}>
                <Link
                  to="#"
                  className="list_item_a  d-flex custom-logout"
                  onClick={() => dispatch(user_logout_thunk())}
                >
                  <span>Sign Out</span>
                  <span>
                    <RiLogoutCircleRLine />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SideNav;
