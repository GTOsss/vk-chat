import React from 'react'
import cx from 'classnames'

import style from './header-panel-group-chat.scss'

const HeaderPanelGroupChat = ({group, className, headerStyle}) => (
  <div className={cx(style['header-panel'], className)}
       style={headerStyle}>
    <h6 className={style['group-name']}>{group.name}</h6>
    <img src={group.photo_50} className={style['img']}/>
  </div>
);

export default HeaderPanelGroupChat