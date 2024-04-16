# Groovy UI Toolkit

A kit of UI tools that are groovy

Created by [Charlie Thomason](https://charliethomason.com) and [Kurt Reynolds](http://kurtreyn.com/).

Node version: 18.16.0

### OTP Input usage example:

```
const OtpInput = new OtpInput(6); // where 6 is the number of digits in the OTP

OtpInput.setOtp("123456"); // sets the correct OTP

OtpInput.renderAndUse(); // render the OTP input to the DOM and use it
```
