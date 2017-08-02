import React from 'react'

import style from './list-users.scss'

const GroupItem = ({name, srcImg100}) => (
  <li className={style['user-item']}>
    <div>
      <img src={srcImg100} className={style['user-photo']}/>
    </div>
    <div>
      <div className={style['user-title']}>{''}</div>
      <div className={style['user-text']}>{''}</div>
    </div>
  </li>
);

export default GroupItem