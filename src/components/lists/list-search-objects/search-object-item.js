import React from 'react'
import HeaderListPanel from '../../other/header-list-panel/index'
import HeaderListGroups from '../../other/header-list-groups/index'
import SearchParams from '../../other/search-params/index'
import MarkCircle from 'react-icons/lib/fa/circle-o';
import MarkCircleActive from 'react-icons/lib/fa/check-circle-o';
import DeleteIcon from 'react-icons/lib/fa/times-circle-o';

import style from './list-search-objects.scss'

const ItemSearchObject = ({searchParams, groups, countResults, active, onClick, deleteOnClick}) => (
  <div className={style['ul-groups-item']}>
    <HeaderListPanel headerText={`Результатов поиска: ${countResults}`}/>
    <HeaderListGroups groups={groups}/>
    <SearchParams searchParams={searchParams}/>
    { active
      ? <MarkCircleActive size='24' color='#314963' className={style['mark-circle']} onClick={() => onClick()}/>
      : <MarkCircle size='24' color='#314963' className={style['mark-circle']} onClick={() => onClick()}/> }
    <DeleteIcon size='24' className={style['delete-icon']} onClick={() => deleteOnClick()}/>
  </div>
);

export default ItemSearchObject