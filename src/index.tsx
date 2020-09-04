import React from 'react'
import ReactDom from 'react-dom'
import Root from './root'
// import { hot } from 'react-hot-loader/root'

console.log('refresh')
const appNode = document.getElementById('app')
// const HotRoot = hot(Root)
ReactDom.render(<Root />, appNode)
const hot = (module as any).hot
if (hot) {
  hot.accept('./root', function () {
    ReactDom.render(<Root />, appNode)
  })
}
