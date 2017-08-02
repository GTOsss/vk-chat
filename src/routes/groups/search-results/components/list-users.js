import React from 'react'
import ListUsersComponent from '../../../../components/list-users'
import cx from 'classnames'

import style from './search-results.scss'

const listUsers = ({users}) => (
  <div className={style['ul-screen']}>
    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '4px'}}>
      <div className={style['ul-header-left-right']}/>
      <div className={style['ul-header']}>{`Найдено ${users.length}`}</div>
      <div className={style['ul-header-left-right']}/>
    </div>
    { (users && users.length) ? <ListUsersComponent users={users}/> : '' }
  </div>
);

export default listUsers