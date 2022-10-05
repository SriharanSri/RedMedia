export const FIRE_EVENT = "FIRE_EVENT";

export const fire_gtag_event = (payload) => {
  return (dispatch) => {
    dispatch({
      type: FIRE_EVENT,
      payload,
    });
  };
};
