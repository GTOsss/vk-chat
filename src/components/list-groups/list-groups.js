import React from 'react'
import GroupItem from './group-item'

import style from './list-groups.scss'

const createList = (groups) => groups.map((el, i) => (
  <GroupItem i={i} name={el.name} srcImg50={el.photo_50} key={i} />
));

const ListGroups = ({groups}) => (
  <ul className={style['ul-groups']}>
    {groups ? createList(groups) : ''}
  </ul>
);

export default ListGroups