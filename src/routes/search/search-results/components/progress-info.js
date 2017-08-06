import React from 'react'
import ProgressBar from '../../../../components/progress-bar'
import HeaderListPanel from '../../../../components/other/header-list-panel'
import HeaderListGroups from '../../../../components/other/header-list-groups'

import style from './search-results.scss'

const ProgressInfo = ({count, value, progressGroup, groups}) => (
  <div className={style['panel']}>
    <HeaderListPanel headerText={'Выбранные группы'}/>
    <HeaderListGroups groups={groups}/>
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