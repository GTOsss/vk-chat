import React from 'react'
import ResizeIcon from 'react-icons/lib/md/aspect-ratio'
import ConnectInfoIcon from '../../../components/icons/connect-info'

import style from './chat.scss'

const ResizePanel = ({onClickResize, onClickFilter, inverseIcon, isConnect, showOtherIcon}) => (
  <div className={style['minimize-group-list-header']}>
    <div>
      <ConnectInfoIcon size={22} onClick={onClickFilter}
                       inverse={inverseIcon} online={isConnect} showOtherIcon={showOtherIcon}/>
    </div>
    <ResizeIcon size={24} color={'#FFF'} style={{cursor: 'pointer'}} onClick={onClickResize}/>
  </div>
);

const TitlePanel = ({title}) => (
  <div className={style['minimize-group-list-header-connects']} style={{color: 'white'}}>
    {title}
  </div>
);

export {ResizePanel, TitlePanel}