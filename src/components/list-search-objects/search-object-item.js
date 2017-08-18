import React from 'react'
import HeaderListPanel from '../../components/other/header-list-panel'
import HeaderListGroups from '../../components/other/header-list-groups'
import SearchParams from '../../components/other/search-params'

import style from './list-search-objects.scss'

const ItemSearchObject = ({searchParams, groups, countResults}) => (
  <div className={style['ul-groups-item']}>
    <HeaderListPanel headerText={`Результатов поиска: ${countResults}`}/>
    <HeaderListGroups groups={groups}/>
    <SearchParams searchParams={searchParams}/>
    <div className={style['bottom-panel']}/>
  </div>
);

export default ItemSearchObject