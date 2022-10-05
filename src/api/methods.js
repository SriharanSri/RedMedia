import { encryptMessage } from "../utils/common";
import axios from "./axios-utils";

export const registerApi = (props) =>
  axios.post("/register", { user: { ...props } });

export const uploadArtworkApi = (form) =>
  axios.post("/artworks", form, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  });

export const changePasswordApi = (props) =>
  axios.put("/change_password", { user: { ...props } });

export const signInApi = (props) => axios.post("/login", { ...props });

export const userApi = (token) =>
  axios.get("/users/me", { headers: { Authorization: token } });

export const getDeflationPercentage = () =>
  axios.get("/payments/ippopay/deflation_percentage");

export const showUserApi = (slug) => axios.get(`/users/${slug}`);

export const paymentStatusApi = (type) =>
  axios.get(`/users/payment_status?type=${type}`);

export const removeImage = (slug, type) =>
  axios.put(`/users/${slug}/remove_image?type=${type}`);

export const resendConfirmationApi = (email) =>
  axios.post(`/resend_confirmation`, { email });

export const userActivityApi = (page, filter) =>
  axios.get(`/users/activities?page=${page}&reasons=${JSON.stringify(filter)}`);

export const getUserTreasureBalance = () =>
  axios.get(`/users/treasure_balance`);

export const moveTreasureBalance = () => axios.post(`/users/treasure_redeem`);

export const signOutApi = () => axios.delete("/logout");

export const profileUpdateApi = ({ slug, data }) =>
  axios.put(`/users/${slug}`, data);

export const privateNFTApi = ({ data }) =>
  axios.put(`/users/private_nfts`, data);

export const confimationApi = (token) =>
  axios.get(`/confirm?confirmation_token=${token}`);

export const resetPasswordApi = (props) =>
  axios.put("/password", { user: { ...props } });

export const forgotPasswordApi = (email) =>
  axios.post(`/forgot_password`, { email });

export const attachCardApi = (id) =>
  axios.post("/payments/stripe/add_stripe_card", { payment_method_id: id });

export const kycExistingUserApi = (redirect_url, kyc, slug) =>
  axios.put(`/kyc/${slug}`, { redirect_url, kyc });

export const kycApi = (redirect_url, kyc) =>
  axios.post("/kyc", { redirect_url, kyc });

export const getUserKycDetails = (slug) => axios.get(`/kyc/${slug}`);

export const ippoCreateOrder = (amount) =>
  axios.post("/payments/ippopay/create_order", { amount });

export const createCashfreeOrder = (request = {}) =>
  axios.post("/preorders/orders", request);

export const cashfreeOrderStatus = (order_id) =>
  axios.put("/payments/cashfree/order_status", { order_id });

export const fireBlockFetchAddress = () =>
  axios.post("/payments/fireblock/fetch_address");

export const fireBlockRefresh = () => axios.post("/payments/fireblock/refresh");

export const ippoUpdateOrder = (order_id) =>
  axios.put("/payments/ippopay/order_status", { order_id });

export const detachCardApi = (id) =>
  axios.post("/payments/stripe/detach_stripe_card", { payment_method_id: id });

export const getNotificationApi = (page) =>
  axios.get(`/users/notifications?page=${page}`);

export const readNotificationApi = () => axios.post("/users/notification_read");

export const withdrawBalanceApi = () => axios.get("/users/withdraw_balance");

export const withdrawRequestApi = (input) => axios.post("/withdraws", input);

export const withdrawCancelApi = (id) => axios.put(`/withdraws/${id}/cancel`);

export const withdrawOTPApi = (input) =>
  axios.post("/withdraws/send_otp", input);

export const withdrawOTPVerifyApi = (input) =>
  axios.post("/withdraws/verify_otp", input);

export const resendOtpApi = (email) =>
  axios.post("/resend_email_otp", { email });

export const verifyOtpApi = (email, otp) =>
  axios.post("/verify_email", { email, otp });

export const chargeCardApi = (id, amount) =>
  axios.post("/payments/stripe/charge_stripe_card", {
    payment_method_id: id,
    amount,
  });

export const fetchCardApi = () =>
  axios.get("/payments/stripe/fetch_stripe_cards");

export const fetchPaymentHistory = (page, filter) =>
  axios.get(`/payments/history?page=${page}&type=${filter}`);

export const updateBanner = (slug, form) =>
  axios.put(`/users/${slug}/update_banner`, form, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  });

export const updateAvatar = (slug, form) =>
  axios.put(`/users/${slug}/update_avatar`, form, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  });

