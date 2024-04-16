import { addComma } from './utils/numericFormatters.js';
import { OtpInput } from './otpInput/otpInput.js';

const OTPInput = new OtpInput(6);

document.addEventListener('DOMContentLoaded', () => {
  OTPInput.createElements();
});

module.exports = {
  addComma,
  OTPInput,
};
