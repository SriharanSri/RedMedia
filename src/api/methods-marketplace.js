import marketplaceAxios from "./axios-utils-marketplace";

export const userOwnedNFTsApi = (page, filter) =>
  marketplaceAxios.get(`/users/owned?page=${page}`, {
    params: {
      filter,
    },
  });

export const userFavNFTsApi = (page) =>
  marketplaceAxios.get(`/users/faved?page=${page}`);

export const userActiveBidNFTsApi = (page) =>
  marketplaceAxios.get(`/users/active_bids?page=${page}`);

export const userOverBidNFTsApi = (page) =>
  marketplaceAxios.get(`/users/over_bids?page=${page}`);

export const userActivityYieldsApi = (page) =>
  marketplaceAxios.get(`/users/yield_histories?page=${page}`);

export const userNFTInvoiceApi = (slug) =>
  marketplaceAxios.get(`/users/order_invoice?order_detail_slug=${slug}`);

export const userBuyOrdersApi = (page, type) =>
  marketplaceAxios.get(`/users/buy_orders?page=${page}`, {
    params: {
      type,
    },
  });

export const userSellOrdersApi = (page, type) =>
  marketplaceAxios.get(`/users/sell_orders?page=${page}`, {
    params: {
      type,
    },
  });

export const getCartListApi = () =>
  marketplaceAxios.get(`/carts/cart_line_items`);
