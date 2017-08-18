import React from 'react'
import NavBar from '../../../components/nav-bar'
import NavLink from '../../../components/nav-bar/nav-link'

import style from '../../../style/main.scss'

const TitleNavBar = () => <span className='navbar-brand'>vkChat</span>;
const TitleNavBarFooter = () => <span className='navbar-brand'>Info</span>;

const Main = ({children, onChangeActiveLink, activeLinkIndex}) => (
  <div className={style['app']}>
    <NavBar title={<TitleNavBar/>}>
      <NavLink to='/menu'>Меню</NavLink>
      <NavLink to='/search'>Поиск</NavLink>
      <NavLink to='/friends'>Друзья</NavLink>
    </NavBar>
    <div className={style['app-body']}>
      {children}
    </div>
    <NavBar title={<TitleNavBarFooter/>}>
      <NavLink to='#' noActive>Группа в вк</NavLink>
      <NavLink to='#' noActive>Автор</NavLink>
    </NavBar>
  </div>
);

export default Main