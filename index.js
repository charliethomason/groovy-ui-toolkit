import { addComma, formatPhoneNum } from './utils/numericFormatters.js';
import { OtpInput } from './otpInput/otpInput.js';
import { DisplayTools } from './displayTools/displayTools.js';

const displayTools = new DisplayTools();
displayTools.useProgressBar();

let index = 0;
const progArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const updateProg = () => {
  if (index < progArr.length) {
    console.log('prog', progArr[index]);
    displayTools.updateProgressBar(progArr[index]);
    index++;
  } else {
    clearInterval(intervalId); // stop the interval when all elements have been processed
  }
};

const intervalId = setInterval(updateProg, 1000);

module.exports = {
  addComma,
  formatPhoneNum,
  OtpInput,
};
