import { combineReducers } from "redux";
import user_reducer from "./user_reducer";
import lang_reducer from "./lang_reducer";
import user_cart_reducer from "./user_cart_reducer";
import gtag_reducer from "./gtag_reducer";
import drop_reducer from "./drop_reducer";

const rootReducer = combineReducers({
  lang: lang_reducer,
  user: user_reducer,
  cart: user_cart_reducer,
  gtag: gtag_reducer,
  drop: drop_reducer,
});

export default rootReducer;
