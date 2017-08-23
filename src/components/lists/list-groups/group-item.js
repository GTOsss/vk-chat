import React from 'react'
import MarkCircle from 'react-icons/lib/fa/check-circle-o';

import style from './list-groups.scss'

const GroupItem = ({title, text, srcImg50, onClick, isMarked}) => (
  <li className={style['group-item']} onClick={onClick ? () => onClick() : ''}>
    <div>
      <img src={srcImg50} className={style['group-photo']}/>
    </div>
    <div>
      <div className={style['group-title']}>{title}</div>
      <div className={style['group-text']}>{text}</div>
    </div>
    {isMarked ?  <MarkCircle size='22' color='#314963' className={style['mark-circle']} /> : ''}
  </li>
);

export default GroupItem