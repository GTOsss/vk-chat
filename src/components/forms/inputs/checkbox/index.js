import React from 'react'

import CheckboxIcon from 'react-icons/lib/md/check-box'

import style from './checkbox.scss'

const checkboxStyle = (size, color) => ({
  borderRadius: '2px',
  height: size + 'px',
  width: size + 'px',
  margin: '2px',
  boxSizing: 'border-box',
  border: `1px ${color} solid`
});

const Checkbox = ({input: {onChange}, color, size, active, children}) => (
  <div className={style['checkbox']} onClick={() => onChange(!active)}>
    { active
      ? <CheckboxIcon color={color} size={Number.parseInt(size)}/>
      : <div style={checkboxStyle(Number.parseInt(size)-4, color)}/> }
    <label className={style['label']}>{children}</label>
  </div>
);

export default Checkbox