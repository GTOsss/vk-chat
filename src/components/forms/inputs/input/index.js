import React from 'react'
import ErrorMessage from '../error-message'

import style from './input.scss'

const Input = ({input: {value, onChange}, meta, placeholder}) => (
  <div className={style['wrap-input']}>
    <input className={style['input']}
           onBlur={(e) => onChange(e.target.value)}
           type='text'
           defaultValue={value}
           placeholder={placeholder}/>
    {(value !== '')
      ? <div className={style['clear-btn']}
             onClick={() => onChange('')}>
        ×
      </div> : ''}
    {meta.touched && meta.error && <ErrorMessage error={meta.error}/>}
  </div>
);

export default Input