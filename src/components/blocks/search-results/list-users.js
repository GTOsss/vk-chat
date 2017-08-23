import React from 'react'
import ListUsersComponent from '../../lists/list-users/index'

const listUsers = ({users, groups, searchParams}) => (
  <div>
    { (users && users.length) ? <ListUsersComponent users={users}
                                                    groups={groups}
                                                    searchParams={searchParams}
                                                    headerText={`Найдено ${users.length}`}/> : '' }
  </div>
);

export default listUsers