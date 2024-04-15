class OtpInput {
  form = document.createElement('form');

  constructor() {
    this.form.className = 'otp-form';
  }

  createElements() {
    for (let i = 0; i < 6; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'otp-input';
      input.maxLength = 1;
      input.id = `otp-input-${i}`;
      this.form.appendChild(input);
    }
    document.body.appendChild(this.form);
  }
}

const OTPInput = new OtpInput();

document.addEventListener('DOMContentLoaded', () => {
  OTPInput.createElements();
});
