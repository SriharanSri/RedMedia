import axios from "axios";

export const hubSpotFormAxios = axios.create({
  baseURL: process.env.REACT_APP_HUBSPOT_FORMS_API_BASE_URL,
});

export const hubSpotApiAxios = axios.create({
  baseURL: process.env.REACT_APP_HUBSPOT_API_BASE_URL,
});

export const gaAxios = axios.create({
  baseURL: process.env.REACT_APP_GOOGLE_ANALYTICS_BASE_URL,
});
