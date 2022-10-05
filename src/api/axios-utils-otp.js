import axios from "axios";

const otpAxios = axios.create({
  baseURL: process.env.REACT_APP_OTP_BASE_URL,
});

export default otpAxios;
