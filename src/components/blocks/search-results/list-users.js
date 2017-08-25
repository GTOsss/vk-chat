import React from 'react'
import ListUsersComponent from '../../lists/list-users/index'

const listUsers = ({users, groups, searchParams, usersCount}) => (
  <div>
    { (users && users.length) ? <ListUsersComponent users={users}
                                                    groups={groups}
                                                    searchParams={searchParams}
                                                    headerText={`Найдено ${usersCount}`}/> : '' }
  </div>
);

export default listUsers