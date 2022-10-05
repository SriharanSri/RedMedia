import { cashfreeProd, cashfreeSandbox } from "cashfree-dropjs";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { cashfreeOrderStatus, createCashfreeOrder } from "../../../api/methods";
import { currencyFormat, validateUIN, invokeGoogleEvent, gtag_event_types, debounceFactory } from "../../../utils/common";
import CardDetailsFracto from "../../card-details-fracto";
import Button from 'react-bootstrap/Button';
import { getPriceNft } from "../../../api/methods";
// import debounce from 'lodash/debounce'
import "./style.scss";
import useDebounce from "../../../hooks/useDebounce";

const NftBookingCard = ({
  title,
  imgSrc = "",
  type = "counter",
  data = {},
  fetchData = () => { },
}) => {
  const [quantity, setQuantity] = useState(0);
  const [uin, setUin] = useState("");
  const [Lable, setLable] = useState();
  // const [Carddetails, setCarddetailsModel] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amount_USD, setAmountUSD] = useState(0);
  // const amount = 500;
  const [UsdNetAmount, setUsdNetAmount] = useState(0);
  const [InrNetAmount, setInrNetAmount] = useState(0);

  const [InrTotal, setInrTotal] = useState(0);
  const [UsdTotal, setUsdTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCashfreeModal, setShowCashfreeModal] = useState(false);
  const cashfreeRef = useRef();
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handlePayment = () => setShow(true);

  useDebounce(() => {
    handlePrice()
    // console.log(quantity)
  }, 500, [quantity])


  const OrderTotal =
  {
    'service_charge': InrNetAmount,
    'total_amount': amount,
    'total_amount_usd': amount_USD,
    'service_charge_usd': UsdNetAmount,
    'total_inrnet_amount': InrTotal,
    'total_usdnet_amount': UsdTotal,
    'uin': uin,
  }


  const handleModalClose = () => {
    setUin("");
    setQuantity(0);
    setLoading(false);
    setShowCashfreeModal(false);
  };
  function toggleInput() {
    setToggle(false);
  }

  const onBlur = event => {

    setToggle(true);
    if (quantity == '') {
      setQuantity(0);
    }
  };

  function handleChange(event) {
    setQuantity(event.target.value);
  }
  const handlePreview = () => {
    if (!validateUIN(uin)) {
      invokeGoogleEvent("preview_uin", { eventLabel: 'failure' });
      toast.error("Please enter a valid UIN number");
      setAmount(0)
      return;
    }
    invokeGoogleEvent("preview_uin", { eventLabel: 'success' });
    fetchData(uin);
    setQuantity(1)
    handlePrice()
  };

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
        const quantityresponse = await getPriceNft({ 'quantity': 1 });
        // setAmount(quantityresponse?.data?.amount_in_inr)
        // setAmountUSD(quantityresponse?.data?.amount_in_usd)
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

  }

  const handlePayment = async () => {
    setShow(true)
  };

  const getCreateOrderRequest = () => {
    if (type === "counter") return { preorder: { quantity } };
    if (type === "preview" && uin) return { preorder: { uin } };
  };

  // const initiateCashFeePayment = (orderToken) => {
  //   let cashfree =
  //     process.env.REACT_APP_CASHFREE_PROD === "true"
  //       ? new cashfreeProd.Cashfree()
  //       : new cashfreeSandbox.Cashfree();

  //   cashfree.initialiseDropin(cashfreeRef.current, {
  //     orderToken,
  //     onSuccess: callbackSuccess,
  //     onFailure: callbackFailure,
  //     components: ["card", "order-details", "netbanking"],
  //     style: { color: "#000" },
  //   });
  // };

  const callbackSuccess = async (data) => {
    if (data.order && data.order.status === "PAID") {
      try {
        setShowCashfreeModal(false);
        let res = await cashfreeOrderStatus(data.order.orderId); //* check order status
        console.log(res?.data);
        if (res?.data?.status === 200)
          history.push("/order/success?type=pre-book");
      } catch (error) {
        toast.error("An unexpected error occured. Please try again ");
      }
      setLoading(false);
    }
  };
  const callbackFailure = (data) => {
    setLoading(false);
    if (data.order.status === "ACTIVE") {
      toast.error(
        "Please note that your payment was declined. We suggest that you check your credentials and try again."
      );
      handleModalClose();
    } else {
      toast.error(
        "Please note that your payment was declined. We suggest that you check your credentials and try again."
      );
    }
  };

  return (
    <article className="d-flex flex-column gap-3 prebook-card">
      <h2 className="card-title">{title}</h2>
      <div className="img-block">
        {imgSrc && (
          <img className="nft-image" src={data?.image_url || imgSrc}></img>
        )}
      </div>
      {type === "counter" && (
        <div className="d-flex gap-3 counter-box">
          <div className="d-flex flex-column pill-box">
            <p className="key-lable">Quantity</p>
            <div className="d-flex value-label">
              <span
                className="add-btn"
                onClick={() => {

                  setQuantity(quantity - 1 <= 0 ? 0 : quantity - 1)
                  // evntHandler()
                }}
              >
                -
              </span>

              {toggle ? (


                <p onClick={toggleInput}>{quantity}</p>

              ) : (

                <input className="edit-text" type="number" value={quantity} onChange={handleChange} onBlur={onBlur} />

              )}
              <span
                className="add-btn"
                onClick={() => {
                  setQuantity(parseInt(quantity) + parseInt(1))
                  // evntHandler(quantity)
                }
                }
              >
                +
              </span>

            </div>
          </div>
          <div className="d-flex flex-column pill-box">
            <p className="key-lable">Price</p>
            <p className="value-label">
              {currencyFormat(amount, "inr")}
            </p>
          </div>
        </div>
      )
      }
      {
        type === "preview" && (
          <div className="d-flex gap-3 preview-box">
            <div className="d-flex flex-column pill-box">
              <p className="key-lable">Enter UIN</p>
              <div className="d-flex flex-column value-label-inputbox">
                <input
                  type="text"
                  placeholder="12345678"
                  value={uin}
                  onChange={(e) => setUin(e.target.value)}
                ></input>
                <button className="preview-btn" onClick={handlePreview}>
                  PREVIEW
                </button>
              </div>
            </div>
            <div className="d-flex flex-column pill-box">
              <p className="key-lable">Price</p>
              <p className="value-label">
                {(uin && currencyFormat(amount, "inr")) || 0}
              </p>
            </div>
          </div>
        )
      }
      <button
        className="buy-btn"
        //  onClick={handlePayment}
        onClick={handlePayment}
        // onClick={() =>
        //   setCarddetailsModel(true)
        // }
        disabled={
          (type === "preview" && !amount) ||
          (type === "counter" && quantity === 0) ||
          loading
        }
      >
        {loading ? "Processing ..." : "BUY NOW"}
      </button>
      {/* <Modal show={showCashfreeModal} onHide={handleModalClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Cashfree Payment Gateway</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={cashfreeRef}></div>
        </Modal.Body>
      </Modal> */}
      {/* {Carddetails &&
        <CardDetailsFracto />
      } */}
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
            price={amount}
            quantity={quantity}
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
  );
};

export default NftBookingCard;
