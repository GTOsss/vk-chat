import React from 'react';
import PropTypes from 'prop-types';

import ListUsersComponent from '../../lists/list-users/index';

const ListUsers = ({ isSearchSO, users, groups, searchParams,
  usersCount, noSearch, progressFilter }) =>
  (
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

ListUsers.propTypes = {
  isSearchSO: PropTypes.bool,
  noSearch: PropTypes.bool,
  progressFilter: PropTypes.number,
  usersCount: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  searchParams: PropTypes.objectOf(PropTypes.any),
};

ListUsers.defaultProps = {
  isSearchSO: false,
  noSearch: false,
  progressFilter: 0,
  usersCount: 0,
  users: [],
  groups: [],
  searchParams: {},
};

export default ListUsers;
