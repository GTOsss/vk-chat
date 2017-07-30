import React from 'react'
import cx from 'classnames';
import RadioIcon from 'react-icons/lib/fa/circle-thin'
import RadioActiveIcon from 'react-icons/lib/md/adjust'
import style from './radio-input.scss'

const InputRadio = ({name, children, className, id, onClick, active}) => (
  <div className={cx(style['wrap-radio'], className)} onClick={() => onClick()}>
    {active ? <RadioActiveIcon size='16' color='#6F9FCD'/> : <RadioIcon size='16' color='#6F9FCD'/>}
    <label className={style['label']}>{children}</label>
  </div>
);

export default InputRadio