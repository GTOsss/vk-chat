import React from 'react'
import style from './list-groups.scss'

const GroupItem = ({i, name, srcImg50}) => (
  <li>
    <div className={style['group-item']}>
      <div>
        <img src={srcImg50} className={style['group-photo']}/>
      </div>
      <div className={style['group-title']}>{name}</div>
    </div>
  </li>
);

export default GroupItem