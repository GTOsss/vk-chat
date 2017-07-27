import React from 'react'
import ListGroups from '../../../components/list-groups'

import style from './groups.scss'

const Groups = ({groups, onClickItemListHandler}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      <div className='row'>
        <div className={'col-md-7'}>
          <div className={style['ul-screen']}>
            <ListGroups groups={groups} onClickItemListHandler={onClickItemListHandler}/>
          </div>
        </div>
        <div className={'col-md-5'}>
          <div className={style['search-screen']}>
            search params
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Groups
