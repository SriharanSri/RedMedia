import { Helmet } from "react-helmet";

const GtagHelmet = ({ type }) => {
  let helmet = () => <></>;

  switch (type) {
    case "reset":
      helmet = <></>;
      break;
    case "home":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve0+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve00+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup/upload":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve003+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve003;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup/upload-facebook":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve005+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve005;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup/upload-google":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve006+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve006;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup/upload-login":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve004+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup-facebook":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve001+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup-google":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve002+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "signup-register":
      helmet = (
        <Helmet>
          <script>
            {window.gtag("event", "conversion", {
              allow_custom_scripts: true,
              send_to: "DC-9240454/gems-gua/conve000+standard",
            })}
          </script>
          <img
            src="https://ad.doubleclick.net/ddm/activity/src=9240454;type=gems-gua;cat=conve000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?"
            width="1"
            height="1"
            alt=""
          />
        </Helmet>
      );
      break;
    case "ads-submit-otp":
      helmet = (
        <Helmet>
          <script>
            {(function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof url != "undefined") {
                  window.location = url;
                }
              };
              window.gtag("event", "conversion", {
                send_to: "AW-10936175805/ox1rCI-8u8kDEL2Z494o",
                event_callback: callback,
              });
              return false;
            })()}
          </script>
        </Helmet>
      );
      break;
    case "ads-login-facebook":
      helmet = (
        <Helmet>
          <script>
            {(function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof url != "undefined") {
                  window.location = url;
                }
              };
              window.gtag("event", "conversion", {
                send_to: "AW-10936175805/3INtCIH5wMkDEL2Z494o",
                event_callback: callback,
              });
              return false;
            })()}
          </script>
        </Helmet>
      );
      break;
    case "ads-login-google":
      helmet = (
        <Helmet>
          <script>
            {(function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof url != "undefined") {
                  window.location = url;
                }
              };
              window.gtag("event", "conversion", {
                send_to: "AW-10936175805/xGOFCOjyjckDEL2Z494o",
                event_callback: callback,
              });
              return false;
            })()}
          </script>
        </Helmet>
      );
      break;
  }

  return helmet;
};

export default GtagHelmet;
