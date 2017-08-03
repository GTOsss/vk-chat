import React from 'react'
import ListUsersComponent from '../../../../components/list-users'
import cx from 'classnames'

import style from './search-results.scss'

const listUsers = ({users}) => (
  <div className={style['ul-screen']}>
    { (users && users.length) ? <ListUsersComponent users={users}
                                                    headerText={`Найдено ${users.length}`}/> : '' }
  </div>
);

export default listUsers