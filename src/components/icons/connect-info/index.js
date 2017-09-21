import React from 'react'
import CircleIcon from 'react-icons/lib/fa/circle-o'
import CirclePaintedIcon from 'react-icons/lib/fa/circle'
import PropTypes from 'prop-types'

import style from './connect-info.scss'

const ConnectInfo = ({circleColor = '#314963', circlePaintedColor = '#3eb114', online, onClick}) => (
  <div className={style['wrap-icons']} style={{height: 22+'px'}} onClick={onClick}>
    <CircleIcon size={22} color={circleColor} className={style['circle-icon']}/>
    {online ?
      <CirclePaintedIcon size={10} color={circlePaintedColor} className={style['circle-painted-icon']}/> : ''
    }
    <div style={online ? {color: '#3eb114'} : {color: '#656565'}} className={style['label']}>
      {online ? 'online' : 'offline'}
    </div>

  </div>
);

export default ConnectInfo

ConnectInfo.propTypes = {
  circleColor: PropTypes.string,
  circlePaintedColor: PropTypes.string,
  online: PropTypes.bool
};