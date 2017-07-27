import React from 'react'
import ListGroups from '../../../components/list-groups'
import cx from 'classnames'

import style from './groups.scss'

const Groups = ({groups, onClickItemListHandler}) => (
  <div className='container-fluid'>
    <div className='row'>
      <div className={cx('col-md-7', style['ul-screen'])}>
        <ListGroups groups={groups} onClickItemListHandler={onClickItemListHandler} />
      </div>
    </div>
  </div>
);

export default Groups

