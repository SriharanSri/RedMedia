import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiArrowLeft, FiPlusSquare } from "react-icons/fi";
import ContentLoader from "react-content-loader";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import CreditCardInput from "react-credit-card-input";
import { useHistory } from "react-router-dom";
import { detachFractoCardApi, createfractoPayment } from "../../api/methods";
import NewCardForm from "./../new-card-fracto";
import { BiX } from "react-icons/bi";
import BankCard from "./../bank-card-fracto";
import ToolTip from "../tooltip";
import { fetchFractoCardApi } from "./../../api/methods";
import fracto from "../../images/gems/fracto.svg";
import { currencyFormat, validateCurrency } from "./../../utils/common";
import { encryptMessage } from "./../../utils/common";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./style.scss";

const CardDetailsFracto = ({
  type,
  // amount_USD,
  OrderTotal,
  quantity,
  price,
  addFund,
  setAddFund,
  setPageNo,
  getTransactionHistory,
}) => {
  const { user } = useSelector((state) => state.user.data);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);
  const [cards, setCards] = useState([]);
  // const [card, setCard] = useState([]);
  const [amount, setAmount] = useState(price);
  const [TotalOrder, setUSD] = useState(OrderTotal);
  const [cvv, setCvv] = useState("");
  const [card, set_card] = useState({ number: "", exp: "", cvv: "" });
  const history = useHistory();
  const [cardValid, setCardValid] = useState({
    number: false,
    exp: false,
    cvv: false,
  });

  const [validation, setValidation] = useState({
    card_number: false,
    card_exp: false,
    card_cvv: false,

  });


  const checkValidation = () => {

    let c_validation = { ...validation };

    if (card.number) {
      if (cardValid.number) {
        c_validation = { ...c_validation, card_number: false };
      } else {
        c_validation = { ...c_validation, card_number: true };
      }
    } else {
      c_validation = { ...c_validation, card_number: true };
    }

    if (card.exp) {
      if (cardValid.exp) {
        c_validation = { ...c_validation, card_exp: false };
      } else {
        c_validation = { ...c_validation, card_exp: true };
      }
    } else {
      c_validation = { ...c_validation, card_exp: true };
    }

    if (card.cvv) {
      if (cardValid.cvv) {
        c_validation = { ...c_validation, card_cvv: false };
      } else {
        c_validation = { ...c_validation, card_cvv: true };
      }
    } else {
      c_validation = { ...c_validation, card_cvv: true };
    }




    setValidation(c_validation);
    if (
      !c_validation.card_number &&
      !c_validation.card_exp &&
      !c_validation.card_cvv &&
      !c_validation.card
    ) {
      return true;
    } else {
      return false;
    }
  }
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchAllCards();
  }, [trigger]);
  // console.log(card, 'card')
  const fetchAllCards = async () => {
    try {
      setGetLoading(true);
      const result = await fetchFractoCardApi();
      setCards(
        result.data.data.payment_methods.filter((obj) => obj.type === "card")
      );
      setGetLoading(false);
    } catch (err) {
      setGetLoading(false);
      console.log("🚀 ~ file: index.js ~ line 52 ~ fetchAllCards ~ err", err);
    }
  };


  const handlePayment = async () => {
    console.log(encryptMessage(card.number), 'card');
    // return false;
    if (checkValidation()) {

      if (cardValid) {
        if (
          TotalOrder.total_inrnet_amount &&
          parseFloat(TotalOrder.total_amount_usd) >= 1
          &&
          parseFloat(TotalOrder.total_amount_usd) <=
          parseFloat(process.env.REACT_APP_FRACTO_MAX_FUND)
        ) {
          try {
            setLoading(true);
            const result = await createfractoPayment(
              {
                'quantity': quantity,
                'ccnumber': encryptMessage(card.number),
                "ccexp": encryptMessage(card.exp.replace(" / ", "")),
                'cvv': encryptMessage(card.cvv),
                'uin': OrderTotal.uin,
              }
            );

            setLoading(false);
            toast.success(result.data.message);
            // setAddFund({ ...addFund, show: false });
            // setPageNo(1);
            // getTransactionHistory(1);
            // console.log(result.data.responsetext, 'result.data.responsetext')
            // console.log(result)
            if (result.data.data.responsetext == 'SUCCESS') {
              callbackSuccess()
            } else {
              callbackFailure()
            }


          } catch (error) {
            setLoading(false);
            toast.error(error.data.message);
            // toast.success(error.data.message);
            // toast.error(
            //   "Please note that your payment was declined either because your credentials were incorrect or you entered the same payment amount as your previous transaction. We suggest that you check your credentials or try funding your account with an amount other than your previous transaction."
            // );
            console.log(
              "🚀 ~ file: index.js ~ line 46 ~ handlePayment ~ error",
              error
            );
          }
        } else {
          setError(
            `Please enter the amount minimum of $${process.env.REACT_APP_FRACTO_MIN_FUND} and maximum of $${process.env.REACT_APP_FRACTO_MAX_FUND} `
          );
        }
      } else {
        setError("Please enter the CVV for the selected card");
      }

    }
  };
  const callbackSuccess = () => {

    if (type == 'drop') {
      history.push("/order/success?type=drop");
    } else {
      history.push("/order/success?type=pre-book");

    }
  }
  const callbackFailure = () => {
    setLoading(false);
    toast.error(
      "Please note that your payment was declined. We suggest that you check your credentials and try again."
    );
  }

  // const callbackSuccess = async (data) => {
  //   if (data.order && data.order.status === "PAID") {
  //     try {
  //       // setShowCashfreeModal(false);
  //       let res = await cashfreeOrderStatus(data.order.orderId); //* check order status
  //       console.log(res?.data);
  //       if (res?.data?.status === 200)
  //         history.push("/order/success?type=pre-book");
  //     } catch (error) {
  //       toast.error("An unexpected error occured. Please try again ");
  //     }
  //     setLoading(false);
  //   }
  // };
  // const callbackFailure = (data) => {
  //   setLoading(false);
  //   if (data.order.status === "ACTIVE") {
  //     toast.error(
  //       "Please note that your payment was declined. We suggest that you check your credentials and try again."
  //     );
  //     handleModalClose();
  //   } else {
  //     toast.error(
  //       "Please note that your payment was declined. We suggest that you check your credentials and try again."
  //     );
  //   }
  // };

  return (
    <>
      <div
        className="pay-list-back"
        role="button"
        onClick={() => setAddFund({ ...addFund, type: "" })}
      >
        {/* <FiArrowLeft size={25} /> Back */}
      </div>
      <div className="bg-white mt-3 p-3 current-balance">
        <div className="cb-title">Order Details:

        </div>
        <div>
          <div className="cb-balance">

            <div className="price-lb-section">

              <div className="price-lb-head">
                <div className="cb-title"> Unit Price</div>

                <div className="cb-title">Amount</div>

                <div className="cb-title">Service Charge</div>

              </div>
              <div className="price-lb-body">
                <div className="cb-title">
                  : {currencyFormat(TotalOrder.total_amount / quantity, user.currency_name || 'inr')}
                </div>
                <div className="cb-title">
                  : {currencyFormat(TotalOrder.total_amount, user.currency_name || 'inr')}
                </div>
                <div className="cb-title">
                  : {currencyFormat(TotalOrder.service_charge, user.currency_name || 'inr')}
                </div>

              </div>

            </div>

            <div className="cb-title">
            </div>


            <div className="cb-ordertotal-lb"> Order Total : {currencyFormat(TotalOrder.total_inrnet_amount, user.currency_name || 'inr')}
              <span className="cb_usd cb-ordertotal-lb"> ({currencyFormat(TotalOrder.total_usdnet_amount, 'USD')}) USD</span>
            </div>
          </div>
        </div>
      </div>


      {!modal && (
        <>
          <div className="mt-3 mb-3">

            <div className="d-flex justify-content-between ac-cc-title">
              Enter Card Details
            </div>
            <div className="new-card-container">
              <div className="row">
                <div className="col-12">
                  <div className="mb-2">
                    <CreditCardInput
                      onError={({ inputName }) => {
                        console.log(
                          "🚀 ~ file: index.js ~ line 289 ~ NewCardForm ~ inputName",
                          inputName
                        );
                        if (inputName === "cardNumber") {
                          setCardValid({ ...cardValid, number: false });
                        } else if (inputName === "cardExpiry") {
                          setCardValid({ ...cardValid, exp: false });
                        } else if (inputName === "cardCVC") {
                          setCardValid({ ...cardValid, cvv: false });
                        }
                      }}
                      cardNumberInputProps={{
                        value: card.number,
                        onChange: (value) => {
                          set_card({ ...card, number: value.target.value });
                          setCardValid({ ...cardValid, number: true });
                        },
                      }}
                      cardExpiryInputProps={{
                        value: card.exp,
                        onChange: (value) => {
                          set_card({ ...card, exp: value.target.value });
                          setCardValid({ ...cardValid, exp: true });
                        },
                      }}
                      cardCVCInputProps={{
                        value: card.cvv,
                        onChange: (value) => {
                          set_card({ ...card, cvv: value.target.value });
                          setCardValid({ ...cardValid, cvv: true });
                        },
                      }}
                      fieldClassName="input border"
                    />
                    {(validation.card_number ||
                      validation.card_exp ||
                      validation.card_cvv) && (
                        <label className="text-danger">
                          Please enter valid card details
                        </label>
                      )}
                  </div>
                </div>


                {error && (
                  <div className="col-12 mt-2">
                    <label className="text-danger">{error}</label>
                  </div>
                )}

                <div className="col-12 mt-2">

                </div>
              </div>
            </div>

          </div>
          {/* {error && (
            <div className="mb-3">
              <h6 className="text-danger mb-0">{error}</h6>
            </div>
          )} */}
          <div className="mb-4 text-center">
            <button
              disabled={loading}
              type="button"
              className="btn btn-dark w-100 rounded-pill btn-af-pay"
              onClick={handlePayment}
            >
              {loading ? "Processing please wait..." : "Pay"}
            </button>
            {/* <label className="loaded-info">
              You need to fund your GuardianLink wallet with a minimum of $
              {process.env.REACT_APP_FRACTO_MIN_FUND} and maximum of $
              {process.env.REACT_APP_FRACTO_MAX_FUND} per transaction
            </label> */}
          </div>
        </>
      )}
      <div className="mt-4 mb-4 p-3 rounded-3 border ">
        <p className="card-info">
          Your card may not have international transactions enabled. If your
          payment fails, please check with your bank to enable
          international/online transactions on your card and try again.
        </p>
        {/* <p className="card-info">
          When you make payments using your credit card/debit card, your payment
          is processed in equivalent USD, and you transact with Jump.trade.
        </p> */}
      </div>

      <div className="fracto-brand">
        Powered by
        <img src={fracto} />
      </div>
    </>
  );
};

export default CardDetailsFracto;

const CardLoader = (amount) => (
  <ContentLoader viewBox="0 0 100% 200" height={200} width={"100%"} {...amount}>
    <rect width="100%" height="180" max-height="180" />
  </ContentLoader>
);
