import { keycodes } from '../utils/keycodes.js';

export class OtpInput {
  constructor(inputQty = 6) {
    this.form = document.createElement('form');
    this.form.className = 'otp-form';
    this.inputQty = inputQty;
    this.inputs = [];
    this.hiddenInput = document.createElement('input');
    this.hiddenInput.type = 'hidden';
    this.hiddenInput.name = 'otp';
    this.otp = '';
    this.inputMatchesOtp = false;
  }

  getOtp() {
    return this.hiddenInput.value;
  }

  setOtp(otp) {
    this.otp = otp;
  }

  resetOtp() {
    this.hiddenInput.value = '';
    this.otp = '';
    this.inputs.forEach((input) => {
      input.value = '';
    });
  }

  createElements() {
    for (let i = 0; i < this.inputQty; i++) {
      const inputElem = document.createElement('input');
      inputElem.type = 'number';
      inputElem.className = 'otp-input';
      inputElem.maxLength = 1;
      inputElem.pattern = 'd*';
      inputElem.id = `otp-input-${i}`;
      this.form.appendChild(inputElem);
      this.inputs.push(inputElem);
    }
    document.body.appendChild(this.form);
    this.addEventListeners();
  }

  addEventListeners() {
    for (let i = 0; i < this.inputs.length; i++) {
      const currentInput = this.inputs[i];
      const inputLength = this.inputs.length;

      currentInput.addEventListener('input', () => {
        // for when user types in value one by one
        if (currentInput.value.length == 1 && i + 1 < inputLength) {
          this.inputs[i + 1].focus();
        }

        if (currentInput.value.length > 1) {
          // sanatize the input
          if (isNaN(currentInput.value)) {
            input.value = '';
            this.updateInput();
            return;
          }

          // for when user pastes in value
          // create an array of characters
          const chars = currentInput.value.split('');

          // loop through the array and assign each character to the input
          for (let pos = 0; pos < chars.length; pos++) {
            if (pos + i >= inputLength) break;

            let targetInput = this.inputs[pos + i];
            targetInput.value = chars[pos];
          }

          let focusIndex = Math.min(inputLength - 1, i + chars.length);
          this.inputs[focusIndex].focus();
        }
        this.updateInput();
      });

      currentInput.addEventListener('keydown', (e) => {
        if (
          e.keyCode === keycodes.backspace &&
          currentInput.value == '' &&
          i != 0
        ) {
          for (let pos = i; pos < inputLength - 1; pos++) {
            this.inputs[pos].value = this.inputs[pos + 1].value;
          }

          this.inputs[i - 1].value = '';
          this.inputs[i - 1].focus();
          this.updateInput();
          return;
        }

        if (e.keyCode === keycodes.delete && i !== inputLength - 1) {
          for (let pos = i; pos < inputLength - 1; pos++) {
            this.inputs[pos].value = this.inputs[pos + 1].value;
          }

          this.inputs[inputLength - 1].value = '';
          currentInput.select();
          e.preventDefault();
          this.updateInput();
          return;
        }

        if (e.keyCode === keycodes.left) {
          if (i > 0) {
            e.preventDefault();
            this.inputs[i - 1].focus();
            this.inputs[i - 1].select();
          }
          return;
        }

        if (e.keyCode === keycodes.right) {
          if (i + 1 < inputLength) {
            e.preventDefault();
            this.inputs[i + 1].focus();
            this.inputs[i + 1].select();
          }
          return;
        }
      });
    }
  }

  updateInput() {
    let inputValue = Array.from(this.inputs).reduce((otp, input) => {
      otp += input.value.length ? input.value : ' ';
      return otp;
    }, '');
    this.hiddenInput.value = inputValue;
    if (this.hiddenInput.value.length === this.inputQty) {
      this.checkForMatch();
    }
  }

  checkForMatch() {
    if (this.otp === this.hiddenInput.value) {
      this.inputMatchesOtp = true;
    } else {
      this.inputMatchesOtp = false;
    }
  }

  renderAndUse() {
    document.addEventListener('DOMContentLoaded', () => {
      this.createElements();
    });
  }
}
