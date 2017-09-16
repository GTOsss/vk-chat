import React from 'react'
import ListGroups from '../../../components/lists/list-groups/index'
import ListMessages from '../../../components/lists/list-messages'
import Loader from '../../../components/loader'

import cx from 'classnames'
import style from './chat.scss'

const messages = [
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi architecto at, consequuntur culpa deleniti distinctio doloremque doloribus ea eos exercitationem illum incidunt labore molestias mollitia neque nesciunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'erspiciatis quibusdam, quidem quis quisquam sit totam, voluptates.',
    photo_50: 'https://pp.userapi.com/c836729/v836729561/15160/nhtiK9bdKcY.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: 'piciatis quibusdam, quidem quis quisquam sipiciatis quibusdam, quidem quis quisquam si',
    photo_50: 'https://pp.userapi.com/c837233/v837233689/3c60f/SBpJx01HHn0.jpg'
  },
  {
    sender: 'Вася Петрович',
    date: '16.09.2017 18:24',
    message: ' untur culpa deleniti distinctio doloremque doloribus ea eos exercitats molliiunt non numquam pariatur perferendis perspiciatis quibusdam, quidem quis uptates.',
    photo_50: 'https://pp.userapi.com/c836729/v836729561/15160/nhtiK9bdKcY.jpg'
  }
];

const Chat = ({groups, loading, sliceLoading, onScrollHandler, setRefList, onClickItemListHandler}) => (
  <div className={style['wrap-scroll']} onScroll={onScrollHandler}>
    <div className='container-fluid'>
      {loading
        ? (
          <div className='row'>
            <Loader/>
          </div>
        )
        : (
          <div className='row' ref={setRefList}>
            <div className={cx('col-md-6', style['col-fix'])}>
              <ListGroups groups={groups}
                          noHeaderListGroups
                          headerText={'Ваши группы'}
                          onClickItemListHandler={onClickItemListHandler}/>
              {sliceLoading ? <Loader mini/> : ''}
            </div>
            <div className={cx('col-md-6', style['col-fix'])}>
              <ListMessages messages={messages} groups={groups}/>
            </div>
          </div>
        )}
    </div>
  </div>
);

export default Chat