export const userOwnedNFTsApi = (page) =>
  axios.get(`/users/owned?page=${page}`);

export const userFavNFTsApi = (page) => axios.get(`/users/faved?page=${page}`);

export const userClaimNFTsApi = (page) =>
  axios.get(`/users/bid_activity_claims?page=${page}`);

export const userActiveBidNFTsApi = (page) =>
  axios.get(`/users/active_bids?page=${page}`);

export const userOverBidNFTsApi = (page) =>
  axios.get(`/users/over_bids?page=${page}`);

export const claimNFTApi = (props) => axios.post("/users/claim", props);

export const getlinkToken = () => axios.post("/payments/fracto/ach_start");

export const achPayment = (input) =>
  axios.post("/payments/fracto/ach_payment", input);

export const achVerify = (input) =>
  axios.post("/payments/fracto/ach_verify", input);

export const addCardFractoApi = (input) =>
  axios.post("/payments/fracto/add_card", {
    fracto: input,
  });

export const fetchFractoCardApi = () =>
  axios.get("/payments/fracto/fetch_payment_methods");

export const fetchFractoAchStatusApi = (txid) =>
  axios.get(`/payments/fracto/ach_status?txid=${txid}`);

export const ccFractoPayment = (id, amount, cvv) =>
  axios.post("/payments/fracto/cc_payment", {
    fracto: {
      paymentmethod_id: id,
      amount,
      cvv,
    },
  });

export const detachFractoCardApi = (id) =>
  axios.post("/payments/fracto/detach_card", { paymentmethod_id: id });

export const detachFractoACHApi = (id) =>
  axios.post("/payments/fracto/detach_ach_account", { paymentmethod_id: id });

export const getRAMPAddress = () => axios.get("/payments/ramp/fetch_address");

export const rampPurchaseCreate = (input) =>
  axios.post("/payments/ramp", input);

export const fractoCryptoPayment = (input) =>
  axios.post("/payments/fracto/crypto_payment", { amount: input });

export const trackIP = () => axios.get("https://geolocation-db.com/json/");

export const getServerTimeApi = () =>
  axios.get(
    `${process.env.REACT_APP_SERVER_URL.replace(
      "api/v1",
      ""
    )}/time?timestamp=${new Date().getTime()}`
  );

export const getUserRewardBalance = () => axios.get(`/user_rewards`);

export const moveRedeem = (slug) => axios.put(`/user_rewards/${slug}/redeem`);

export const preOrder = (slug) => axios.get(`/reserve_terms/${slug}`);

export const preOrderHistory = (slug) =>
  axios.get(`/reserve_terms/${slug}/reserved_nfts`);

export const preOrderReserve = (slug, quantity) =>
  axios.post(`reserve_terms/${slug}/reserved_nfts`, {
    reserved_nfts: {
      quantity,
    },
  });

export const getUserRewardBalanceList = () => axios.get(`/user_rewards/list`);

export const getUserCashbackBalanceList = () =>
  axios.get(`/user_rewards/cashback`);

export const addUserAccountCoupon = (coupon) =>
  axios.post("/user_rewards", {
    user_reward: {
      coupon,
    },
  });

export const signInWithGoogleApi = ({ token, ...rest }) =>
  axios.post(
    "/loginwithgoogle",
    { ...rest },
    { headers: { Authorization: token } }
  );

export const signInWithFacebookApi = ({ token, ...rest }) =>
  axios.post(
    "/loginwithfb",
    { ...rest },
    { headers: { Authorization: token } }
  );

export const getUserArtworks = () => axios.get(`/artworks`);

export const getArt = (artId) => axios.get(`/artworks/${artId}`);

export const sendOTP = (request) => axios.post("/oobedu/send_otp", request);
export const verifyOTP = (request) => axios.post("/oobedu/verify_otp", request);
export const verifyUpdateOTP = (request) =>
  axios.put("/update_mobile_number", request);
export const resendOTP = (request) => axios.post("/oobedu/resend_otp", request);
export const hubSpotContactApi = (email) =>
  axios.get(`/hubapi/profile`, {
    params: {
      email,
    },
  });

export const getShortListedArtwork = (request) =>
  axios.post("/artworks/shortlisted", request);

export const getPreOrderedArtworks = (status) =>
  axios.get(`/preorders/orders`, { params: { status } });

export const getShortlistedArt = () =>
  axios.get(`/artworks?filter=actual_shortlisted`);

export const getPriceNft = (quantity) =>
  axios.post("/preorders/fracto/order_info", quantity);

export const createfractoPayment = (preorder) =>
  axios.post("/preorders/fracto", { preorder });
