import React from 'react'
import ListGroups from '../../../components/list-groups/index'
import SearchUsersForm from '../../../components/forms/search-users/index'

import style from './search.scss'

const Groups = ({groups, onClickItemListHandler, onSubmitHandle, onClickItemHeaderListHandler}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      <div className='row'>
        <div className={'col-md-6 offset-1'}>
          <div className={style['ul-screen']}>
            <ListGroups groups={groups}
                        onClickItemListHandler={onClickItemListHandler}
                        onClickItemHeaderListHandler={onClickItemHeaderListHandler}/>
          </div>
        </div>
        <div className={'col-md-5'}>
          <div className={style['search-screen']}>
            <SearchUsersForm onSubmit={onSubmitHandle}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Groups