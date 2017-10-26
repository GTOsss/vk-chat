import React from 'react'
import ProgressBar from '../../progress-bar/index'
import HeaderListPanel from '../../other/header-list-panel/index'
import HeaderListGroups from '../../other/header-list-groups/index'
import SearchParams from '../../other/search-params/index'
import style from './search-results.scss'

const addSpaceNumber = (number) => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');


const ProgressInfo = ({count, value, progressGroup, groups, searchParams, currentMembersCount}) => (
  <div className={style['panel']}>
    <HeaderListPanel headerText={'Поиск в группах'}/>
    <HeaderListGroups groups={groups}/>
    <SearchParams searchParams={searchParams}/>
    {progressGroup
      ? <ProgressBar progress={progressGroup}>
        {`Поиск в текущей группе: ${addSpaceNumber(currentMembersCount)} участников`}
      </ProgressBar> : ''}

    <ProgressBar progress={value / count * 100}>
      {`Произведен поиск в группах: ${value} из ${count}`}
    </ProgressBar>
  </div>
);

export default ProgressInfo