import React from 'react'

import style from './list-users.scss'

const GroupItem = ({name, followersCount, srcImg100}) => (
  <li className={style['user-item']}>
    <div>
      <img src={srcImg100} className={style['user-photo']}/>
    </div>
    <div>
      <div className={style['user-title']}>{name}</div>
      <div className={style['user-text']}>{followersCount}</div>
    </div>
  </li>
);

export default GroupItem