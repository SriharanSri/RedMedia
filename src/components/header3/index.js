import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import dayjs from "dayjs";
import { BiBell, BiHelpCircle } from "react-icons/bi";

import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import userImg from "../../images/user_1.png";
import depositIcon from "../../images/deposit.svg";
import bidIcon from "../../images/bid.svg";
import buyIcon from "../../images/buy.svg";
import outbidIcon from "../../images/outbid.svg";
import moneyWithdraw from "../../images/withdraw-money.svg";
import { FaDiscord } from "react-icons/fa";
// import JumpTradeLogo from "../../images/jump-trade/jump-trade-logo.svg";
import JumpTradeLogo from "../../images/jump-trade/jump-trade.svg";

import {
  user_load_by_token_thunk,
  user_logout_thunk,
  market_live_thunk,
  get_cart_list_thunk,
} from "../../redux/thunk/user_thunk";
import { accountDetail } from "../../api/actioncable-methods";
import {
  currencyFormat,
  openWindow,
  openWindowBlank,
} from "./../../utils/common";
import NFTCounter from "../nft-counter";
import { getCookies } from "../../utils/cookies";
import { getNotificationApi, readNotificationApi } from "./../../api/methods";

import { CgMenuRight } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
import cartIcon from "../../images/jump-trade/cart_icon.svg";

import "./style.scss";

