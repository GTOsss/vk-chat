import React from 'react'
import ProgressBar from '../../progress-bar/index'
import HeaderListPanel from '../../other/header-list-panel/index'
import HeaderListGroups from '../../other/header-list-groups/index'
import SearchParams from '../../other/search-params/index'
import style from './search-results.scss'

const ProgressInfo = ({count, value, progressGroup, groups, searchParams}) => (
  <div className={style['panel']}>
    <HeaderListPanel headerText={'Поиск в группах'}/>
    <HeaderListGroups groups={groups}/>
    <SearchParams searchParams={searchParams}/>
    { progressGroup
      ? <ProgressBar lineColor='#5e81a8' progress={progressGroup}>
          {`Поиск в текущей группе`}
        </ProgressBar> : '' }

    <ProgressBar lineColor='#5e81a8' progress={value/count*100}>
      {`Произведен поиск в группах: ${value} из ${count}`}
    </ProgressBar>
  </div>
);

export default ProgressInfo