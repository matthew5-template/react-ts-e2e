import * as React from 'react'
import './App.scss'
import { Demo } from './Demo'
// import * as authApi from '../apis/auth'

class App extends React.Component {
  validPhoneNumber(phoneNumber: string) {
    if (phoneNumber.length != 11) {
      return '手机号码位数不正确'
    }
    if (!/^(185|130)/.test(phoneNumber)) {
      return '手机号段不正确'
    }
    return ''
  }

  onFetchCode = async (phoneNumber: string) => {
    return this.validPhoneNumber(phoneNumber)
    // const res: any = await authApi.fetchCode('api/sms/verification/code', {
    //   scope: 'ABC',
    //   mobile: phoneNumber
    // })
    // if (res.hasError) {
    //   return res.error
    // } else {
    //   return ''
    // }
  }

  onVerifyCode = async (params: { phoneNumber: string; code: string }) => {
    const phoneMsg = this.validPhoneNumber(params.phoneNumber)
    if (!phoneMsg) {
      if (params.code === '1111') {
        return ''
      } else if (params.code === '0000') {
        return '验证码错误'
      } else {
        return '验证码不匹配'
      }
    } else {
      return phoneMsg
    }
    // const res: any = await authApi.verifyCode('api/sms/verification/code', {
    //   scope: 'ABC',
    //   mobile: params.phoneNumber,
    //   code: params.code
    // })
    // if (res.hasError) {
    //   return res.error
    // } else {
    //   return ''
    // }
  }

  render() {
    return (
      <>
        <div className="container">
          <Demo
            onFetchCode={this.onFetchCode}
            onVerifyCode={this.onVerifyCode}
          />
        </div>
      </>
    )
  }
}

export default App
