import React from 'react'
import ListUsersComponent from '../../../../components/list-users'

import style from './search-results.scss'

const listUsers = ({users, groups, searchParams}) => (
  <div>
    { (users && users.length) ? <ListUsersComponent users={users}
                                                    groups={groups}
                                                    searchParams={searchParams}
                                                    headerText={`Найдено ${users.length}`}/> : '' }
  </div>
);

export default listUsers