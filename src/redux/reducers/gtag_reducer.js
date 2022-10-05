import { FIRE_EVENT } from "../actions/gtag_action";

const initState = "home";

const gtag_reducer = (state = initState, action) => {
  if (action.type === FIRE_EVENT) state = action.payload;
  return state;
};

export default gtag_reducer;
