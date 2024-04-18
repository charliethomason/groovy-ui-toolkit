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
    OtpInput.addEventListeners(this);
  }

  static addEventListeners(instance) {
    for (let i = 0; i < instance.inputs.length; i++) {
      const currentInput = instance.inputs[i];
      const inputLength = instance.inputs.length;

      currentInput.addEventListener('input', () => {
        // for when user types in value one by one
        if (currentInput.value.length === 1 && i + 1 < inputLength) {
          instance.inputs[i + 1].focus();
        }
        // for when user pastes in value
        if (currentInput.value.length > 1) {
          OtpInput.handlePaste(instance, currentInput, i);
        }
        OtpInput.updateInput(instance);
      });

      currentInput.addEventListener('keydown', (e) => {
        OtpInput.handleKeydown(instance, currentInput, i, e);
      });
    }
  }

  static handlePaste(instance, currentInput, i) {
    if (isNaN(currentInput.value)) {
      // sanatize the input
      input.value = '';
      OtpInput.updateInput(instance);
      return;
    }

    // create an array of characters
    const chars = currentInput.value.split('');

    let scheduledFocus = Math.min(instance.inputs.length - 1, i + chars.length);

    // start pasting from index 0 if the current input is not the first input
    let pasteStartIndex = currentInput !== 0 ? 0 : i;

    // loop through the array and assign each character to the input
    for (let pos = 0; pos < chars.length; pos++) {
      if (pos + pasteStartIndex >= instance.inputs.length) break;
      let targetInput = instance.inputs[pos + pasteStartIndex];

      // paste value
      targetInput.value = chars[pos];
    }

    // focus on the next input after pasting value
    instance.inputs[scheduledFocus].focus();
  }

  static handleKeydown(instance, currentInput, i, e) {
    const inputLength = instance.inputs.length;

    if (e.keyCode === keycodes.backspace && i > 0) {
      OtpInput.shiftInputValues(instance, i);
      instance.inputs[i - 1].focus();
      return;
    }

    if (e.keyCode === keycodes.delete && i !== inputLength - 1) {
      OtpInput.shiftInputValues(instance, i + 1);
      currentInput.select();
      e.preventDefault();
      return;
    }

    if (e.keyCode === keycodes.left) {
      if (i > 0) {
        e.preventDefault();
        instance.inputs[i - 1].focus();
        instance.inputs[i - 1].select();
      }
      return;
    }

    if (e.keyCode === keycodes.right) {
      if (i + 1 < inputLength) {
        e.preventDefault();
        instance.inputs[i + 1].focus();
        instance.inputs[i + 1].select();
      }
      return;
    }
  }

  static shiftInputValues(instance, startIndex) {
    for (let pos = startIndex; pos < instance.inputs.length - 1; pos++) {
      instance.inputs[pos].value = instance.inputs[pos + 1].value;
    }
    instance.inputs[instance.inputs.length - 1].value = '';
    OtpInput.updateInput(instance);
  }

  static updateInput(instance) {
    let inputValue = Array.from(instance.inputs).reduce((otp, input) => {
      otp += input.value.length ? input.value : ' ';
      return otp;
    }, '');
    instance.hiddenInput.value = inputValue;
    if (instance.hiddenInput.value.length === instance.inputQty) {
      instance.checkForMatch();
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
