import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, connect, useDispatch } from "react-redux";
import { change_lang_action } from "./redux/actions/lang_action";
import { setLanguage } from "react-multi-lang";
import dayjs from "dayjs";
import { FaTimes } from "react-icons/fa";

import { getCookies } from "./utils/cookies";
import { getServerTimeApi } from "./api/methods";
import {
  user_load_by_token_thunk,
  user_logout_thunk,
} from "./redux/thunk/user_thunk";

import "./App.css";

const ForgotPassword = lazy(() => import("./pages/forgot-password"));
const NotFound = lazy(() => import("./pages/not-found"));
const Navigate = lazy(() => import("./pages/navigate"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Confirmation = lazy(() => import("./pages/confirmation"));
const ResetPassword = lazy(() => import("./pages/reset-password"));
const Accounts = lazy(() => import("./pages/accounts"));
const RegisterSuccess = lazy(() => import("./pages/register-success"));
const HomePage = lazy(() => import("./pages/gems/home-page"));
const Upload = lazy(() => import("./pages/gems/Upload"));
const Terms = lazy(() => import("./pages/gems/terms-and-conditions"));
const Art = lazy(() => import("./pages/gems/art"));
const Faq = lazy(() => import("./pages/gems/faq"));
const Privacy = lazy(() => import("./pages/gems/privacy-policy"));
const PreBook = lazy(() => import("./pages/gems/pre-book"));
const PreBookSuccess = lazy(() => import("./pages/gems/pre-book-success"));
const Drop = lazy(() => import("./pages/gems/drop"));

function App(props) {
  const dispatch = useDispatch();
  const [online, setOnline] = useState(true);
  const [diffTimer, setDiffTimer] = useState(false);
  const [diffTimerSeconds, setDiffTimerSeconds] = useState(0);

  const { lang, user } = useSelector((state) => state);

  useEffect(() => {
    props.change_lang(lang);
    setLanguage(lang);
  }, [props, lang]);

  const secondsToDhms = (info) => {
    let seconds = info > 0 ? info : -1 * info;

    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";

    var result =
      info > 0
        ? dDisplay + hDisplay + mDisplay + sDisplay
        : "-" + dDisplay + hDisplay + mDisplay + sDisplay;
    return result;
  };

  const checkSystemTimer = (input) => {
    const date1 = dayjs(input);

    const date2 = dayjs();

    let seconds = date2.diff(date1, "seconds");

    setDiffTimerSeconds(seconds);

    if (seconds >= 10 || seconds <= -10) {
      setDiffTimer(true);
    } else {
      setDiffTimer(false);
    }
  };

  const getServerTime = async () => {
    try {
      const result = await getServerTimeApi();
      checkSystemTimer(result.data.data.time);
    } catch (error) {
      console.log("🚀 ~ file: App.js ~ line 48 ~ getServerTime ~ error", error);
    }
  };

  useEffect(() => {
    const token = getCookies();
    if (token) dispatch(user_load_by_token_thunk(token));

    if (user?.data?.user && !token) dispatch(user_logout_thunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("online", (event) => {
      setOnline(navigator.onLine);
    });
    window.addEventListener("offline", (event) => {
      setOnline(navigator.onLine);
    });
    getServerTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!online && (
        <div className="offline-ribbon">
          <div className="first">
            You are offline, please check you internet connection
          </div>
          <div>
            <FaTimes onClick={() => setOnline(true)} role={"button"} />
          </div>
        </div>
      )}

      {diffTimer && (
        <div className="offline-ribbon">
          <div className="first">
            Your system time does not match with the Internet time (
            {secondsToDhms(diffTimerSeconds)} difference). Please sync your
            system time with the Internet time to have a flawless experience,
          </div>
          <div>
            <FaTimes onClick={() => setDiffTimer(false)} role={"button"} />
          </div>
        </div>
      )}

      <div className="top-loader"></div>
      <div className="whole-content">
        <Router basename="/">
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Switch>
              {/* <Route exact path="/drop" component={Drop} ></Route> */}
              <Route exact path="/drop"  ></Route>
              <Route
                exact
                path="/order/success"
                component={PreBookSuccess}
              ></Route>
              <Route exact path="/pre-book" component={PreBook}></Route>
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/password" component={ResetPassword} />
              <Route exact path="/terms-and-conditions" component={Terms} />
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/privacy-policy" component={Privacy} />
              <Route
                exact
                path="/signup/success/:source?"
                component={RegisterSuccess}
              />
              <Route exact path="/signup/:source?" component={Register} />
              <PrivateRoute
                exact
                path="/upload-your-artwork"
                component={Upload}
              />
              <Route exact path="/signin/:source?" component={Login} />
              <Route exact path="/art/:artId" component={Art} />
              <PrivateRoute
                exact
                path="/accounts/:page?"
                component={Accounts}
              />
              <Route exact path="/" component={HomePage} />

              <Route path="/not-found" component={NotFound} />
              <Route exact component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_lang: (input) => {
      dispatch(change_lang_action(input));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const token = getCookies();

  useEffect(() => {
    if (!token) {
      dispatch(user_logout_thunk());
    }
  }, [dispatch, token]);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.login ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin/upload", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
