import React from 'react'
import cx from 'classnames'

import style from './header-list-panel.scss'

const HeaderListPanel = ({headerText, className, headerClickHandler}) => (
  <div className={style['group-items']}>
    <div className={style['ul-header-left-right']}/>
    <div className={cx(style['ul-header'], className)}
         onClick={headerClickHandler ? headerClickHandler : ''}>
      {headerText}
    </div>
    <div className={style['ul-header-left-right']}/>
  </div>
);

export default HeaderListPanel