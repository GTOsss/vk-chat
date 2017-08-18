import React from 'react'
import ListGroups from '../../../components/list-groups/index'
import SearchUsersForm from '../../../components/forms/search-users/index'
import cx from 'classnames'

import style from './search.scss'

const Groups = ({groups, onClickItemListHandler, onSubmitHandle, onClickItemHeaderListHandler}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      <div className='row'>
        <div className={cx('col-md-6 offset-1', style['col-fix'])}>
          <ListGroups groups={groups}
                      onClickItemListHandler={onClickItemListHandler}
                      onClickItemHeaderListHandler={onClickItemHeaderListHandler}/>
        </div>
        <div className={cx('col-md-4', style['col-fix'])}>
          <SearchUsersForm onSubmit={onSubmitHandle}/>
        </div>
      </div>
    </div>
  </div>
);

export default Groups