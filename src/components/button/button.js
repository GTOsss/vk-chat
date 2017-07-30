import React from 'react'
import cx from 'classnames'

import style from './button.scss'

const Button = ({children, type, onClick, className}) => (
  <button className={cx(className, style['button'])} type={type} onClick={(e)=>{onClick(e)}}>
    {children}
  </button>
);

export default Button