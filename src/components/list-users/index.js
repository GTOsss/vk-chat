import React from 'react'
import UserItem from './user-item'

import style from './list-users.scss'

const addSpaceNumber = (number) => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

const createList = (users) => users.map((el, i) => (
  <a href={`https://www.vk.com/id${el.id}`} key={i} target='_blank'>
    <UserItem className={style['user-item']}
            name={`${el.first_name} ${el.last_name}`}
            followersCount={`${addSpaceNumber(el.followers_count)} подписчиков`}
            srcImg100={el.photo_100} />
  </a>
));

const ListUsers = ({users, headerText}) => (
  <ul className={style['ul-users']}>
    {headerText ?
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '4px'}}>
        <div className={style['ul-header-left-right']}/>
        <div className={style['ul-header']}>{headerText}</div>
        <div className={style['ul-header-left-right']}/>
      </div> : ''}
    {users ? createList(users) : ''}
  </ul>
);

export default ListUsers