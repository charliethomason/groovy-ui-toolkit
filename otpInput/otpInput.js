export class OtpInput {
  form = document.createElement('form');
  inputLength = 6;

  constructor(inputLength = 6) {
    this.form.className = 'otp-form';
    this.inputLength = inputLength;
  }

  createElements() {
    for (let i = 0; i < this.inputLength; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'otp-input';
      input.maxLength = 1;
      input.id = `otp-input-${i}`;
      this.form.appendChild(input);
    }
    document.body.appendChild(this.form);
  }

  handleKeyPress(e, idx) {
    const target = e.target;
    const isDigit = e.key.match(/[0-9]/);
    if (e.key === 'Backspace' && target.previousElementSibling) {
      target.previousElementSibling.focus();
    } else if (e.key.match(/[0-9]/) && target.nextElementSibling) {
      target.nextElementSibling.focus();
    }
  }
}
