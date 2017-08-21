import React from 'react'
import GroupItem from './group-item'
import HeaderListGroups from '../other/header-list-groups'
import HeaderListPanel from '../other/header-list-panel'
import GroupsFilter from '../forms/groups-filter'

import style from './list-groups.scss'

const isMarked = (groups) => {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].isMarked) return true;
  }
};

const createList = (groups, onClickItemListHandler) => {
  let items = [];
  for (let i = 0; i < Math.min(100, groups.length); i++) {
    let el = groups[i];
    items.push(
      <GroupItem key={i}
                 title={el.name}
                 text={`${el.members_count.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} участников`}
                 srcImg50={el.photo_50}
                 onClick={onClickItemListHandler ? () => onClickItemListHandler(el.id) : ''}
                 isMarked={el.isMarked}/>
    );
  }
  return items;
};

const ListGroups = ({groups, onClickItemListHandler, onClickItemHeaderListHandler}) => (
  <div className={style['ul-screen']}>
    <ul className={style['ul-groups']}>
      <HeaderListPanel headerText='Выбранные группы'/>
      {isMarked(groups)
        ? <HeaderListGroups groups={groups} className={[style['header-list-groups']]}
                            onClick={onClickItemHeaderListHandler}/>
        : <div className={style['header-list-groups-text']}>Выберите группы из списка</div>}

      <GroupsFilter/>

      {groups ? createList(groups, onClickItemListHandler) : ''}
    </ul>
  </div>
);

export default ListGroups