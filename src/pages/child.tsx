import React, { useState } from 'react'
import style from './child.scss'
import { Link } from 'react-router-dom'
import history from '../utils/history'

const goToInfo = () => {
  // history.push('/child/info')
  history.replace('/child/info')
}

const Child = () => {
  const [count, setCount] = useState(0)
  return (
    <div className={style.wrapper} onClick={() => setCount(count + 1)}>
      <span className={style.child}>hello child.js {count}</span>
      <div>
        <Link to={'/child/info'}>/child/info</Link>
      </div>
      <div onClick={goToInfo}>/child/info</div>
    </div>
  )
}

export default Child
