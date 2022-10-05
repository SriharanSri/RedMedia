import React, { useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import ToolTip from "../tooltip/index";
import { currencyFormat, openWindowBlank } from "../../utils/common";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { userNFTInvoiceApi } from "../../api/methods-marketplace";
import sample from "../../images/post1.png";
import nonftfound from "../../images/nonftfound.svg";
import "./styles.scss";
import { Modal } from "react-bootstrap";
import PdfDocument from "../pdf-generator/PdfDownloadTax/PdfDocument";
import InvoiceTax from "../pdf-generator/PdfDownloadTax/InvoiceTax";
import countryJson from "../../utils/countries.json";

const MyOrderCard = ({ list = [], buyOrder = false }) => {
  const [show, setShow] = useState(false);

  const [invoiceData, setInvoiceData] = useState();
  const handleGenerateInvoice = async (e, input) => {
    e.stopPropagation();

    const result = await userNFTInvoiceApi(input);

    const { invoice } = result.data.data;

    if (invoice.buyer_kyc_completed) {
      //futher process - pdf generation
      setShow(true);

      setInvoiceData({
        invoice: {
          id: invoice.invoice_details.invoice_number,
          date: invoice.invoice_details.invoice_date,
          taxable: invoice.seller_details.gst ? true : false,
          name: `${invoice.seller_details.address.first_name} ${invoice.seller_details.address.last_name}`,
          pan_no: invoice.seller_details.pan ? invoice.seller_details.pan : "",
          gst_no: invoice.seller_details.gst ? invoice.seller_details.gst : "",
          tan_no: invoice.seller_details.tan ? invoice.seller_details.tan : "",
          sold_to_address: {
            // street1: invoice.seller_details.address.line1,
            // street2: invoice.seller_details.address.line2
            //   ? invoice.seller_details.address.line2
            //   : "",
            city: invoice?.seller_details?.address?.city ? invoice.seller_details.address.city : "",
            state: invoice?.seller_details?.address?.state ? countryJson
              .find((o) => o.code2 === invoice.seller_details.address.country)
              .states.find(
                (c) => c.code === invoice.seller_details.address.state
              ).name : "",
            country: countryJson.find(
              (o) => o.code2 === invoice.seller_details.address.country
            ).name,
            pincode: invoice.seller_details.address.pincode,
          },
          bill_to_address: {
            // street1: invoice.buyer_details.address.line1,
            // street2: invoice.buyer_details.address.line2
            //   ? invoice.buyer_details.address.line2
            //   : "",
            city: invoice?.buyer_details?.address?.city ? invoice.buyer_details.address.city: "",
            state: invoice?.buyer_details?.address?.state? countryJson
              .find((o) => o.code2 === invoice.buyer_details.address.country)
              .states.find(
                (c) => c.code === invoice.buyer_details.address.state
              ).name :"",
            country: countryJson.find(
              (o) => o.code2 === invoice.buyer_details.address.country
            ).name,
            pincode: invoice.buyer_details.address.pincode,
          },
          ordered_items: [
            {
              id: 1,
              description: invoice.nft_name,
              price: invoice.invoice_details.total_amount,
              quantity: invoice.invoice_details.quantity,
              tax_rate: 18,
              tax_type: "GST",
            },
          ],
        },
      });
    } else {
      toast.error("You need to complete your KYC");
    }
  };

  return (
    <>
      {list.length > 0 ? (
        list.map((order, i) => (
          <article
            key={`order-${i}`}
            className="myorder-card"
            onClick={() =>
              openWindowBlank(
                `${process.env.REACT_APP_MARKETPLACE_URL}/order/details/${order?.slug}/${order?.order_slug}`
              )
            }
          >
            <div className="nft-info">
              <div className="img-block">
                <img
                  alt="NFT"
                  src={(() => {
                    if (order?.asset_type?.includes("image")) {
                      return order?.asset_url ? order?.asset_url : sample;
                    } else {
                      return order?.cover_url ? order?.cover_url : sample;
                    }
                  })()}
                />
              </div>
              <div className="nft-base-detail">
                <h6>
                  {order?.nft_type?.toUpperCase()} | {order?.category_name}
                  {/* |
                  {order?.celebrity_id === 1
                    ? ` Amitabh Bachchan's Exclusive NFTs`
                    : ` Stan Lee's Exclusive NFTs`} */}
                </h6>
                <h4>{order?.name}</h4>
                {/* <h5 className="mt-2">{order?.nft_type?.toUpperCase()}</h5> */}
                {buyOrder ? (
                  <h5 className="mt-2 transform">
                    <span>Purchase Type:</span> {order?.sale_type}{" "}
                  </h5>
                ) : (
                  <h5 className="mt-2 transform">
                    <span>Sale Type:</span>{" "}
                    {order?.is_bid && order?.is_buy
                      ? "Bid & Buy"
                      : order?.is_bid
                      ? "Bid"
                      : "Buy"}
                  </h5>
                )}
              </div>
            </div>
            {buyOrder ? (
              <div className="myorder-info-block">
                <div className="myorder-price-info">
                  <h5>
                    <span className="caption">Qty:</span>{" "}
                    <b>{order?.buy_quantity}</b>{" "}
                    <span className="caption">Price:</span>{" "}
                    {currencyFormat(parseFloat(order?.buy_amount), "USD")}
                  </h5>
                  <h5>
                    <span className="caption">Service Fee:</span>{" "}
                    {parseFloat(order?.service_fee)}%{" "}
                    <ToolTip
                      icon={
                        <BsFillQuestionCircleFill
                          size={16}
                          className="mb-1 check-icon"
                        />
                      }
                      content={
                        "The service fee includes gas fee and the platform fee."
                      }
                      placement="top"
                    />
                  </h5>
                  <h4>
                    Total Amount:{" "}
                    {currencyFormat(
                      parseFloat(order?.buy_amount) + parseFloat(order?.fees),
                      "USD"
                    )}
                  </h4>
                </div>
                <div className="myorder-info">
                  <h5>
                    {dayjs(order?.updated_at).format(" D MMM YYYY hh:mma")}
                  </h5>

                  <span className={`pill-status mt-2 ${order?.status}`}>
                    {order?.status === "pending"
                      ? `Transaction Pending`
                      : order?.status}
                  </span>

                  {order?.status === "transferred" && (
                    <button
                      type="button"
                      className="btn btn-dark btn-sm rounded rounded-pill ps-4 pe-4 mt-2"
                      onClick={(e) =>
                        handleGenerateInvoice(e, order?.order_detail_slug)
                      }
                    >
                      Download Invoice
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="myorder-info-block">
                <div className="myorder-price-info">
                  {order?.total_quantity > 0 && (
                    <h5>
                      <span className="caption">Edition(s):</span>{" "}
                      {order?.total_quantity} / {order?.total_quantity}
                    </h5>
                  )}
                  <h5>
                    {/* {(() => {
                      if (order?.is_bid && order?.is_buy) {
                        return (
                          <span>
                            <span className="caption">Bid / Buy : </span>{" "}
                            {currencyFormat(
                              parseFloat(order?.minimum_bid),
                              "USD"
                            )}{" "}
                            <span className="caption"> / </span>
                            {currencyFormat(
                              parseFloat(order?.buy_amount),
                              "USD"
                            )}
                          </span>
                        );
                      } else if (order?.is_bid) {
                        return (
                          <span>
                            <span className="caption">Bid: </span>{" "}
                            {currencyFormat(
                              parseFloat(order?.minimum_bid),
                              "USD"
                            )}
                          </span>
                        );
                      } else if (order?.is_buy) {
                        return (
                          <span>
                            <span className="caption">Buy: </span>{" "}
                            {currencyFormat(
                              parseFloat(order?.buy_amount),
                              "USD"
                            )}
                          </span>
                        );
                      }
                    })()} */}
                    {order?.is_bid && (
                      <span>
                        <span className="caption">Bid: </span>{" "}
                        {currencyFormat(parseFloat(order?.minimum_bid), "USD")}
                      </span>
                    )}
                    {order?.is_buy && (
                      <span>
                        &nbsp; &nbsp;
                        <span className="caption">Buy: </span>{" "}
                        {currencyFormat(parseFloat(order?.buy_amount), "USD")}
                      </span>
                    )}
                  </h5>
                </div>
                <div className="myorder-price-info">
                  <h5>
                    <span className="caption">Artist Fee:</span>{" "}
                    {parseFloat(order?.artist_fee)}%{" "}
                    <ToolTip
                      icon={
                        <BsFillQuestionCircleFill
                          size={16}
                          className="mb-1 check-icon"
                        />
                      }
                      content={
                        "The royalty paid to the artist or the inspiration."
                      }
                      placement="top"
                    />
                  </h5>
                  <h5>
                    <span className="caption">Service Fee:</span>{" "}
                    {parseFloat(order?.service_fee)}%{" "}
                    <ToolTip
                      icon={
                        <BsFillQuestionCircleFill
                          size={16}
                          className="mb-1 check-icon"
                        />
                      }
                      content={
                        "The service fee includes gas fee and the platform fee."
                      }
                      placement="top"
                    />
                  </h5>
                  {order?.is_buy && (
                    <h4>
                      Total Amount:{" "}
                      {currencyFormat(
                        parseFloat(order?.buy_amount) -
                          (parseFloat(order?.buy_amount) *
                            (parseFloat(order?.artist_fee) +
                              parseFloat(order?.service_fee))) /
                            100,
                        "USD"
                      )}
                    </h4>
                  )}
                </div>
                <div className="myorder-info">
                  <h5>
                    {dayjs(order?.created_at).format(" D MMM YYYY hh:mma")}
                  </h5>
                  <span className={`pill-status mt-2 ${order?.status}`}>
                    {order?.status.replace("_", " ")}
                  </span>
                  {order?.invoices.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-dark btn-sm rounded rounded-pill ps-4 pe-4 mt-2"
                      onClick={(e) =>
                        handleGenerateInvoice(
                          e,
                          order?.invoices[0].order_detail_slug
                        )
                      }
                    >
                      Download Invoice
                    </button>
                  )}
                </div>
              </div>
            )}

            {!buyOrder && order?.timed_auction && (
              <div className="auction-flex">
                <h5 className="auction_time">
                  <span className="caption">Auction Starting Date: &nbsp;</span>
                  <b>
                    {dayjs(order?.auction_start_time).format(
                      "D MMM YYYY hh:mma"
                    )}
                  </b>
                </h5>
                <h5 className="auction_time">
                  <span className="caption">
                    Auction Expiration Date: &nbsp;
                  </span>
                  <b>
                    {dayjs(order?.auction_end_time).format("D MMM YYYY hh:mma")}
                  </b>
                </h5>
              </div>
            )}
          </article>
        ))
      ) : (
        <div className="nonft_found">
          <div className="nodata-card">
            <img src={nonftfound} height="90" alt="" />
            <h4>No orders found!</h4>
          </div>
        </div>
      )}

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setInvoiceData(null);
        }}
      >
        <Modal.Header closeButton>
          <h3>Download your Invoice</h3>
        </Modal.Header>
        <div className="p-4">
          <div className="mb-4">
            An Invoice has been generated for your order and it is available for
            download.
          </div>
          {invoiceData && (
            <PdfDocument
              title={invoiceData.invoice.id}
              document={<InvoiceTax data={invoiceData} />}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default MyOrderCard;
