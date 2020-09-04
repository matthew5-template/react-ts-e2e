import React, { Component } from 'react'
import venom from '../assets/venom.png'

class Info extends Component {
  state = {
    count: 0
  }

  delay(second: number) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * second))
  }

  onChange = async () => {
    await this.delay(1)
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    const { count } = this.state
    return (
      <div onClick={this.onChange}>
        <span>hello info.js {count}</span>
        <img src={venom} style={{ width: 60 }} />
      </div>
    )
  }
}

export default Info
