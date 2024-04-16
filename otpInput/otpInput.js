export class OtpInput {
  form = document.createElement('form');
  inputQty = 6;
  inputs = [];
  input = document.createElement('input');
  otp = '';
  inputMatchesOtp = false;

  constructor(inputQty = 6) {
    this.form.className = 'otp-form';
    this.inputQty = inputQty;
    this.input.type = 'hidden';
    this.input.name = 'otp';
  }

  getOtp() {
    return this.input.value;
  }

  setOtp(otp) {
    this.otp = otp;
  }

  resetOtp() {
    this.input.value = '';
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

      currentInput.addEventListener('input', () => {
        if (currentInput.value.length == 1 && i + 1 < this.inputs.length) {
          this.inputs[i + 1].focus();
        }

        if (currentInput.value.length > 1) {
          if (isNaN(currentInput.value)) {
            input.value = '';
            this.updateInput();
            return;
          }

          const chars = currentInput.value.split('');

          for (let pos = 0; pos < chars.length; pos++) {
            if (pos + i >= this.inputs.length) break;

            let targetInput = this.inputs[pos + i];
            targetInput.value = chars[pos];
          }

          let focusIndex = Math.min(this.inputs.length - 1, i + chars.length);
          this.inputs[focusIndex].focus();
        }
        this.updateInput();
      });

      currentInput.addEventListener('keydown', (e) => {
        if (e.keyCode == 8 && currentInput.value == '' && i != 0) {
          for (let pos = i; pos < this.inputs.length - 1; pos++) {
            this.inputs[pos].value = this.inputs[pos + 1].value;
          }

          this.inputs[i - 1].value = '';
          this.inputs[i - 1].focus();
          this.updateInput();
          return;
        }

        if (e.keyCode == 46 && i != this.inputs.length - 1) {
          for (let pos = i; pos < this.inputs.length - 1; pos++) {
            this.inputs[pos].value = this.inputs[pos + 1].value;
          }

          this.inputs[this.inputs.length - 1].value = '';
          currentInput.select();
          e.preventDefault();
          this.updateInput();
          return;
        }

        if (e.keyCode == 37) {
          if (i > 0) {
            e.preventDefault();
            this.inputs[i - 1].focus();
            this.inputs[i - 1].select();
          }
          return;
        }

        if (e.keyCode == 39) {
          if (i + 1 < this.inputs.length) {
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
    this.input.value = inputValue;
    if (this.input.value.length === this.inputQty) {
      this.checkForMatch();
    }
  }

  checkForMatch() {
    if (this.otp === this.input.value) {
      this.inputMatchesOtp = true;
    } else {
      this.inputMatchesOtp = false;
    }
  }

  renderAndUse() {
    document.addEventListener('DOMContentLoaded', () => {
      this.createElements();
      this.addEventListeners();
    });
  }
}
