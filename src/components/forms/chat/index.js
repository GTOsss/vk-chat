import React from 'react'
import {Field, reduxForm} from 'redux-form'
import TextArea from '../inputs/text-area'
import SendIcon from 'react-icons/lib/md/send'

import style from './chat.scss'

const Chat = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <div className={style['wrap']}>
      <Field name='message'
             component={(props) => <TextArea {...props}
                                             placeholder='Напишите сообщение...'
                                             cssWrap={{width: '80%'}}/>}/>
      <div className={style['send-icon']} onClick={handleSubmit}>
        <SendIcon size={28} color={'#A6ABB6'}/>
      </div>
    </div>
  </form>
);

export default reduxForm({form: 'chat'})(Chat)