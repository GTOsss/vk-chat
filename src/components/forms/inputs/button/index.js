import React from 'react'
import cx from 'classnames'

import style from './button.scss'

const Button = ({children, type, onClick, className, disabled}) => (
  <button className={cx(className, disabled ? style['button-dis'] : style['button'])}
          type={!disabled ? type : 'button'}
          onClick={(e)=>{!disabled && onClick && onClick(e)}}>
    {children}
  </button>
);

export default Button