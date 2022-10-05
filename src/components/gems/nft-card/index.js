import React, { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { toast } from "react-toastify";
import { detectWhatsapp, invokeGoogleEvent } from "../../../utils/common";
import CardDetailsFracto from "../../card-details-fracto";
import { Modal } from "react-bootstrap";
import { getPriceNft } from "../../../api/methods";
import "./style.scss";

const NftCard = (props) => {
  const shareUrl = `${process.env.REACT_APP_WEBSITE_URL}/art/${props?.slug}`;
  const [loading, setLoading] = useState(false);
  const [type, settype] = useState('preview');
  const copyToClipboard = (uinNo) => {
    navigator.clipboard.writeText(uinNo);
    toast.success(`UIN copied to your clipboard`);
  };
  const [amount, setAmount] = useState(0);
  const [amount_USD, setAmountUSD] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [UsdNetAmount, setUsdNetAmount] = useState(0);
  const [InrNetAmount, setInrNetAmount] = useState(0);

  const [InrTotal, setInrTotal] = useState(0);
  const [UsdTotal, setUsdTotal] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const OrderTotal =
  {
    'service_charge': InrNetAmount,
    'total_amount': amount,
    'total_amount_usd': amount_USD,
    'service_charge_usd': UsdNetAmount,
    'total_inrnet_amount': InrTotal,
    'total_usdnet_amount': UsdTotal,
    'uin': props?.uin,
  }

  const handlePrice = async () => {
    if (type === "counter") {
      try {
        const quantityresponse = await getPriceNft({ 'quantity': quantity });

        // console.log(quantityresponse.data);

        // set_dataamount(quantityresponse.data)
        // console.log(quantityresponse?.data?.inr?.total_amount, 'sss');
        setAmount(quantityresponse?.data?.inr?.total_amount)
        setInrNetAmount(quantityresponse?.data?.inr?.service_charge)
        setAmountUSD(quantityresponse?.data?.usd?.total_amount)
        setUsdNetAmount(quantityresponse?.data?.usd?.service_charge)
        setInrTotal(quantityresponse?.data?.inr?.net_amount)
        setUsdTotal(quantityresponse?.data?.usd?.net_amount)
      } catch (error) {
        setLoading(false);
        toast.error(error?.data?.message || "Please try again after sometime.");
        console.log("Please try again after sometimer");
      }
    }
    if (type === "preview") {
      try {
        console.log(props?.uin)
        const quantityresponse = await getPriceNft({ 'quantity': 1 });
        // setAmount(quantityresponse?.data?.amount_in_inr)
        // setAmountUSD(quantityresponse?.data?.amount_in_usd)
        setAmount(quantityresponse?.data?.inr?.total_amount)
        setInrNetAmount(quantityresponse?.data?.inr?.service_charge)
        setAmountUSD(quantityresponse?.data?.usd?.total_amount)
        setUsdNetAmount(quantityresponse?.data?.usd?.service_charge)
        setInrTotal(quantityresponse?.data?.inr?.net_amount)
        setUsdTotal(quantityresponse?.data?.usd?.net_amount)
        handlePayment()
      } catch (error) {
        setLoading(false);
        toast.error(error?.data?.message || "Please try again after sometime.");
        console.log("Please try again after sometimer");
      }
    }

  }

  const handlePayment = async () => {
    setShow(true)
  };




  const renderTooltip = (
    <Popover>
      <Popover.Body>
        <p className="password-terms">
          UIN can be used for searching an NFT that you want to pre-book in the
          Pre-Booking window.
        </p>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <article className="nft-card gems-nft-cart">
        <div className="gems-nft-img-block">
          <div className="share-box">
            <h5>share this on social media</h5>
            <ul className="popup-share-links">
              <li>
                <a
                  className="fb"
                  target="_blank"
                  onClick={() => {
                    invokeGoogleEvent("user_profile_share", {
                      eventLabel: "facebook",
                    });
                    window.open(
                      `https://www.facebook.com/dialog/feed?app_id=${process.env.REACT_APP_FACEBOOK_CLIENT_ID}&display=page&caption=My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in&link=${shareUrl}&redirect_uri=${process.env.REACT_APP_WEBSITE_URL}`
                    );
                  }}
                ></a>
              </li>
              <li>
                <a
                  className="twitter"
                  target="_blank"
                  onClick={() => {
                    invokeGoogleEvent("user_profile_share", {
                      eventLabel: "twitter",
                    });
                    window.open(
                      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                        `My child just created an NFT with Cadbury Gems Junior NFT! The sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in\n`
                      )}`
                    );
                  }}
                ></a>
              </li>
              <li>
                <a
                  className="whatsapp"
                  target="_blank"
                  onClick={() => {
                    detectWhatsapp(
                      `whatsapp://send?text=My child just created an NFT with Cadbury Gems Junior NFT!%0A${shareUrl}%0AThe sale of the NFT will contribute to supporting the education of under-privileged children. To see this NFT, pre-book an NFT or create your own visit www.cadburygems.in`
                    ).then((hasWhatsapp) => {
                      if (!hasWhatsapp) {
                        alert(
                          "You don't have WhatsApp, kindly install it and try again"
                        );
                      } else
                        invokeGoogleEvent("user_profile_share", {
                          eventLabel: "whatsapp",
                        });
                    });
                  }}
                ></a>
              </li>
            </ul>
          </div>
          {props?.image_url && (
            <img
              src={props?.image_url}
              alt="nft-img"
              className="gems-nft-img"
            />
          )}
        </div>

        <div className="gems-nft-content-block">
          {props?.uin && (
            <div className="uin-band">
              <h5 className="key">
                UIN{" "}
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 250 }}
                  overlay={renderTooltip}
                >
                  <span>
                    {" "}
                    <BsQuestionCircle />
                  </span>
                </OverlayTrigger>
              </h5>
              <h5 className="value" onClick={() => copyToClipboard(props?.uin)}>
                {props?.uin}
              </h5>
            </div>
          )}
          <h4 className="nft-name">{props?.name}</h4>
          <ul className="nft-add-info">
            {props?.artist_name && (
              <li>
                <h5 className="key">Artist Name</h5>
                <h5 className="value">{props?.artist_name}</h5>
              </li>
            )}
            {props?.artist_age && (
              <li>
                <h5 className="key">Age</h5>
                <h5 className="value">{props?.artist_age}</h5>
              </li>
            )}
            <div className="pre-btnclss">
              {props?.payment_status == 'paid' ?
                <button
                  className="paid-btn"
                  disabled
                >Paid</button> :
                <button
                  className="prebook-btn"
                  onClick={handlePrice}

                >
                  {loading ? "Processing ..." : " Pre Book"}

                </button>
              }
            </div>
          </ul>
        </div>



        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment Method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* I will not close if you click outside me. Don't even try to press
          escape key. */}
            <CardDetailsFracto
              // price={amount}
              quantity={1}
              // amount_USD={amount_USD}
              OrderTotal={OrderTotal}
            />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}

          </Modal.Footer>
        </Modal>
      </article >
    </>
  );
};

export default NftCard;
