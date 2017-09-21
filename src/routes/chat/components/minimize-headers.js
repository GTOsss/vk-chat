import React from 'react'
import ResizeIcon from 'react-icons/lib/md/aspect-ratio'

import style from './chat.scss'

const ResizePanel = ({onClickResize}) => (
  <div className={style['minimize-group-list-header']}>
    <ResizeIcon size={24} color={'#FFF'} style={{cursor: 'pointer'}} onClick={onClickResize}/>
  </div>
);

const TitlePanel = ({title}) => (
  <div className={style['minimize-group-list-header-connects']} style={{color: 'white'}}>
    {title}
  </div>
);

export {ResizePanel, TitlePanel}