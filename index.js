// const { addComma, formatPhoneNum } = require('./utils/numericFormatters.js');
// const { OtpInput } = require('./otpInput/otpInput.js');
import { addComma, formatPhoneNum } from './utils/numericFormatters.js';
import { OtpInput } from './otpInput/otpInput.js';

const otpInput = new OtpInput(6);

otpInput.renderAndUse();
otpInput.setOtp('123456');

module.exports = {
  addComma,
  formatPhoneNum,
  OtpInput,
};
