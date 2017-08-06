import React from 'react'
import UserItem from './user-item'
import HeaderListGroups from '../other/header-list-groups'
import HeaderListPanel from '../other/header-list-panel'

import style from './list-users.scss'

const addSpaceNumber = (number) => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

const createListUsers = (users) => users.map((el, i) => (
  <a href={`https://www.vk.com/id${el.id}`} key={i} target='_blank' className={style['user-item']}>
    <UserItem name={`${el.first_name} ${el.last_name}`}
            followersCount={`${addSpaceNumber(el.followers_count || 0)} подписчиков`}
            srcImg100={el.photo_100} />
  </a>
));

const ListUsers = ({users, headerText, groups}) => (
  <ul className={style['ul-users']}>
    {headerText ? <HeaderListPanel headerText={headerText}/> : ''}
    <HeaderListGroups groups={groups}/>
    {users ? createListUsers(users) : ''}
  </ul>
);

export default ListUsers