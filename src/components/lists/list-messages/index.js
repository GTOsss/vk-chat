import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import MessageItem from './message-item';
import HeaderPanelGroupChat from '../../other/header-panel-group-chat';
import ChatForm from '../../../components/other/chat';

import style from './list-message.scss';

const ListMessages = ({
  messages, selectGroup, refWrapScroll, headerStyle, ulStyle, onSubmitHandler,
  switchAnimate, isAnimate,
}) => (
  <div
    className={cx(
      style['ul-screen'],
      style['wrap-scroll'],
      isAnimate ? style['is-animate'] : '',
    )}
    ref={refWrapScroll}
  >
    <HeaderPanelGroupChat
      group={selectGroup}
      headerStyle={headerStyle}
    />
    <ul
      className={cx(
        style['ul-messages'],
        switchAnimate ? style['chat-animate-to-minimize'] : style['chat-animate-from-minimize'],
      )}
      style={ulStyle}
    >
      {messages.map((el, i) => (
        <MessageItem
          key={i} // TODO set id
          title={el.sender}
          text={el.message}
          date={el.date}
          srcImg50={el.photo_50}
        />
      ))}
      <div className={style['wrap-chat-input']}>
        <div className={switchAnimate ? style['t-to-up'] : style['t-to-down']}>
          <ChatForm onSubmit={onSubmitHandler} />
        </div>
      </div>
    </ul>
  </div>
);

ListMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  selectGroup: PropTypes.objectOf(PropTypes.any),
  refWrapScroll: PropTypes.func,
  headerStyle: PropTypes.objectOf(PropTypes.any),
  ulStyle: PropTypes.objectOf(PropTypes.any),
  onSubmitHandler: PropTypes.func,
  switchAnimate: PropTypes.bool,
  isAnimate: PropTypes.bool,
};

ListMessages.defaultProps = {
  messages: [],
  selectGroup: {},
  refWrapScroll: null,
  onSubmitHandler: null,
  headerStyle: {},
  ulStyle: {},
  switchAnimate: false,
  isAnimate: false,
};

export default ListMessages;
