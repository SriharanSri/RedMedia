/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { FaCheckCircle } from "react-icons/fa";

import {
  userBuyOrdersApi,
  userSellOrdersApi,
} from "../../api/methods-marketplace";
import MyOrderCard from "../my-orders";

const MyOrders = () => {
  const [buyOrders, setBuyOrders] = useState({});
  const [buyOrdersList, setBuyOrdersList] = useState([]);
  const [sellOrders, setSellOrders] = useState({});
  const [sellOrdersList, setSellOrdersList] = useState([]);
  const [buyOrderPage, setBuyOrderPage] = useState(1);
  const [sellOrderPage, setSellOrderPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [key, setKey] = useState("buy-orders");

  const [filter, setFilter] = useState({
    sell: [
      { name: "Onsale", value: "onsale", checked: true },
      { name: "Success", value: "success", checked: false },
      { name: "Cancelled", value: "cancelled", checked: false },
    ],
    buy: [
      { name: "Transferred", value: "transferred", checked: true },
      { name: "Pending", value: "pending", checked: false },
      { name: "Expired", value: "expired", checked: false },
    ],
  });

  useEffect(() => {
    getUserSellOrders(1);
    getUserBuyOrders(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserBuyOrders = async (pageNo, type = "transferred") => {
    try {
      setLoading(true);
      const result = await userBuyOrdersApi(pageNo, type);
      setBuyOrders(result.data.data);
      setBuyOrdersList(result.data.data.orders);
      setLoading(false);

      if (result.data.data.total_count > 0) {
        setKey("buy-orders");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMoreUserBuyOrders = async (pageNo, type = "transferred") => {
    try {
      setMoreLoading(true);
      const result = await userBuyOrdersApi(pageNo, type);
      setBuyOrders(result.data.data);
      setBuyOrdersList([...buyOrdersList, ...result.data.data.orders]);
      setMoreLoading(false);
    } catch (err) {
      setMoreLoading(false);
    }
  };

  const loadMoreBuyOrders = () => {
    if (buyOrders.next_page) {
      const value = filter.buy
        .filter((xx) => xx.checked === true)
        .map((obj, i) => obj.value);
      const buyFilter = value[0] ? value[0] : "";
      getMoreUserBuyOrders(buyOrderPage + 1, buyFilter);
      setBuyOrderPage(buyOrderPage + 1);
    }
  };

  const getUserSellOrders = async (pageNo, type = "onsale") => {
    try {
      setLoading(true);
      const result = await userSellOrdersApi(pageNo, type);
      setSellOrders(result.data.data);
      setSellOrdersList(result.data.data.orders);
      setLoading(false);

      if (result.data.data.total_count > 0) {
        setKey("sell-orders");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMoreUserSellOrders = async (pageNo, type = "onsale") => {
    try {
      setMoreLoading(true);
      const result = await userSellOrdersApi(pageNo, type);
      setSellOrders(result.data.data);
      setSellOrdersList([...sellOrdersList, ...result.data.data.orders]);
      setMoreLoading(false);
    } catch (err) {
      setMoreLoading(false);
    }
  };

  const loadMoreSellOrders = () => {
    if (sellOrders.next_page) {
      const value = filter.sell
        .filter((xx) => xx.checked === true)
        .map((obj, i) => obj.value);
      const sellFilter = value[0] ? value[0] : "";
      getMoreUserSellOrders(sellOrderPage + 1, sellFilter);
      setSellOrderPage(sellOrderPage + 1);
    }
  };

  const handleSellFilterType = (input) => {
    const info = { ...filter };
    info.sell = filter.sell.map((obj) => ({
      ...obj,
      checked: input ? input === obj.value : false,
    }));
    setFilter(info);
    setSellOrderPage(1);
    getUserSellOrders(1, input);
  };

  const handleBuyFilterType = (input) => {
    const info = { ...filter };
    info.buy = filter.buy.map((obj) => ({
      ...obj,
      checked: input ? input === obj.value : false,
    }));
    setFilter(info);
    setBuyOrderPage(1);
    getUserBuyOrders(1, input);
  };

  return (
    <>
      {/* <div className="col-md-10"> */}
      <div className="main-content-block container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="wallet-user mt-3">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="about-heading">
                    <div>
                      <h3 className="about-title">My Orders</h3>
                    </div>
                    <div>
                      <ul className="nav user-nav">
                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              key === "buy-orders" ? "active" : ""
                            }`}
                            aria-current="page"
                            role="button"
                            onClick={() => setKey("buy-orders")}
                          >
                            Buy Orders
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            className={`nav-link ${
                              key === "sell-orders" ? "active" : ""
                            }`}
                            role="button"
                            onClick={() => setKey("sell-orders")}
                          >
                            Sell Orders
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex mb-3">
            {key === "sell-orders" ? (
              <>
                {filter.sell.map((obj, i) => (
                  <div
                    role={"button"}
                    className={`rounded-pill ps-3 pe-3 mb-3 me-3 pt-1 pb-1 activity-filter-pill ${
                      obj.checked ? "active" : ""
                    }`}
                    key={`filter-pill${i}`}
                    onClick={() => handleSellFilterType(obj.value)}
                  >
                    {obj.checked && (
                      <FaCheckCircle
                        color={"white"}
                        size={17}
                        className="me-2"
                      />
                    )}
                    {obj.name}{" "}
                    {sellOrders.total_count > 0 && obj.checked && (
                      <>({sellOrders.total_count})</>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>
                {filter.buy.map((obj, i) => (
                  <div
                    role={"button"}
                    className={`rounded-pill ps-3 pe-3 mb-3 me-3 pt-1 pb-1 activity-filter-pill ${
                      obj.checked ? "active" : ""
                    }`}
                    key={`filter-pill${i}`}
                    onClick={() => handleBuyFilterType(obj.value)}
                  >
                    {obj.checked && (
                      <FaCheckCircle
                        color={"white"}
                        size={17}
                        className="me-2"
                      />
                    )}
                    {obj.name}{" "}
                    {buyOrders.total_count > 0 && obj.checked && (
                      <>({buyOrders.total_count})</>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="col-md-12">
            {loading ? (
              <Loader />
            ) : (
              <div className="myorders-block">
                {key === "buy-orders" ? (
                  <>
                    <MyOrderCard list={buyOrdersList} buyOrder />

                    {buyOrders.next_page && (
                      <div className="post-header mt-3 mb-3">
                        <div className="media-body">
                          <p className="notify-p text-center">
                            <span role="button" onClick={loadMoreBuyOrders}>
                              {moreLoading ? "Loading..." : "Load More"}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <MyOrderCard list={sellOrdersList} />

                    {sellOrders.next_page && (
                      <div className="post-header mt-3 mb-3">
                        <div className="media-body">
                          <p className="notify-p text-center">
                            <span role="button" onClick={loadMoreSellOrders}>
                              {moreLoading ? "Loading..." : "Load More"}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Loader = (props) => (
  <ContentLoader
    viewBox="0 0 900 400"
    width={"100%"}
    height={"100%"}
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    className="mt-0"
    {...props}
  >
    <rect x="0" y="5" rx="5" ry="5" width="900" height="100" />
    <rect x="0" y="120" rx="5" ry="5" width="900" height="100" />
    <rect x="0" y="235" rx="5" ry="5" width="900" height="100" />
  </ContentLoader>
);

export default MyOrders;
