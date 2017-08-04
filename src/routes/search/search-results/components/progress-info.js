import React from 'react'
import ProgressBar from '../../../../components/progress-bar'

import style from './search-results.scss'

const ProgressInfo = ({count, value, progressGroup}) => (
  <div className={style['panel']}>
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