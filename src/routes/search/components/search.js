import React from 'react'
import ListGroups from '../../../components/lists/list-groups/index'
import SearchUsersForm from '../../../components/forms/search-users/index'
import Loader from '../../../components/loader'

import cx from 'classnames'

import style from './search.scss'

const Groups = ({groups, onClickItemListHandler, onSubmitHandle, onClickItemHeaderListHandler, loading,
                  onScrollHandler, setRefList, sliceLoading}) => (
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
                          onClickItemListHandler={onClickItemListHandler}
                          onClickItemHeaderListHandler={onClickItemHeaderListHandler}/>
              {sliceLoading ? <Loader mini/> : ''}
            </div>
            <div className={cx('col-md-4', style['col-fix'])}>
              <SearchUsersForm onSubmit={onSubmitHandle}/>
            </div>
          </div>
        )}
    </div>
  </div>
);

export default Groups