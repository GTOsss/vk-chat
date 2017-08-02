import React from 'react'
import UserItem from './user-item'

import style from './list-users.scss'

const createList = (users) => users.map((el, i) => (
  <UserItem key={i} />
));

const ListUsers = ({users}) => (
  <ul className={style['ul-users']}>
    {users ? createList(users) : ''}
  </ul>
);

export default ListUsers