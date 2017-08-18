import React from 'react'
import HeaderListPanel from '../../components/other/header-list-panel'
import HeaderListGroups from '../../components/other/header-list-groups'
import SearchParams from '../../components/other/search-params'
import MarkCircle from 'react-icons/lib/fa/circle-o';
import MarkCircleActive from 'react-icons/lib/fa/check-circle-o';

import style from './list-search-objects.scss'

const ItemSearchObject = ({searchParams, groups, countResults, active, onClick}) => (
  <div className={style['ul-groups-item']}>
    <HeaderListPanel headerText={`Результатов поиска: ${countResults}`}/>
    <HeaderListGroups groups={groups}/>
    <SearchParams searchParams={searchParams}/>
    { active
      ? <MarkCircleActive size='24' color='#314963' className={style['mark-circle']} onClick={() => onClick()}/>
      : <MarkCircle size='24' color='#314963' className={style['mark-circle']} onClick={() => onClick()} /> }
  </div>
);

export default ItemSearchObject