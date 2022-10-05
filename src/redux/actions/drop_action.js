export const BUY_LOOT = "BUY_LOOT";
export const CLAIM_LOOT = "CLAIM_LOOT";

export const buy_loot = (payload) => {
  return (dispatch) => {
    dispatch({
      type: BUY_LOOT,
      payload,
    });
  };
};

export const claim_loot = (payload) => {
  return (dispatch) => {
    dispatch({
      type: CLAIM_LOOT,
      payload,
    });
  };
};
