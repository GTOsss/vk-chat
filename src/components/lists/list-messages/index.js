import React from 'react'
import MessageItem from './message-item'
import HeaderPanelGroupChat from '../../other/header-panel-group-chat'
import cx from 'classnames'
import ChatForm from '../../../components/other/chat'

import style from './list-message.scss'

const ListMessages = ({
                        messages, selectGroup, refWrapScroll, headerStyle, ulStyle, onSubmitHandler,
                        showChat
                      }) => (
  <div className={cx(style['ul-screen'], style['wrap-scroll'])} ref={refWrapScroll}>
    <HeaderPanelGroupChat group={selectGroup}
                          headerStyle={headerStyle}/>
    <ul className={style['ul-messages']} style={ulStyle}>
      {messages.map((el, i) => (
        <MessageItem key={i}
                     title={el.sender}
                     text={el.message}
                     date={el.date}
                     srcImg50={el.photo_50}/>
      ))}
      {showChat ?
        <ChatForm onSubmit={onSubmitHandler}/> : ''}
    </ul>
  </div>
);

export default ListMessages