import React from 'react'
import GroupItem from './group-item'

import style from './list-groups.scss'

const createList = (groups, onClickItemListHandler) => groups.map((el, i) => (
  <GroupItem key={i}
             title={el.name}
             text={`${el.members_count.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') } участников`}
             srcImg50={el.photo_50}
             onClick={onClickItemListHandler ? () => onClickItemListHandler(i) : ''}
             isMarked={el.isMarked} />
));

const ListGroups = ({groups, onClickItemListHandler}) => (
  <ul className={style['ul-groups']}>
    {groups ? createList(groups, onClickItemListHandler) : ''}
  </ul>
);

export default ListGroups