import React from 'react'
import MarkCircle from 'react-icons/lib/fa/check-circle-o';

import style from './list-groups.scss'

const GroupItem = ({title, text, srcImg50, onClick, isMarked}) => (
  <li className={style['group-item']} onClick={onClick ? () => onClick() : ''}>
    <div>
      <img src={srcImg50} className={style['group-photo']}/>
    </div>
    <div>
      <span className={style['group-title']}>{name}</span>
      <br/>
      <span className={style['group-text']}>{text}</span>
    </div>
    {isMarked ?  <MarkCircle size='22' color='#314963' className={style['mark-circle']} /> : ''}
  </li>
);

export default GroupItem