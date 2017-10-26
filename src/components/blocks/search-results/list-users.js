import React from 'react';
import ListUsersComponent from '../../lists/list-users/index';

const listUsers = ({ isSearchSO, users, groups, searchParams, usersCount, noSearch, progressFilter }) => (
  <div>
    <ListUsersComponent
      users={users}
      groups={groups}
      searchParams={searchParams}
      headerText={`Найдено ${usersCount}`}
      noSearch={noSearch}
      isSearchSO={isSearchSO}
      progressFilter={progressFilter}
    />
  </div>
);

export default listUsers;
