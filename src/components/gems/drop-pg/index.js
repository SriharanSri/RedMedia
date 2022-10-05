import { useRef, useState } from "react";
import GemsLogo from "../../../images/gems/hero-pg-logo.svg";
import GemsDropAnimation from "../../../images/gems/gems_drop_animation.mp4";
import GemsDropAnimationBG from "../../../images/gems/gems_drop_animation_bg.mp4";
import GemsDropAnimationMobileBG from "../../../images/gems/gems_drop_animation_mobile_bg.mp4";
import GemsDropAnimation_2 from "../../../images/gems/gems_drop_animation_2.gif";
//import GemsDropAnimationglow from "../../../images/gems/Gems_new loop.gif";
import "./style.scss";
import { cashfreeOrderStatus, createCashfreeOrder } from "../../../api/methods";
import { cashfreeProd, cashfreeSandbox } from "cashfree-dropjs";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buy_loot } from "../../../redux/actions/drop_action";
import { currencyFormat, invokeGoogleEvent } from "../../../utils/common";
import { Modal } from "react-bootstrap";
import CardDetailsFracto from "../../card-details-fracto";
import { getPriceNft } from "../../../api/methods";
import useDebounce from "../../../hooks/useDebounce";

const DropPg = ({ premium = false }) => {
  const [quantity, setQuantity] = useState(0);
  const [showCashfreeModal, setShowCashfreeModal] = useState(false);
  const cashfreeRef = useRef();
  const [amount, setAmount] = useState(0);
  const [amount_USD, setAmountUSD] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const dropState = useSelector((state) => state.drop);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    setQuantity(0);
    setShowCashfreeModal(false);
  };
  const [toggle, setToggle] = useState(true);

  const handleModel = async () => {
    setShow(true)
  };

  useDebounce(() => {
    handlePrice()
    // console.log(quantity)
  }, 500, [quantity])

  const handlePrice = async () => {

    try {
      const quantityresponse = await getPriceNft({ 'quantity': quantity });

      setAmount(quantityresponse?.data?.amount_in_inr)
      setAmountUSD(quantityresponse?.data?.amount_in_usd)

    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.message || "Please try again after sometime.");
      console.log("Please try again after sometimer");
    }



  }

  const handlePayment = async () => {
    try {
      let request = {
        preorder: {
          quantity,
        },
      };
      const response = await createCashfreeOrder(request); //* create Cashfree order
      console.log(response)
      invokeGoogleEvent("buy_now_click", {
        eventLabel: 'NFT',
        startDate: '20.07.2022',
        quantity: response?.data?.data?.quantity,
        eventAction: "buy now click",
        price: response?.data?.data?.amount,
      });
      setShowCashfreeModal(true);
      initiateCashFeePayment(response.data.data.order_token);
    } catch (error) {
      toast.error(error?.data?.message || "Please try again after sometime.");
      console.log("Error in creating cashfree order");
    }
  };
  const initiateCashFeePayment = (orderToken) => {
    let cashfree =
      process.env.REACT_APP_CASHFREE_PROD === "true"
        ? new cashfreeProd.Cashfree()
        : new cashfreeSandbox.Cashfree();

    cashfree.initialiseDropin(cashfreeRef.current, {
      orderToken,
      onSuccess: callbackSuccess,
      onFailure: callbackFailure,
      components: ["card", "order-details", "netbanking"],
      style: { color: "#000" },
    });
  };

  const callbackSuccess = async (data) => {
    if (data.order && data.order.status === "PAID") {
      try {
        setShowCashfreeModal(false);
        let res = await cashfreeOrderStatus(data.order.orderId); //* check order status
        if (res?.data?.status === 200) {
          dispatch(buy_loot({ quantity }));
          history.push("/order/success?type=drop");
        }
      } catch (error) {
        toast.error("An unexpected error occured. Please try again ");
      }
    }
  };
  const callbackFailure = (data) => {
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

  function toggleInput() {
    setToggle(false);
  }
  const onBlur = (event) => {
    setToggle(true);
    if (quantity == "") {
      setQuantity(0);
    }
  };

  function handleChange(event) {
    setQuantity(event.target.value);
  }
  return (
    <>
      <div className="drop-container">
        {premium && (
          <div className="premium-tag">
            <h5>Premium</h5>
          </div>
        )}
        <video
          className="fordesktop"
          loop
          muted="muted"
          autoPlay
          playsInline
        // className="first-image"
        >
          <source src={GemsDropAnimationBG} type="video/mp4" />
        </video>
        <video
          className="formobile_bg"
          loop
          muted="muted"
          autoPlay
          playsInline
        // className="first-image"
        >
          <source src={GemsDropAnimationMobileBG} type="video/mp4" />
        </video>

        <div className="drop-box-image">
          {/* <img
            src={premium ? GemsDropAnimation_2 : GemsDropAnimation}
            alt="loot image"
          ></img> */}

          <video
            className="formobile"
            loop
            muted="muted"
            autoPlay
            playsInline
          // className="first-image"
          >
            <source src={GemsDropAnimation} type="video/mp4" />
          </video>

          <button className="buy-btn"
            disabled
            onClick={handleModel}>
            Buy Now
          </button>
        </div>
        <div className="drop-box-content">
          <div className="drop-box-badge">
            <div className="loot-badge">
              <img src={GemsLogo} alt="loot image"></img>
              <p>Loot Box</p>
            </div>
            {premium ? (
              <p className="premium-font">
                Consequat non velit velit commodo anim laboris cillum. Anim est
                magna ut nulla non et nisi cupidatat pariatur esse cillum quis
                eu. Adipisicing ipsum aliqua ipsum voluptate exercitation ea.
                Sit id consectetur irure ad incididunt ipsum sit dolore ea
                aliqua amet ullamco qui.
              </p>
            ) : (
              <p>
                Consequat non velit velit commodo anim laboris cillum. Anim est
                magna ut nulla non et nisi cupidatat pariatur esse cillum quis
                eu. Adipisicing ipsum aliqua ipsum voluptate exercitation ea.
                Sit id consectetur irure ad incididunt ipsum sit dolore ea
                aliqua amet ullamco qui.
              </p>
            )}
          </div>

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
                {/* {toggle ? (
                  <div>
                <span
                  className="add-btn"
                  onClick={() =>
                    setQuantity(quantity - 1 <= 1 ? 1 : quantity - 1)
                  }
                >
                  -
                </span>
                <p onDoubleClick={toggleInput}>{quantity}</p>
                 <span
                 className="add-btn"
                 onClick={() => setQuantity(quantity + 1)}
               >
                 +
               </span></div>):(
                <input className="" type="number" value={quantity} onChange={handleChange}   onBlur={onBlur}  />
                )} */}
                <span
                  className="add-btn"
                  onClick={() =>
                    setQuantity(quantity - 1 <= 0 ? 0 : quantity - 1)
                  }
                >
                  -
                </span>
                {toggle ? (
                  <>
                    <p className="edit-text" onClick={toggleInput}>{quantity}</p>
                  </>
                ) : (
                  <>
                    <input
                      className="edit-text"
                      type="number"
                      value={quantity}
                      onChange={handleChange}
                      onBlur={onBlur}
                    />
                  </>
                )}
                <span
                  className="add-btn"
                  onClick={() => setQuantity(parseInt(quantity) + parseInt(1))}
                >
                  +
                </span>
              </div>
            </div>
          </div>
          <div className="price-badge">
            <p>
              Price {` `}
              <span>{currencyFormat(amount, "inr")}</span>
            </p>
          </div>
        </div>
      </div>
      {/* <Modal show={showCashfreeModal} onHide={handleModalClose} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Cashfree Payment Gateway</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={cashfreeRef}></div>
        </Modal.Body>
      </Modal> */}
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
            amount_USD={amount_USD}
            type={'drop'}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DropPg;
