import React from 'react'

import style from './error-message.scss'

const ErrorMessage = ({error}) => (
  <span className={style['error-message']}>{error}</span>
);

export default ErrorMessage