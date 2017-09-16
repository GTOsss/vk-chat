import React from 'react'
import ListGroups from '../../../components/lists/list-groups/index'
import Loader from '../../../components/loader'

import cx from 'classnames'
import style from './chat.scss'

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
            <div className={cx('col-md-6 offset-1', style['col-fix'])}>
              <ListGroups groups={groups}
                          onClickItemListHandler={onClickItemListHandler}/>
              {sliceLoading ? <Loader mini/> : ''}
            </div>
          </div>
        )}
    </div>
  </div>
);

export default Chat