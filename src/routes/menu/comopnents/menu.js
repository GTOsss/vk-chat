import React from 'react'
import ListSearchObjects from '../../../components/list-search-objects'
import SearchUsers from '../../../components/forms/search-users'
import cx from 'classnames'

import style from './menu.scss'

const Menu = ({searchObjects, onSubmitHandle, iconClickHandler}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      <div className='row'>
        <div className={cx('col-md-6 offset-1', style['col-fix'])}>
          <ListSearchObjects searchObjects={searchObjects} iconClickHandler={iconClickHandler}/>
        </div>
        <div className={cx('col-md-3', style['col-fix'])}>
          {searchObjects && searchObjects.length
            ? <SearchUsers handleSubmit={onSubmitHandle} isHideAdditional/>
            : ''}
        </div>
      </div>
    </div>
  </div>
);

export default Menu