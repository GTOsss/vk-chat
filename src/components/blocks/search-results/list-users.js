import React from 'react'
import ListUsersComponent from '../../lists/list-users/index'

const listUsers = ({isSearchSO, users, groups, searchParams, usersCount, noSearch}) => (
  <div>
    { (users && users.length) ? <ListUsersComponent users={users}
                                                    groups={groups}
                                                    searchParams={searchParams}
                                                    headerText={`Найдено ${usersCount}`}
                                                    noSearch={noSearch}
                                                    isSearchSO={isSearchSO}/> : '' }
  </div>
);

export default listUsers