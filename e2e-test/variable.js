module.exports = {
  smsv_selector: {
    phoneInput: '.smsv-phone-number-container input',
    phoneErrorMsg: '.smsv-phone-number-container .smsv-phone-number-error-tips',
    fetchCodeBtn: '.smsv-code-verification-container button',
    codeInput: '.smsv-code-verification-container input',
    codeErrorMsg:
      '.smsv-code-verification-container .smsv-code-verification-error-tips',
    agreementPretext: '.smsv-agreement-container .smsv-agreement-pretext',
    verifyBtn: '.smsv-submit-container button',
    errorMsgContainer: '.smsv-error-message-container'
  },
  smsv_validPhone: {
    number: '18511112222',
    code: '1111'
  },
  smsv_validPhone2: {
    number: '13011112222'
  },
  smsv_codeMismatch: {
    number: '18511112222',
    code: '1234'
  },
  smsv_invalidPhone: {
    number: '13411112222'
  },
  smsv_invalidCode: {
    number: '18522223333',
    code: '0000'
  }
}