const Header3 = ({ hideOptions = false }) => {
  const market_start_date = "Jan 26, 2022 03:30:00";

  const [market_time, set_market_time] = useState();

  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [notiLoading, setNotiLoading] = useState(false);
  const [npage, setNPage] = useState(1);
  const [notification, setNotification] = useState();
  const [notiRead, setNotiRead] = useState(true);

  const { user, cart } = state;
  const slug = user?.data?.user?.slug;
  const userCart = cart?.data ? cart?.data : null;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheck = () => {
    timeFunction(true);
  };

  useEffect(() => {
    accountDetail(slug, () => {
      dispatch(user_load_by_token_thunk(getCookies()));
    });
    handleGetNotification(npage);
    dispatch(get_cart_list_thunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleChangeLang = () => {
  //   const u_lang = lang === "en" ? "hi" : "en";
  //   setLanguage(u_lang);
  // dispatch(change_lang_action(u_lang));
  // };

  const handleGetNotification = async (input) => {
    try {
      setNotiLoading(true);
      const result = await getNotificationApi(input);
      setNotiLoading(false);
      if (input === 1) {
        setNotification(result.data.data);
        if (result.data.data.total > 0) {
          setNotiRead(result.data.data.notifications_read);
        }
      } else {
        setNotification({
          ...notification,
          notifications: [
            ...notification.notifications,
            ...result.data.data.notifications,
          ],
          next_page: result.data.data.next_page,
        });
      }
    } catch (error) {
      setNotiLoading(false);

      console.log(
        "🚀 ~ file: index.js ~ line 49 ~ handleGetNotification ~ error",
        error
      );
    }
  };

  const readNotification = async () => {
    try {
      if (!notiRead) await readNotificationApi();
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 61 ~ readNotification ~ error",
        error
      );
    }
  };

  const DropToggle = React.forwardRef(({ onClick }, ref) => {
    return (
      <Nav.Link
        role={"button"}
        id="drop_outer"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        Drops
      </Nav.Link>
    );
  });

  const UserToggleComponent = React.forwardRef(({ onClick }, ref) => (
    <UserComponent
      user={state.user.data.user}
      sref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  const NotificationToggleComponent = React.forwardRef(({ onClick }, ref) => {
    return (
      <div
        // className={`p-2`}
        ref={ref}
        role="button"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
          setNotiRead(true);
        }}
      >
        <BiBell size={25} color={"white"} />

        {!notiRead && (
          <>
            <span className="nofi-color"> </span>
          </>
        )}
      </div>
    );
  });

  const NotiCard = ({ data }) => {
    const handleNotiClick = () => {
      if (data.reason === "deposit") {
        history.push("/accounts/wallet");
      }
    };

    return (
      <div className="noti-message" role="button" onClick={handleNotiClick}>
        {(() => {
          if (data.activity_type === "deposit") {
            return <img src={depositIcon} alt="notification icon" />;
          } else if (data.activity_type === "reward") {
            return <img src={buyIcon} alt="notification icon" />;
          } else if (data.activity_type === "bid") {
            if (data.reason === "bid_lock") {
              return <img src={bidIcon} alt="notification icon" />;
            } else if (
              data.reason === "bid_expired" ||
              data.reason === "bid_closed"
            ) {
              return <img src={outbidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_outdated") {
              return <img src={outbidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_cancelled") {
              return <img src={outbidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_success") {
              return <img src={bidIcon} alt="notification icon" />;
            } else if (data.reason === "bid_received") {
              return <img src={outbidIcon} alt="notification icon" />;
            }
          } else if (data.activity_type === "buy") {
            if (data.payment_type === "debit") {
              return <img src={buyIcon} alt="notification icon" />;
            } else {
              return <img src={buyIcon} alt="notification icon" />;
            }
          } else if (data.activity_type === "withdraw") {
            if (data.reason === "withdraw_requested") {
              return <img src={moneyWithdraw} alt="notification icon" />;
            } else if (data.reason === "withdraw_cancelled") {
              return <img src={moneyWithdraw} alt="notification icon" />;
            } else if (data.reason === "withdraw_success") {
              return <img src={moneyWithdraw} alt="notification icon" />;
            }
          } else {
            return "";
          }
        })()}
        <div className="noti-message-content">
          {(() => {
            if (data.activity_type === "deposit") {
              return (
                <>
                  <div className="title">Deposit Successful</div>
                  <div className="desc text-secondary">
                    Your payment of{" "}
                    {currencyFormat(Math.round(data.amount), "USD")} was
                    successfully processed to your wallet! Happy NFT buying
                  </div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            } else if (data.activity_type === "reward") {
              return (
                <>
                  <div className="title">{data.title}</div>
                  <div className="desc text-secondary">{data.desc}</div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            } else if (data.activity_type === "bid") {
              return (
                <>
                  {(() => {
                    if (data.reason === "bid_lock") {
                      return (
                        <>
                          <div className="title">Bid Locked</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              is locked for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>{" "}
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (
                      data.reason === "bid_expired" ||
                      data.reason === "bid_closed"
                    ) {
                      return (
                        <>
                          <div className="title">Bid Expired</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was expired for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.seller_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_outdated") {
                      return (
                        <>
                          <div className="title">Bid Outdated</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was outdated for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_cancelled") {
                      return (
                        <>
                          <div className="title">Bid Cancelled</div>
                          <div className="desc text-secondary">
                            <>
                              Your bid{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was cancelled for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              by <b>{data.seller_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    } else if (data.reason === "bid_success") {
                      return (
                        <>
                          {data.payment_type === "debit" ? (
                            <>
                              <div className="title">Bid Successfull</div>
                              <div className="desc text-secondary">
                                <>
                                  Your bid{" "}
                                  <b>
                                    {" "}
                                    {currencyFormat(
                                      Math.round(data.amount),
                                      "USD"
                                    )}
                                  </b>{" "}
                                  was successful for{" "}
                                  <b>
                                    {" "}
                                    {data.celebrity_name}
                                    's {data.nft_name}
                                  </b>{" "}
                                  from <b>{data.buyer_name}</b>
                                </>
                              </div>
                              <div className="noti-time">
                                {dayjs(data.created_at).format(
                                  "DD MMM YYYY hh:mma"
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="title">Bid Successfull</div>
                              <div className="desc text-secondary">
                                <>
                                  Your{" "}
                                  <b>
                                    {data.celebrity_name}
                                    's {data.nft_name}
                                  </b>{" "}
                                  was sold for{" "}
                                  <b>
                                    {currencyFormat(
                                      Math.round(data.amount),
                                      "USD"
                                    )}
                                  </b>{" "}
                                  to <b>{data.buyer_name}</b>
                                </>
                              </div>
                              <div className="noti-time">
                                {dayjs(data.created_at).format(
                                  "DD MMM YYYY hh:mma"
                                )}
                              </div>
                            </>
                          )}
                        </>
                      );
                    } else if (data.reason === "bid_received") {
                      return (
                        <>
                          <div className="title">Bid Received</div>
                          <div className="desc text-secondary">
                            <>
                              You received{" "}
                              <b>
                                {" "}
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              bid for{" "}
                              <b>
                                {data.celebrity_name}
                                's {data.nft_name}
                              </b>{" "}
                              from <b>{data.buyer_name}</b>
                            </>
                          </div>
                          <div className="noti-time">
                            {dayjs(data.created_at).format(
                              "DD MMM YYYY hh:mma"
                            )}
                          </div>
                        </>
                      );
                    }
                  })()}
                </>
              );
            } else if (data.activity_type === "buy") {
              return (
                <>
                  {data.payment_type === "debit" ? (
                    <>
                      <div className="title">You Bought</div>
                      <div className="desc text-secondary">
                        <>
                          {dayjs(data.created_at).format("D MMM YYYY") ===
                          "22 Apr 2022" ? (
                            `Congratulations! You've successfully bought the Super Loot of Meta Cricket League!`
                          ) : (
                            <>
                              <b>
                                {data.celebrity_name}
                                's NFT{" "}
                              </b>
                              from <b>{data.seller_name}</b> for{" "}
                              <b>
                                {" "}
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                            </>
                          )}
                        </>
                      </div>
                      <div className="noti-time">
                        {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="title">You Sold</div>
                      <div className="desc text-secondary">
                        <>
                          You sold <b>{data.celebrity_name}'s NFT</b> to{" "}
                          <b>{data.buyer_name}</b> for{" "}
                          <b>
                            {" "}
                            {currencyFormat(Math.round(data.amount), "USD")}
                          </b>
                        </>
                      </div>
                      <div className="noti-time">
                        {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                      </div>
                    </>
                  )}
                </>
              );
            } else if (data.activity_type === "withdraw") {
              return (
                <>
                  <div className="title">Withdraw</div>
                  <div className="desc text-secondary">
                    <>
                      {(() => {
                        if (data.reason === "withdraw_requested") {
                          return (
                            <>
                              {" "}
                              You <b>requested a withdraw</b> of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                            </>
                          );
                        } else if (data.reason === "withdraw_cancelled") {
                          return (
                            <>
                              You <b>cancelled a withdraw request</b> of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>
                            </>
                          );
                        } else if (data.reason === "withdraw_success") {
                          return (
                            <>
                              You <b>withdraw request</b> of{" "}
                              <b>
                                {currencyFormat(Math.round(data.amount), "USD")}
                              </b>{" "}
                              was <b>successful</b>
                            </>
                          );
                        }
                      })()}
                    </>
                  </div>
                  <div className="noti-time">
                    {dayjs(data.created_at).format("DD MMM YYYY hh:mma")}
                  </div>
                </>
              );
            }
          })()}
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: "none" }}>
        {market_time && (
          <NFTCounter time={market_time} handleEndEvent={handleCheck} />
        )}
      </div>
      <Navbar bg="dark" expand="md" sticky="top" variant="dark">
        <Container fluid>
          <Navbar.Brand role="button" className="head-title bl_logo">
            {/* Jump.trade
            <div
              className="sub-head-title header-powereby"
              role="button"
              onClick={() => openWindow(process.env.REACT_APP_GUARDIAN_URL)}
            >
              Powered by GuardianLink
            </div> */}
            <img
              className="brand-logo"
              src={JumpTradeLogo}
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
              <span>|</span> A GuardianLink Brand
            </a>
          </Navbar.Brand>
          {!hideOptions && (
            <>
              <Nav className="d-flex me-0 ms-auto">
                {user.login ? (
                  <>
                    {/* <Nav.Link className="css-5cmxo2 me-3" id="drop_outer">
                      <div
                        className="sub-head-title"
                        role="button"
                        onClick={() =>
                          openWindow(
                            `${process.env.REACT_APP_MARKETPLACE_URL}/creator-application`,
                            "_blank"
                          )
                        }
                      >
                        Creator
                      </div>
                    </Nav.Link> */}

                    <Dropdown autoClose={["inside", "outside"]}>
                      <Dropdown.Toggle
                        align="start"
                        drop="start"
                        as={DropToggle}
                      ></Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Item
                          as="button"
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_MCL_URL}`,
                              "_blank"
                            )
                          }
                        >
                          Meta Cricket League NFTs
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_CHELSEA_URL}`,
                              "_blank"
                            )
                          }
                        >
                          Chelsea Memorabilia NFTs
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* <Nav.Link className="css-5cmxo2 me-3" id="drop_outer">
                      <div
                        className="sub-head-title"
                        role="button"
                        onClick={() =>
                          openWindow(
                            `${process.env.REACT_APP_WEBSITE_URL}/mcl`,
                            "_blank"
                          )
                        }
                      >
                        Drop
                      </div>
                    </Nav.Link> */}

                    <Nav.Link className="css-5cmxo2 me-3" id="drop_outer">
                      <div
                        className="sub-head-title"
                        role="button"
                        onClick={() =>
                          openWindow(
                            process.env.REACT_APP_MARKETPLACE_URL,
                            "_blank"
                          )
                        }
                      >
                        <span className="beta-container">
                          <span className="beta-tag">Beta</span>
                          Marketplace
                        </span>
                      </div>
                    </Nav.Link>

                    <Nav.Link href="#home" className="help_ic">
                      <BiHelpCircle
                        size={25}
                        role="button"
                        onClick={() =>
                          openWindowBlank(process.env.REACT_APP_HELP_URL)
                        }
                      />
                    </Nav.Link>
                    <Dropdown
                      autoClose={["inside", "outside"]}
                      onToggle={(e) => {
                        if (e) {
                          readNotification();
                          setNotiRead(false);
                        }
                      }}
                    >
                      <Dropdown.Toggle
                        align="start"
                        drop="start"
                        as={NotificationToggleComponent}
                      ></Dropdown.Toggle>

                      <Dropdown.Menu align="end" className="noti-container">
                        <div className="noti-header">
                          <BiBell size={25} color={"white"} /> Notifications
                        </div>
                        <div className="noti-content">
                          {/* <div className="sub-header">Today</div> */}
                          {notification?.notifications.length > 0 ? (
                            <>
                              {notification?.notifications.map((o, i) => (
                                <Dropdown.Item key={`noti${i}`}>
                                  <NotiCard data={o} />
                                </Dropdown.Item>
                              ))}
                              {notiLoading && (
                                <div className="noti-load-more text-secondary">
                                  Loading...
                                </div>
                              )}
                              {notification?.next_page ? (
                                <div
                                  className="noti-load-more text-secondary"
                                  role="button"
                                  onClick={() => {
                                    setNPage(npage + 1);
                                    handleGetNotification(npage + 1);
                                  }}
                                >
                                  See More
                                </div>
                              ) : (
                                <div className="noti-load-more text-secondary">
                                  You have reached the end
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="noti-load-more text-secondary">
                              No notifications found
                            </div>
                          )}
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Nav.Link
                      href={`${process.env.REACT_APP_MARKETPLACE_URL}/#cart`}
                      className="cart_ic position-relative"
                      target={"_self"}
                    >
                      <img src={cartIcon} height={20} />
                      {parseInt(userCart?.total_count) > 0 && (
                        <span className="badge cart-count rounded-pill bg-danger position-absolute">
                          {userCart?.total_count}
                        </span>
                      )}
                    </Nav.Link>

                    <Dropdown>
                      <Dropdown.Toggle
                        align="start"
                        drop="start"
                        as={UserToggleComponent}
                      ></Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <UserComponent user={state.user.data.user} />
                        {/* <Dropdown.Item
                          id="drop_inner"
                          href={process.env.REACT_APP_CHAKRA_URL}
                          target="_self"
                        >
                          Drops
                        </Dropdown.Item> */}
                        {/* <Dropdown.Item id="drop_inner" href="/" target="_self">
                          Drops
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/profile")}
                        >
                          My Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/mynft")}
                        >
                          My NFTs
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/wallet")}
                        >
                          My GuardianLink Wallet
                        </Dropdown.Item>

                        <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/pre-orders")}
                        >
                          Pre Book
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/my-orders")}
                        >
                          My Orders
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/bid-activity")}
                        >
                          My Bids
                        </Dropdown.Item>
                        {/* <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/claim")}
                        >
                          Claim NFTs
                        </Dropdown.Item> */}
                        <Dropdown.Item
                          as="button"
                          onClick={() =>
                            history.push("/accounts/user-activity")
                          }
                        >
                          My Activity
                        </Dropdown.Item>

                        <Dropdown.Item
                          as="button"
                          onClick={() => history.push("/accounts/settings")}
                        >
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          as="button"
                          onClick={() =>
                            window.open(
                              process.env.REACT_APP_HELP_URL,
                              "_blank"
                            )
                          }
                        >
                          Help Center
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          as="button"
                          onClick={() => dispatch(user_logout_thunk())}
                        >
                          Sign Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link href={`/signin`} target="_self">
                      Sign In
                    </Nav.Link>
                    <Nav.Link href={`/signup`} target="_self">
                      Sign Up
                    </Nav.Link>
                  </>
                )}
                <Nav.Link
                  className="discord_ic"
                  href={`https://discord.com/invite/QU2vNXgqNe`}
                  target="_blank"
                >
                  <FaDiscord size={25} />
                </Nav.Link>
              </Nav>
              <Dropdown
                autoClose={["inside", "outside"]}
                onToggle={(e) => {
                  // if (e) {
                  //   readNotification();
                  //   setNotiRead(false);
                  // }
                }}
              >
                <Dropdown.Toggle
                  align="start"
                  drop="start"
                  as={HeaderMobileMenuIcon}
                ></Dropdown.Toggle>

                <Dropdown.Menu align="end" className="side-menu">
                  <Dropdown.Item
                    drop="start"
                    as={HeaderMobileMenuCloseIcon}
                  ></Dropdown.Item>
                  {/* <Dropdown.Item
                    href={`${process.env.REACT_APP_WEBSITE_URL}/mcl`}
                    target={"_blank"}
                  >
                    Drop
                  </Dropdown.Item>

                  <Dropdown.Item
                    href={process.env.REACT_APP_MARKETPLACE_URL}
                    target="_blank"
                  >
                    <span className="beta-container">
                      <span className="beta-tag">Beta</span>
                      Marketplace
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    href={`${process.env.REACT_APP_MARKETPLACE_URL}/creator-application`}
                    target="_blank"
                  >
                    Creator
                  </Dropdown.Item> */}
                  <Dropdown autoClose={["inside", "outside"]} className="me-0">
                    <Dropdown.Toggle
                      align="start"
                      drop="start"
                      as={DropToggle}
                    ></Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      <Dropdown.Item
                        as="button"
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_MCL_URL}`,
                            "_blank"
                          )
                        }
                      >
                        Meta Cricket League NFTs
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="button"
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_CHELSEA_URL}`,
                            "_blank"
                          )
                        }
                      >
                        Chelsea Memorabilia NFTs
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown.Item
                    href={process.env.REACT_APP_MARKETPLACE_URL}
                    target="_blank"
                  >
                    <span className="beta-container">
                      <span className="beta-tag">Beta</span>
                      Marketplace
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

const UserComponent = ({ user, onClick = () => {}, sref }) => (
  <div className="header-user-details" onClick={onClick} ref={sref}>
    <img
      className="user-image"
      src={user.avatar_url ? user.avatar_url : userImg}
      alt="user-icon"
    />
    <div className="user-name">
      {currencyFormat(user.balance, user.currency_name)}
    </div>
  </div>
);

const HeaderMobileMenuIcon = React.forwardRef(({ onClick }, ref) => {
  return (
    <div
      className="menu-icon"
      ref={ref}
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <CgMenuRight size={25} color={"white"} />
    </div>
  );
});

const HeaderMobileMenuCloseIcon = React.forwardRef(({ onClick }, ref) => {
  return (
    <div
      className="close-icon"
      ref={ref}
      role="button"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <VscChromeClose size={25} color={"white"} />
    </div>
  );
});

export default Header3;
