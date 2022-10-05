// import { CardElement } from "@stripe/react-stripe-js";
import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import JSEncrypt from "jsencrypt";

export const validateName = (name) => {
  const re =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  return re.test(name);
};

export const encryptMessage = (message) => {
  const publicKey = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCc4ymVnTGWE4lXnmUfM0PBVnV5
  0d2XH2jGWG+KfszarnjsGdFqNxMZGN+QzbXjnA1W7TOilLphWC8qFHZusBM80Ty1
  yMz+gf2c6Tbp5MTyB88S9JGjM+3Dlm3GGXOhdWTxwfpqndgERVpFkhJHj3l/qO6z
  TC2cXXVC7IDERpyGgQIDAQAB
  -----END PUBLIC KEY-----`;
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);

  return jsEncrypt.encrypt(message);
};

export const validateNameReplace = (input) =>
  input
    .replace("  ", " ")
    .replace("--", "-")
    .replace(",,", ",")
    .replace("..", ".")
    .replace("''", "'")
    .replace("-,", "-")
    .replace("-.", "-")
    .replace("-'", "-")
    .replace(",-", ",")
    .replace(",.", ",")
    .replace(",'", ",")
    .replace(".-", ".")
    .replace(".,", ".")
    .replace(".'", ".")
    .replace("'-", "'")
    .replace("',", "'")
    .replace("'.", "'");

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (mobile) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // eslint-disable-line
  return re.test(mobile);
};

export const validatePAN = (pan) => {
  const re = /^[a-zA-Z0-9]{0,10}$/; // eslint-disable-line
  return re.test(pan);
};

export const validateGSTIN = (gst) => {
  const re = /^[a-zA-Z0-9]{0,15}$/; // eslint-disable-line
  return re.test(gst);
};

export const validateNumber = (value) => {
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

export const validatePassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  const sp_re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return re.test(password) || sp_re.test(password);
};

export const validatePasswordMinimal = (password) => {
  return password && password.length >= 8;
};

export const validateURL = (url) => {
  const re =
    /^http(s?):\/\/(www\.)?(((\w+(([\.\-]{1}([a-z]{2,})+)+)(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*$)|(\w+((\.([a-z]{2,})+)+)(\:[0-9]{1,5}(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*$)))|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(([0-9]|([1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]+)+)(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*)((\:[0-9]{1,5}(\/[a-zA-Z0-9\_\=\?\&\.\#\-\W]*)*$)*))$/; // eslint-disable-line
  // /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  return re.test(url);
};

export const openWindow = (url) => {
  window.open(url, "_self");
};

export const openWindowBlank = (url) => {
  window.open(url, "_blank");
};

export const validateCurrency = (value) => {
  // const re = /^(\d*)\.?(\d){0,10}$/;
  const re = /^\d*\.?\d{0,2}$/;
  return re.test(value);
};

export const passwordLength = 6;

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#495057",
      fontWeight: "600",
      fontSize: ".9rem",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#495057",
      },
      "::placeholder": {
        color: "#495057",
      },
    },
    invalid: {
      iconColor: "#f46a6a",
      color: "#f46a6a",
    },
  },
};

export const CardField = ({ title, onChange, required }) => (
  <>
    <label>{title}</label>{" "}
    {required && <small className="text-danger font-10">(Required)</small>}
    <div
      className={`cardnumber_input bg-white p-2 rounded-3 border ${required ? "border-danger" : ""
        }`}
    >
      {/* <CardElement options={CARD_OPTIONS} onChange={onChange} /> */}
    </div>
  </>
);

export const crispStyle = {
  control: (prop) => ({
    ...prop,
    padding: "0 3px 0 8px",
    borderRadius: "3px",
    minHeight: "33px",
    fontSize: ".8rem",
    fontWeight: "bolder",
    borderColor: "#9c9c9b",
    "&:hover": {
      borderColor: "#9c9c9b",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.25rem #0d6efd40",
    },
  }),
  input: (prop) => ({
    ...prop,
    margin: 0,
    padding: 0,
  }),
  valueContainer: (prop) => ({
    ...prop,
    margin: 0,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    margin: 0,
    padding: 0,
    ...(data.color ? dot(data.color) : {}),
  }),

  dropdownIndicator: (prop) => ({
    ...prop,
    margin: 0,
    padding: "0 3px 0 0",
  }),
  indicatorsContainer: (prop) => ({
    ...prop,
    margin: 0,
    padding: 0,
  }),
  clearIndicator: (prop) => ({
    ...prop,
    margin: 0,
    padding: 0,
  }),
  indicatorSeparator: (prop) => ({
    ...prop,
    margin: "3px",
    padding: 0,
  }),
  noOptionsMessage: (prop) => ({
    ...prop,
    padding: 0,
    fontSize: "12px",
  }),
  option: (prop) => ({
    ...prop,
    padding: "8px",
    fontSize: "12px",
  }),
  menu: (prop) => ({
    ...prop,
    borderRadius: "3px",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999, top: base.top - 5 }),
};

export const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const validInternationalPhone = (input, country) => {
  return (
    isPossiblePhoneNumber(input, country) === true &&
    isValidPhoneNumber(input, country) === true &&
    validatePhoneNumberLength(input, country) === undefined
  );
};

export const currencyFormat = (value, type = "inr") => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: type,
  });
  return formatter.format(parseFloat(value ? value : 0));
};

export const feeCharges = [
  { network: "binance", fee: 2, min: "10", max: 1000000 },
  { network: "matic", fee: 2, min: "10", max: 1000000 },
  { network: "ethereum", fee: 35, min: "36", max: 1000000 },
];

export const roundDown = (number, decimals) => {
  decimals = decimals || 0;
  return Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const calculateTimeLeft = (input, cInput) => {
  var offset = new Date().getTimezoneOffset();
  var input_utc = new Date(input);
  input_utc.setMinutes(input_utc.getMinutes() - offset);

  let difference;
  if (cInput) {
    var cInput_utc = new Date(cInput);
    cInput_utc.setMinutes(cInput_utc.getMinutes() - offset);

    difference = +new Date(input_utc) - +new Date(cInput_utc);
  } else {
    var cInput_utc_1 = new Date();
    cInput_utc_1.setMinutes(cInput_utc_1.getMinutes() - offset);

    difference = +new Date(input_utc) - +new Date(cInput_utc_1);
  }

  var cInput_utc_2 = new Date();
  cInput_utc_2.setMinutes(cInput_utc_2.getMinutes() - offset);

  difference = +new Date(input_utc) - +new Date(cInput_utc_2);

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0.1,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export const validateQuantity = (value) => {
  const re = /^[1-9][0-9]*$/;
  return re.test(value);
};

export const detectWhatsapp = (uri) => {
  const onIE = () => {
    return new Promise((resolve) => {
      window.navigator.msLaunchUri(
        uri,
        () => resolve(true),
        () => resolve(false)
      );
    });
  };

  const notOnIE = () => {
    return new Promise((resolve) => {
      const a =
        document.getElementById("wapp-launcher") || document.createElement("a");
      a.id = "wapp-launcher";
      a.href = uri;
      a.style.display = "none";
      document.body.appendChild(a);

      const start = Date.now();
      const timeoutToken = setTimeout(() => {
        if (Date.now() - start > 1250) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);

      const handleBlur = () => {
        clearTimeout(timeoutToken);
        resolve(true);
      };
      window.addEventListener("blur", handleBlur);

      a.click();
    });
  };

  return window.navigator.msLaunchUri ? onIE() : notOnIE();
};

export const gtag_event_types = Object.freeze({
  reset: "reset",
  home: "home",
  signup: "signup",
  "signin/upload": "signup/upload",
  "signin/upload-facebook": "signup/upload-facebook",
  "signin/upload-google": "signup/upload-google",
  "signin/upload-login": "signup/upload-login",
  "signup-facebook": "signup-facebook",
  "signup-google": "signup-google",
  "signup-register": "signup-register",
  "ads-submit-otp": "ads-submit-otp",
  "ads-login-facebook": "ads-login-facebook",
  "ads-login-google": "ads-login-google",
});

export const googleEventDefaultOptions = Object.freeze({
  banner_swipe: {
    event: "customevent",
    eventName: "banner_swipe",
    eventCategory: "homepage",
    eventAction: "banner swipe",
    eventLabel: "right or left",
  },
  hamburger_click: {
    event: "customevent",
    eventName: "hamburger_click",
    eventCategory: "hamburger menu",
    eventAction: "click",
    eventLabel: undefined,
  },
  view_privacy_notice: {
    event: "customevent",
    eventName: "view_privacy_notice",
    eventCategory: "privacy notice",
    eventAction: "view click",
    eventLabel: undefined,
  },
  signup_click: {
    event: "customevent",
    eventName: "signup_click",
    eventCategory: "homepage",
    eventAction: "signup click",
    eventLabel: undefined,
  },
  user_reg_info_success: {
    event: "customevent",
    eventName: "user_reg_info_success",
    eventCategory: "user registration",
    eventAction: "personal info",
    eventLabel: "success",
    email: "",
    t_c: "",
    t_n: "",
  },
  user_reg_otp_success: {
    event: "customevent",
    eventName: "user_reg_otp_success",
    eventCategory: "user registration",
    eventAction: "",
    eventLabel: "success",
    email: "",
  },
  user_reg_otp_resend: {
    event: "customevent",
    eventName: "user_reg_otp_resend",
    eventCategory: "user registration",
    eventAction: "otp",
    eventLabel: "resend",
  },
  user_reg_info_error: {
    event: "customevent",
    eventName: "user_reg_info_error",
    eventCategory: "user registration",
    eventAction: "personal info error",
    eventLabel: "empty fields",
  },
  user_login: {
    event: "customevent",
    eventName: "user_login",
    eventCategory: "user login",
    eventAction: "",
    eventLabel: "click",
  },
  user_login_success: {
    event: "customevent",
    eventName: "user_login_success",
    eventCategory: "user login",
    eventAction: "",
    eventLabel: "success",
  },
  user_login_error: {
    event: "customevent",
    eventName: "user_login_error",
    eventCategory: "user login",
    eventAction: "",
    eventLabel: "failure",
  },
  profile_edit: {
    event: "customevent",
    eventName: "profile_edit",
    eventCategory: "user profile",
    eventAction: "",
    eventLabel: "click",
  },
  password_edit: {
    event: "customevent",
    eventName: "password_edit",
    eventCategory: "user profile",
    eventAction: "change password",
    eventLabel: "update",
  },
  user_profile_share: {
    event: "customevent",
    eventName: "user_profile_share",
    eventCategory: "user profile",
    eventAction: "share art",
    eventLabel: "facebook or twitter or whatsapp",
  },
  navigation_click: {
    event: "customevent",
    eventName: "navigation_click",
    eventCategory: "navigation menu",
    eventAction: "home or pre-book or drop or profile or sign out",
    eventLabel: "click",
  },
  upload_art_click: {
    event: "customevent",
    eventName: "upload_art_click",
    eventCategory: "homepage",
    eventAction: "upload art click",
    eventLabel: "logged in or non logged in",
  },
  upload_art_submit: {
    event: "customevent",
    eventName: "upload_art_submit",
    eventCategory: "upload art",
    eventAction: "",
    eventLabel: "",
  },
  upload_art_share: {
    event: "customevent",
    eventName: "upload_art_share",
    eventCategory: "upload art",
    eventAction: "share",
    eventLabel: "facebook or twitter or whatsapp",
  },
  parner_link_click: {
    event: "customevent",
    eventName: "parner_link_click",
    eventCategory: "homepage",
    eventAction: "tech partner or ngo partner",
    eventLabel: "click",
  },
  footer_click: {
    event: "customevent",
    eventName: "footer_click",
    eventCategory: "footer",
    eventAction:
      "home or support or facebook or instagram or youtube or faqs or privacy policy or t&c",
    eventLabel: "click",
  },

  prebook_buy_now_click: {
    event: "customevent",
    eventName: "prebook_buy_now_click",
    eventCategory: "prebook",
    eventAction: "",
    // eventLabel: "click",
  },
  preview_uin: {
    event: "customevent",
    eventName: "preview_uin",
    eventCategory: "prebook",
    eventAction: "preview uin",
    eventLabel: "",
  },
  buy_now_click: {
    event: "customevent",
    eventName: "buy_now_click",
    eventCategory: "drop",
    eventAction: "buy now click",
    eventLabel: "",
  },
  reveal_nft: {
    event: "customevent",
    eventName: "reveal_nft",
    eventCategory: "reveal nft",
    eventAction: "click",
    eventLabel: "",
  },
  view_prebooked_nfts: {
    event: "customevent",
    eventName: "view_prebooked_nfts",
    eventCategory: "prebook",
    eventAction: "",
    eventLabel: "",
  },
  prebook_another: {
    event: "customevent",
    eventName: "prebook_another",
    eventCategory: "prebook",
    eventAction: "",
    eventLabel: "",
  },

  buy_another: {
    event: "customevent",
    eventName: "buy_another",
    eventCategory: "drop",
    eventAction: "",
    eventLabel: "",
  },
  view_your_nfts: {
    event: "customevent",
    eventName: "view_your_nfts",
    eventCategory: "drop",
    eventAction: "",
    eventLabel: "",
  },

  user_profile_share: {
    event: "customevent",
    eventName: "user_profile_share",
    eventCategory: "prebook",
    eventAction: "buy now success",
    eventLabel: "",
  },

});

export const invokeGoogleEvent = (eventName, payload = {}) => {
  let eventOptions = {
    ...(googleEventDefaultOptions[eventName] || {}),
    ...payload,
  };

  if (Object.keys(eventOptions).length < 5) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventOptions);
};

export const initGoogleTagManager = () => {
  if (window.gtag_initialised === undefined)
    (function (w, d, s, l, i) {
      window.gtag_initialised = true;
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-THBLBGT");
};

export const validateUIN = (uin = "") => {
  let regex = /^[a-zA-Z0-9]*$/;
  return regex.test(uin) && uin.length >= 20;
};

export const DropNFTs = [
  {
    slug: "yjwlx2bimp4x6k90",
    name: "Test Art 1",
    uin: "4653060f024ead041891",
    artist_name: "Test 1",
    artist_age: 12,
    image_url:
      "https://beyondlife-stgac.s3.ap-south-1.amazonaws.com/bv7hecg3t27r0dsbwxr7ma3jw4sj?response-content-disposition=inline%3B%20filename%3D%22lspioi%22%3B%20filename%2A%3DUTF-8%27%27lspioi&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQBZHJSGBXI6T6BUZ%2F20220828%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220828T174852Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEA8ew78%2FZvrQlGHQwLAX%2BRKUpZpRpQVUHNLgKs4CcGbWoCIQClUGd9v8n%2FUXAe5B2Kt9QTrSeXGar8%2B%2Ffpy7o7%2BJVhTyrVBAgaEAEaDDAwMzg0MDUxMjM4NyIMgFAP7TfLfmcZe%2B%2BnKrIEnBZ9tQTzyCqhhnjyibX3T1LYUB1zUDgwWVpajni8WS6I4fxleH5PNYRLT%2BEm7FCajPLDG6hLGnnN%2FisOW%2Baqqmt1GQqSrbf0vBPOJQRyLBso84iZSdAuOlyHVW2jP6y7RcC7oOCg89MqzQNaXKS1ZaqDH%2FrhMEyI0U3quG2%2BJi0oAGO02iTDzBChw5NwntMS7vTMUw12rf5NMHXmfIu2SbiNhOZoz%2Bho6IngW%2BcStlYzPUGkdu4U3CWODZfdgjORMeGN7VH4Mql%2FoLkK5umd3LYfY26MZJxobwDUANuMcX0P5toNv%2BprC81CCyrN3QJ%2FA%2BtbBFqWdONM98kKzJ33ZnlxWePZRseprBquWBq%2BnmJ1kFvk%2BW9GyUbG5pW9R3f2fXvJ8JpY75v4YUx1wNaBvpmok0eHG2YXU3BBWZ0%2Bg1X8%2FPPIoOWRkF%2F7TzPCpKUWfNFCM0GWBR3q0u63cVMkN7mbJ0szFwIr9GWx9sHl63XuZ6jlPzM%2F8Gczsc0dShvLd9BwBw4e9Wl568nVul3Ed9bTb98OZlTP5xzHLHpA3CioR0bE9IeRWIosyg6%2FoNlPAEEu4wvkpA1Bs8LlsA%2BiF%2F3RugatZ05yPwrQfekZX4m5fKVB8j4a2MO%2FuvK6buzIGGfnMZVwCDLIab8vOVC0RritajvBz3Q%2FUsLKCkMAZDU8Em3VxFPD5Hy8lbWSz0%2Bo%2BuJqU97kXzbJ2NFJvTLbQuM41Sbud2phKkyp%2FVkWPnE5CTDGtq6YBjqpAYgqiz1Advo99UDQtD9BM36IVgh64tyhqDGcmRCuHwIft60kuGlQ7XAUS%2FeuVYTW49tzKKnQYzD%2Buldmx8Iip%2BbBbgZ6Zo7nQhjLX1eiiTZzpzGAJ4m8cQ0Ogt1oBgNDtB1FeF25jf%2BdJo%2Fu9a4rezvBb%2BOMLEkr07PbmDurlLTQ%2ByZ0neO%2Fm9AdAMuGefsHXUnfx9UIB9zTCA8LTaEz3EgJmOf%2BtqIn%2F1U%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=a29b5b287fd5b87aac7437d18aafb89ef6a9f45e2ed83d970b8a705a83ff8bd0",
    created_at: "2022-08-24T09:58:30.261Z",
    updated_at: "2022-08-24T09:58:30.313Z",
    amount: 1000,
    isClaimed: false,
    isBought: true,
  },
  {
    slug: "yjwlx2bimp4x6k90",
    name: "Test Art 2",
    uin: "4653060f024ead041891",
    artist_name: "Test 2",
    artist_age: 12,
    image_url:
      "https://beyondlife-stgac.s3.ap-south-1.amazonaws.com/bv7hecg3t27r0dsbwxr7ma3jw4sj?response-content-disposition=inline%3B%20filename%3D%22lspioi%22%3B%20filename%2A%3DUTF-8%27%27lspioi&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQBZHJSGBXI6T6BUZ%2F20220828%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220828T174852Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEA8ew78%2FZvrQlGHQwLAX%2BRKUpZpRpQVUHNLgKs4CcGbWoCIQClUGd9v8n%2FUXAe5B2Kt9QTrSeXGar8%2B%2Ffpy7o7%2BJVhTyrVBAgaEAEaDDAwMzg0MDUxMjM4NyIMgFAP7TfLfmcZe%2B%2BnKrIEnBZ9tQTzyCqhhnjyibX3T1LYUB1zUDgwWVpajni8WS6I4fxleH5PNYRLT%2BEm7FCajPLDG6hLGnnN%2FisOW%2Baqqmt1GQqSrbf0vBPOJQRyLBso84iZSdAuOlyHVW2jP6y7RcC7oOCg89MqzQNaXKS1ZaqDH%2FrhMEyI0U3quG2%2BJi0oAGO02iTDzBChw5NwntMS7vTMUw12rf5NMHXmfIu2SbiNhOZoz%2Bho6IngW%2BcStlYzPUGkdu4U3CWODZfdgjORMeGN7VH4Mql%2FoLkK5umd3LYfY26MZJxobwDUANuMcX0P5toNv%2BprC81CCyrN3QJ%2FA%2BtbBFqWdONM98kKzJ33ZnlxWePZRseprBquWBq%2BnmJ1kFvk%2BW9GyUbG5pW9R3f2fXvJ8JpY75v4YUx1wNaBvpmok0eHG2YXU3BBWZ0%2Bg1X8%2FPPIoOWRkF%2F7TzPCpKUWfNFCM0GWBR3q0u63cVMkN7mbJ0szFwIr9GWx9sHl63XuZ6jlPzM%2F8Gczsc0dShvLd9BwBw4e9Wl568nVul3Ed9bTb98OZlTP5xzHLHpA3CioR0bE9IeRWIosyg6%2FoNlPAEEu4wvkpA1Bs8LlsA%2BiF%2F3RugatZ05yPwrQfekZX4m5fKVB8j4a2MO%2FuvK6buzIGGfnMZVwCDLIab8vOVC0RritajvBz3Q%2FUsLKCkMAZDU8Em3VxFPD5Hy8lbWSz0%2Bo%2BuJqU97kXzbJ2NFJvTLbQuM41Sbud2phKkyp%2FVkWPnE5CTDGtq6YBjqpAYgqiz1Advo99UDQtD9BM36IVgh64tyhqDGcmRCuHwIft60kuGlQ7XAUS%2FeuVYTW49tzKKnQYzD%2Buldmx8Iip%2BbBbgZ6Zo7nQhjLX1eiiTZzpzGAJ4m8cQ0Ogt1oBgNDtB1FeF25jf%2BdJo%2Fu9a4rezvBb%2BOMLEkr07PbmDurlLTQ%2ByZ0neO%2Fm9AdAMuGefsHXUnfx9UIB9zTCA8LTaEz3EgJmOf%2BtqIn%2F1U%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=a29b5b287fd5b87aac7437d18aafb89ef6a9f45e2ed83d970b8a705a83ff8bd0",
    created_at: "2022-08-24T09:58:30.261Z",
    updated_at: "2022-08-24T09:58:30.313Z",
    amount: 1000,
    isClaimed: false,
    isBought: false,
  },
  {
    slug: "yjwlx2bimp4x6k90",
    name: "Test Art 3",
    uin: "4653060f024ead041891",
    artist_name: "Test 3",
    artist_age: 12,
    image_url:
      "https://beyondlife-stgac.s3.ap-south-1.amazonaws.com/bv7hecg3t27r0dsbwxr7ma3jw4sj?response-content-disposition=inline%3B%20filename%3D%22lspioi%22%3B%20filename%2A%3DUTF-8%27%27lspioi&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQBZHJSGBXI6T6BUZ%2F20220828%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220828T174852Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEA8ew78%2FZvrQlGHQwLAX%2BRKUpZpRpQVUHNLgKs4CcGbWoCIQClUGd9v8n%2FUXAe5B2Kt9QTrSeXGar8%2B%2Ffpy7o7%2BJVhTyrVBAgaEAEaDDAwMzg0MDUxMjM4NyIMgFAP7TfLfmcZe%2B%2BnKrIEnBZ9tQTzyCqhhnjyibX3T1LYUB1zUDgwWVpajni8WS6I4fxleH5PNYRLT%2BEm7FCajPLDG6hLGnnN%2FisOW%2Baqqmt1GQqSrbf0vBPOJQRyLBso84iZSdAuOlyHVW2jP6y7RcC7oOCg89MqzQNaXKS1ZaqDH%2FrhMEyI0U3quG2%2BJi0oAGO02iTDzBChw5NwntMS7vTMUw12rf5NMHXmfIu2SbiNhOZoz%2Bho6IngW%2BcStlYzPUGkdu4U3CWODZfdgjORMeGN7VH4Mql%2FoLkK5umd3LYfY26MZJxobwDUANuMcX0P5toNv%2BprC81CCyrN3QJ%2FA%2BtbBFqWdONM98kKzJ33ZnlxWePZRseprBquWBq%2BnmJ1kFvk%2BW9GyUbG5pW9R3f2fXvJ8JpY75v4YUx1wNaBvpmok0eHG2YXU3BBWZ0%2Bg1X8%2FPPIoOWRkF%2F7TzPCpKUWfNFCM0GWBR3q0u63cVMkN7mbJ0szFwIr9GWx9sHl63XuZ6jlPzM%2F8Gczsc0dShvLd9BwBw4e9Wl568nVul3Ed9bTb98OZlTP5xzHLHpA3CioR0bE9IeRWIosyg6%2FoNlPAEEu4wvkpA1Bs8LlsA%2BiF%2F3RugatZ05yPwrQfekZX4m5fKVB8j4a2MO%2FuvK6buzIGGfnMZVwCDLIab8vOVC0RritajvBz3Q%2FUsLKCkMAZDU8Em3VxFPD5Hy8lbWSz0%2Bo%2BuJqU97kXzbJ2NFJvTLbQuM41Sbud2phKkyp%2FVkWPnE5CTDGtq6YBjqpAYgqiz1Advo99UDQtD9BM36IVgh64tyhqDGcmRCuHwIft60kuGlQ7XAUS%2FeuVYTW49tzKKnQYzD%2Buldmx8Iip%2BbBbgZ6Zo7nQhjLX1eiiTZzpzGAJ4m8cQ0Ogt1oBgNDtB1FeF25jf%2BdJo%2Fu9a4rezvBb%2BOMLEkr07PbmDurlLTQ%2ByZ0neO%2Fm9AdAMuGefsHXUnfx9UIB9zTCA8LTaEz3EgJmOf%2BtqIn%2F1U%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=a29b5b287fd5b87aac7437d18aafb89ef6a9f45e2ed83d970b8a705a83ff8bd0",
    created_at: "2022-08-24T09:58:30.261Z",
    updated_at: "2022-08-24T09:58:30.313Z",
    amount: 1000,
    isClaimed: false,
    isBought: false,
  },
  {
    slug: "yjwlx2bimp4x6k90",
    name: "Test Art 4",
    uin: "4653060f024ead041891",
    artist_name: "Test 4",
    artist_age: 12,
    image_url:
      "https://beyondlife-stgac.s3.ap-south-1.amazonaws.com/bv7hecg3t27r0dsbwxr7ma3jw4sj?response-content-disposition=inline%3B%20filename%3D%22lspioi%22%3B%20filename%2A%3DUTF-8%27%27lspioi&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQBZHJSGBXI6T6BUZ%2F20220828%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220828T174852Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEA8ew78%2FZvrQlGHQwLAX%2BRKUpZpRpQVUHNLgKs4CcGbWoCIQClUGd9v8n%2FUXAe5B2Kt9QTrSeXGar8%2B%2Ffpy7o7%2BJVhTyrVBAgaEAEaDDAwMzg0MDUxMjM4NyIMgFAP7TfLfmcZe%2B%2BnKrIEnBZ9tQTzyCqhhnjyibX3T1LYUB1zUDgwWVpajni8WS6I4fxleH5PNYRLT%2BEm7FCajPLDG6hLGnnN%2FisOW%2Baqqmt1GQqSrbf0vBPOJQRyLBso84iZSdAuOlyHVW2jP6y7RcC7oOCg89MqzQNaXKS1ZaqDH%2FrhMEyI0U3quG2%2BJi0oAGO02iTDzBChw5NwntMS7vTMUw12rf5NMHXmfIu2SbiNhOZoz%2Bho6IngW%2BcStlYzPUGkdu4U3CWODZfdgjORMeGN7VH4Mql%2FoLkK5umd3LYfY26MZJxobwDUANuMcX0P5toNv%2BprC81CCyrN3QJ%2FA%2BtbBFqWdONM98kKzJ33ZnlxWePZRseprBquWBq%2BnmJ1kFvk%2BW9GyUbG5pW9R3f2fXvJ8JpY75v4YUx1wNaBvpmok0eHG2YXU3BBWZ0%2Bg1X8%2FPPIoOWRkF%2F7TzPCpKUWfNFCM0GWBR3q0u63cVMkN7mbJ0szFwIr9GWx9sHl63XuZ6jlPzM%2F8Gczsc0dShvLd9BwBw4e9Wl568nVul3Ed9bTb98OZlTP5xzHLHpA3CioR0bE9IeRWIosyg6%2FoNlPAEEu4wvkpA1Bs8LlsA%2BiF%2F3RugatZ05yPwrQfekZX4m5fKVB8j4a2MO%2FuvK6buzIGGfnMZVwCDLIab8vOVC0RritajvBz3Q%2FUsLKCkMAZDU8Em3VxFPD5Hy8lbWSz0%2Bo%2BuJqU97kXzbJ2NFJvTLbQuM41Sbud2phKkyp%2FVkWPnE5CTDGtq6YBjqpAYgqiz1Advo99UDQtD9BM36IVgh64tyhqDGcmRCuHwIft60kuGlQ7XAUS%2FeuVYTW49tzKKnQYzD%2Buldmx8Iip%2BbBbgZ6Zo7nQhjLX1eiiTZzpzGAJ4m8cQ0Ogt1oBgNDtB1FeF25jf%2BdJo%2Fu9a4rezvBb%2BOMLEkr07PbmDurlLTQ%2ByZ0neO%2Fm9AdAMuGefsHXUnfx9UIB9zTCA8LTaEz3EgJmOf%2BtqIn%2F1U%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=a29b5b287fd5b87aac7437d18aafb89ef6a9f45e2ed83d970b8a705a83ff8bd0",
    created_at: "2022-08-24T09:58:30.261Z",
    updated_at: "2022-08-24T09:58:30.313Z",
    amount: 1000,
    isClaimed: false,
  },
];

export function debounceFactory(fn, delay = 1000) {
  let timer;
  return (...args) => {
    console.log(timer);
    clearTimeout(timer);
    timer = setTimeout(() => { fn.apply(this, args) }, delay)
  }
}