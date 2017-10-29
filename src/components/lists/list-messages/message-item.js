import React from 'react';
import PropTypes from 'prop-types';

import style from './list-message.scss';

const MessageItem = ({ title, text, srcImg50, date, onClick }) => (
  <li className={style['message-item']} onClick={onClick ? () => onClick() : ''}>
    <div>
      <img src={srcImg50} alt="Загрузка..." className={style['message-photo']} />
    </div>
    <div className={style['message-group']}>
      <div className={style['message-line-title']}>
        <div className={style['message-title']}>{title}</div>
        <div className={style['message-date']}>{date}</div>
      </div>
      <div className={style['message-text']}>{text}</div>
    </div>
  </li>
);

MessageItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  srcImg50: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MessageItem.defaultProps = {
  onClick: null,
};

export default MessageItem;
