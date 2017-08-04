import React from 'react'
import UserItem from './user-item'

import style from './list-users.scss'

const addSpaceNumber = (number) => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

const createListUsers = (users) => users.map((el, i) => (
  <a href={`https://www.vk.com/id${el.id}`} key={i} target='_blank' className={style['user-item']}>
    <UserItem name={`${el.first_name} ${el.last_name}`}
            followersCount={`${addSpaceNumber(el.followers_count || 0)} подписчиков`}
            srcImg100={el.photo_100} />
  </a>
));

const createListGroups = (groups) => groups.map((el, i) => {
  if(el.isMarked) {
    return (
      <div key={i} className={style['group-item']}>
        <img src={el.photo_50} className={style['group-photo']}/>
      </div>
    )
  }
});

const ListUsers = ({users, headerText, groups}) => (
  <ul className={style['ul-users']}>
    {headerText ?
      <div className={style['group-items']}>
        <div className={style['ul-header-left-right']}/>
        <div className={style['ul-header']}>{headerText}</div>
        <div className={style['ul-header-left-right']}/>
      </div> : ''}
    <div className={style['group-items-for-groups']}>
      {createListGroups(groups)}
    </div>
    {users ? createListUsers(users) : ''}
  </ul>
);

export default ListUsers