import React from 'react'
import GroupItem from './group-item'
import HeaderListGroups from '../../other/header-list-groups/index'
import HeaderListPanel from '../../other/header-list-panel/index'
import GroupsFilter from '../../forms/groups-filter/index'

import style from './list-groups.scss'

const marginHeaderPanel = {
  marginBottom: '10px'
};

const isMarked = (groups) => {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].isMarked) return true;
  }
};

const createList = (groups, onClickItemListHandler) => groups.map((el, i) => (
  <GroupItem key={i}
             title={el.name}
             text={`${el.members_count.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} участников`}
             srcImg50={el.photo_50}
             onClick={onClickItemListHandler ? () => onClickItemListHandler(el.id) : ''}
             isMarked={el.isMarked}/>
));

const ListGroups = ({groups, onClickItemListHandler, onClickItemHeaderListHandler, noHeaderListGroups,
                      headerText = 'Выбранные группы'}) => (
  <div className={style['ul-screen']}>
    <ul className={style['ul-groups']}>
      <HeaderListPanel headerText={headerText} css={noHeaderListGroups ? marginHeaderPanel : ''}/>
      {
        noHeaderListGroups ? '' :
          isMarked(groups)
            ? <HeaderListGroups groups={groups} className={[style['header-list-groups']]}
                                onClick={onClickItemHeaderListHandler}/>
            : <div className={style['header-list-groups-text']}>Выберите группы из списка</div>
      }
      <GroupsFilter/>

      {groups ? createList(groups, onClickItemListHandler) : ''}
    </ul>
  </div>
);

export default ListGroups