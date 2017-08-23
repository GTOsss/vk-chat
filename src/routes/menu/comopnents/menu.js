import React from 'react'
import ListSearchObjects from '../../../components/list-search-objects'
import SearchUsersForm from '../../../components/forms/search-users'
import Loader from '../../../components/loader'
import cx from 'classnames'

import style from './menu.scss'

const Menu = ({searchObjects, loading, onSubmitHandle, iconClickHandler, deleteClickHandler}) => (
  <div className={style['wrap-scroll']}>
    <div className='container-fluid'>
      {loading
        ? <Loader/>
        : (
          <div className='row'>
            <div className={cx('col-md-6 offset-1', style['col-fix'])}>
              <ListSearchObjects searchObjects={searchObjects}
                                 iconClickHandler={iconClickHandler}
                                 deleteClickHandler={deleteClickHandler}/>

            </div>
            <div className={cx('col-md-3', style['col-fix'])}>
              {searchObjects && searchObjects.length
                ? <SearchUsersForm onSubmit={onSubmitHandle} isHideAdditional/>
                : ''}
            </div>
          </div>
        )}
    </div>
  </div>
);

export default Menu