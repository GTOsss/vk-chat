import React from 'react'
import ChatForm from '../../forms/chat'

const Chat = ({onSubmit}) => (
  <div>
    <ChatForm onSubmit={onSubmit}/>
  </div>
);

export default Chat