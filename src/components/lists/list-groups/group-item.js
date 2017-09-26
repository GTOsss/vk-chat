import React from 'react'
import MarkCircle from 'react-icons/lib/fa/check-circle-o'
import ConnectInfo from '../../icons/connect-info'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './list-groups.scss'

const GroupItem = ({
                     title, text, srcImg50, onClick, onClickConnect, online, listConnectsMinimize,
                     isMarked, isOnline, isSelect, minimize, showConnect, showMarked = true, isChat
                   }) => (
  <li className={listConnectsMinimize
    ? cx(style['group-item-minimize'], isSelect ? style['group-item-minimize-active'] : '')
    : cx(style['group-item'], isSelect ? style['group-item-active'] : '')}
      onClick={onClick ? () => onClick() : ''}
      style={{
        transition: '300ms linear 0s',
        transitionProperty: 'height',
        height: minimize ? '51px' : '74px',
        padding: minimize
          ? (isSelect ? '5px 4px' : '7px 4px')
          : (isSelect ? '10px 2px 10px 12px' : '12px 2px 12px 12px')
      }}>
    <div>
      <img src={srcImg50} style={{transition: 'all 300ms linear 0s'}}
           className={minimize ? style['group-photo-minimize'] : style['group-photo']}/>
    </div>
    <div style={{
      transition: 'opacity 200ms linear',
      transitionDelay: !listConnectsMinimize ? '0ms' : '700ms',
      position: listConnectsMinimize ? 'absolute' : 'static',
      opacity: minimize ? 0 : 1
    }}>
      <div className={style['group-title']}>{title}</div>
      <div className={style['group-text']}>{text}</div>
    </div>
    {isChat ? 'chat-info' :
      <div style={{
        transition: 'opacity 200ms linear 0s',
        opacity: !minimize ? 0 : 1,
        transitionDelay: listConnectsMinimize ? '0ms' : '700ms',
        position: !listConnectsMinimize ? 'absolute' : 'static',
        height: 'inherit',
      }}>
        <ConnectInfo online={online} leftIndent={40}/>
      </div>
    }

    {isMarked && showMarked ? <MarkCircle size='22' color='#314963' className={style['mark-circle']}/> : ''}
  </li>
);

export default GroupItem

GroupItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  srcImg50: PropTypes.string,
  onClick: PropTypes.func,
  onClickConnect: PropTypes.func,
  isMarked: PropTypes.bool,
  isOnline: PropTypes.bool,
  isSelect: PropTypes.bool,
  minimize: PropTypes.bool,
  showConnect: PropTypes.bool,
  showMarked: PropTypes.bool
};