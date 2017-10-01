import React from 'react'
import PropTypes from 'prop-types'

import style from './list-groups.scss'

const MessageInfo = ({count, color}) => (
  count ?
    <div className={style['message-info']} style={{color: color}}>
      {count}+
    </div> : null
);

export default MessageInfo

MessageInfo.propTypes = {
  count: PropTypes.number
};