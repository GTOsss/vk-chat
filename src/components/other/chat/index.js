import React from 'react';
import PropTypes from 'prop-types';

import ChatForm from '../../forms/chat';

const Chat = ({ onSubmit }) => (
  <div>
    <ChatForm onSubmit={onSubmit} />
  </div>
);

Chat.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Chat;
