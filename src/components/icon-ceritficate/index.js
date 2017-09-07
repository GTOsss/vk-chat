import React from 'react'
import IconCrt from 'react-icons/lib/ti/starburst-outline'
import moment from 'moment'

import style from './icon-certificate.scss'

const IconCertificate = ({profile}) => (
  <div className={style['wrap-icon']}>
    <div className={style['hover-show-info']}>
      <IconCrt size={38} color='#ffffff'/>
    </div>
    <div className={style['wrap-info']}>
      <div className={style['window-info']}>
        Сохранение результатов поиска: до {' '}
        <strong>
          {(profile && profile.dateTo) ? moment(profile.dateTo, 'X').format('DD.MM.YYYY') : ''}
        </strong>
      </div>
    </div>
  </div>
);

export default IconCertificate