import React from 'react'

import style from './list-message.scss'

const MessageItem = ({title, text, srcImg50, date, onClick}) => (
  <li className={style['message-item']} onClick={onClick ? () => onClick() : ''}>
    <div>
      <img src={srcImg50} className={style['message-photo']}/>
    </div>
    <div>
      <div className={style['message-line-title']}>
        <div className={style['message-title']}>{title}</div>
        <div className={style['message-date']}>{date}</div>
      </div>
      <div className={style['message-text']}>{text}</div>
    </div>
  </li>
);

export default MessageItem