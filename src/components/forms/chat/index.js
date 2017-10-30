import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SendIcon from 'react-icons/lib/md/send';
import PropTypes from 'prop-types';
import TextArea from '../inputs/text-area';

import style from './chat.scss';

const Chat = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className={style.wrap}>
      <Field
        name="message"
        component={props => (<TextArea
          {...props}
          placeholder="Напишите сообщение..."
          cssWrap={{ width: '80%' }}
        />)}
      />
      <div className={style['send-icon']} onClick={handleSubmit}>
        <SendIcon size={28} color={'#A6ABB6'} />
      </div>
    </div>
  </form>
);

Chat.propTypes = {
  handleSubmit: PropTypes.func,
};

Chat.defaultProps = {
  handleSubmit: null,
};

export default reduxForm({ form: 'chat' })(Chat);
