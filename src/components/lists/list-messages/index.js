import React from 'react'
import MessageItem from './message-item'
import HeaderListGroups from '../../other/header-list-groups/index'
import HeaderListPanel from '../../other/header-list-panel/index'

import style from './list-message.scss'

const createList = (messages) => messages.map((el, i) => (
  <MessageItem key={i}
               title={el.sender}
               text={el.message}
               date={el.date}
               srcImg50={el.photo_50}/>
));

const ListMessages = ({messages, groups}) => (
  <div className={style['ul-screen']}>
    <ul className={style['ul-messages']}>
      <HeaderListPanel headerText='Чат в группе'/>
      <HeaderListGroups groups={groups} className={[style['header-list-groups']]}/>
      {messages ? createList(messages) : ''}
    </ul>
  </div>
);

export default ListMessages