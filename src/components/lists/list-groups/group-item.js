import React from 'react'
import MarkCircle from 'react-icons/lib/fa/check-circle-o'
import ConnectInfo from '../../icons/connect-info'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './list-groups.scss'

const GroupItem = ({title, text, srcImg50, onClick, onClickConnect, onClickItemConnectIconHandler, online,
                     isMarked, isOnline, isSelect, minimize, showConnect, showMarked = true}) => (
  <li
    className={minimize
      ? cx(style['group-item-minimize'], isSelect ? style['group-item-minimize-active'] : '')
      : cx(style['group-item'], isSelect ? style['group-item-active'] : '')}

      onClick={onClick ? () => onClick() : ''}>
    <div>
      <img src={srcImg50} className={minimize ? style['group-photo-minimize'] : style['group-photo']}/>
    </div>
    {minimize ? '' :
      <div>
        <div className={style['group-title']}>{title}</div>
        <div className={style['group-text']}>{text}</div>
      </div>
    }
    {showConnect ? <ConnectInfo online={online} onClick={onClickItemConnectIconHandler}/> : ''}
    {isMarked && showMarked ?  <MarkCircle size='22' color='#314963' className={style['mark-circle']} /> : ''}
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