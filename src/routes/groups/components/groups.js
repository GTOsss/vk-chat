import React from 'react'
import ListGroups from '../../../components/list-groups'
import SearchUsersForm from '../../../components/forms/search-users'

import style from './groups.scss'

const Groups = ({groups, onClickItemListHandler, OnSubmitHandle}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      <div className='row'>
        <div className={'col-md-6 offset-1'}>
          <div className={style['ul-screen']}>
            <ListGroups groups={groups} onClickItemListHandler={onClickItemListHandler}/>
          </div>
        </div>
        <div className={'col-md-5'}>
          <div className={style['search-screen']}>
            <SearchUsersForm onSubmit={OnSubmitHandle}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Groups