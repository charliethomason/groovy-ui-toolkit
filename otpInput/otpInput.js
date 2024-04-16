export class OtpInput {
  form = document.createElement('form');
  inputQty = 6;
  inputs = [];

  constructor(inputQty = 6) {
    this.form.className = 'otp-form';
    this.inputQty = inputQty;
  }

  createElements() {
    for (let i = 0; i < this.inputQty; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'otp-input';
      input.maxLength = 1;
      input.pattern = 'd*';
      input.name = 'otp';
      input.id = `otp-input-${i}`;
      this.form.appendChild(input);
      this.inputs.push(input);
    }
    document.body.appendChild(this.form);
    this.addEventListeners();
  }

  addEventListeners() {
    for (let i = 0; i < this.inputs.length; i++) {
      const input = this.inputs[i];

      input.addEventListener('input', () => {
        if (input.value.length == 1 && i + 1 < this.inputs.length) {
          this.inputs[i + 1].focus();
        }

        if (input.value.length > 1) {
          if (isNaN(input.value)) {
            input.value = '';
            this.updateInput();
            return;
          }

          const chars = input.value.split('');

          for (let pos = 0; pos < chars.length; pos++) {
            if (pos + i >= this.inputs.length) break;

            let targetInput = this.inputs[pos + i];
            targetInput.value = chars[pos];
          }

          let focus_index = Math.min(this.inputs.length - 1, i + chars.length);
          this.inputs[focus_index].focus();
        }
        this.updateInput();
      });

      input.addEventListener('keydown', (e) => {
        if (e.keyCode == 8 && input.value == '' && i != 0) {
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
          input.select();
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
    let inputValue = Array.from(this.inputs).reduce(function (otp, input) {
      otp += input.value.length ? input.value : ' ';
      return otp;
    }, '');
    document.querySelector('input[name=otp]').value = inputValue;
  }
}
