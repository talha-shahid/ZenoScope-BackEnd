const crypto = require("crypto");
const hashService = require("./hash-service");

const smsId = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsId, smsAuthToken, { lazyLoading: true });

class OtpService {
  //---Generate OTP---//
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }
  //---Send OTP by SMS---//
  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your OTP is ${otp}`,
    });
  }
  //---Verify OTP---//
  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

module.exports = new OtpService();
