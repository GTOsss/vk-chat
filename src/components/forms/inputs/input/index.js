import React from 'react'
import ErrorMessage from '../error-message'

import style from './input.scss'

const Input = ({input, meta}) => (
  <div>
    <input {...input} className={style['input']} type='text'/>
    {meta.touched && meta.error && <ErrorMessage error={meta.error}/>}
  </div>
);

export default Input