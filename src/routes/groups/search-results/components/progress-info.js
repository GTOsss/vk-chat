import React from 'react'
import ProgressBar from '../../../../components/progress-bar'

import style from './search-results.scss'

const ProgressInfo = ({count, value}) => (
  <div className={style['panel']}>
    <ProgressBar lineColor='#5e81a8' progress={value/count*100}>
      {`Произведен поиск в группах: ${value} из ${count}`}
    </ProgressBar>
  </div>
);

export default ProgressInfo