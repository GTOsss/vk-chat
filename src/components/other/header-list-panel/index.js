import React from 'react'

import style from './header-list-panel.scss'

const HeaderListPanel = ({headerText}) => (
  <div className={style['group-items']}>
    <div className={style['ul-header-left-right']}/>
    <div className={style['ul-header']}>{headerText}</div>
    <div className={style['ul-header-left-right']}/>
  </div>
);

export default HeaderListPanel