import otpAxios from "./axios-utils-otp";

export const sendOTP = (request) => otpAxios.post("/send_otp.php", request);
export const verifyOTP = (request) => otpAxios.post("/verify_otp.php", request);
export const resendOTP = (request) => otpAxios.post("/resend_otp.php", request);
