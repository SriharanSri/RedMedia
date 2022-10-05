import cookie from "react-cookies";
import { hubSpotFormAxios, gaAxios } from "./axios-utils-hubspot";
import { hubSpotContactApi } from "./methods";
const relativeUrl = `/${process.env.REACT_APP_HUBSPOT_PORTAL_ID}/${process.env.REACT_APP_HUBSPOT_FORM_ID}`;

const schema = Object.freeze({
  first_name: {
    key: "firstname",
    defaultValue: false,
  },
  email: {
    key: "email",
    defaultValue: false,
  },
  phone_no: {
    key: "phone",
    defaultValue: false,
  },
  accepted_terms_and_condition: {
    key: "i_agree_with_terms_and_conditions",
    defaultValue: true,
  },
  gems_email_optin: {
    key: "gems_email_optin",
    defaultValue: false,
  },
  cid: {
    key: "cid",
    defaultValue: "API",
  },
});

const constructHubSpotRequest = async (request) => {
  const submittedAt = Date.now();
  let fields = [];

  for (const [name, { key, defaultValue }] of Object.entries(schema)) {
    if (defaultValue === "API") {
      let cid = cookie.load("_ga") ? cookie.load("_ga") : "";
      if (cid)
        fields = [...fields, { objectTypeId: "0-1", name: key, value: cid }];
    } else if (defaultValue) {
      fields = [
        ...fields,
        { objectTypeId: "0-1", name: key, value: defaultValue },
      ];
    } else
      fields = [
        ...fields,
        {
          objectTypeId: "0-1",
          name: key,
          value: request[name] || defaultValue,
        },
      ];
  }

  return {
    submittedAt,
    fields,
  };
};

const invokeHubspotContactApi = async (email) => {
  if (!email) return;
  try {
    let result = await hubSpotContactApi(email);
    if (result?.status === 200 && result?.data?.vid) {
      await gaAxios.get("/collect", {
        params: {
          v: "1",
          t: "event",
          tid: process.env.REACT_APP_GOOGLE_TID,
          cid:
            cookie.load("_ga").split(".").slice(2).join(".") ||
            cookie.load("_ga"),
          ec: "measurement+protocol",
          ea: "crm+data+injection",
          el: "lead-updated",
          cd3: result?.data?.vid,
        },
      });
    }
  } catch (error) {
    console.log("Error while invoking hubspot contacts API ", error);
  }
};

export const invokeHubspotAPI = async (request) => {
  console.log("Hubspot API invoked 🚀");
  let hubSpotRequest = await constructHubSpotRequest(request);
  try {
    let result = await hubSpotFormAxios.post(relativeUrl, hubSpotRequest);
    if (result?.status === 200) {
      await invokeHubspotContactApi(request?.email);
    }
  } catch (error) {
    console.log("Error while invoking hubspot forms API ", error);
  }
};
