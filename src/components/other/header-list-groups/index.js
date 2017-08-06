import React from 'react'
import cx from 'classnames';

import style from './header-list-groups.scss'

const createListGroups = (groups, onClick) => groups.map((el, i) => {
  if(el.isMarked) {
    return (
      <div key={i} className={style['group-item']}>
        <img src={el.photo_50}
             onClick={onClick ? () => onClick(i) : ''}
             className={style['group-photo']}/>
      </div>
    )
  }
});

const HeaderListGroups = ({groups, onClick, className}) => (
  <div className={cx(style['header-list'], className)}>
    {createListGroups(groups, onClick)}
  </div>
);

export default HeaderListGroups
