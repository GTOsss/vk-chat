import React from 'react'
import ListUsersComponent from '../../../../components/list-users'
import cx from 'classnames'

import style from './search-results.scss'

const listUsers = ({users, groups}) => (
  <div className={style['ul-screen']}>
    { (users && users.length) ? <ListUsersComponent users={users}
                                                    groups={groups}
                                                    headerText={`Найдено ${users.length}`}/> : '' }
  </div>
);

export default listUsers