import React from 'react';
import PropTypes from 'prop-types';

import style from './list-groups.scss';

const MessageInfo = ({ count, color: colorStr }) => (
  count ?
    <div className={style['message-info']} style={{ color: colorStr }}>
      {count}+
    </div> : null
);

MessageInfo.propTypes = {
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};


export default MessageInfo;
