import React from 'react'
import NavBar from '../../../components/nav-bar'
import NavLink from '../../../components/nav-bar/nav-link'
import Breadcrumb from '../../../components/breadcrumb'
import IconCertificate from '../../../components/icons/ceritficate'

import style from '../../../style/main.scss'

const TitleNavBar = () => <span className='navbar-brand'>vkChat</span>;

const Main = ({children, onChangeActiveLink, activeLinkIndex, location: {pathname}, profile}) => (
  <div className={style['app']}>
    <NavBar>
      <NavLink to='/menu'>меню</NavLink>
      <NavLink to='/search'>поиск</NavLink>
      <NavLink to='/chat'>чат</NavLink>
      {profile && profile.dateTo ? <IconCertificate profile={profile}/> : ''}
    </NavBar>
    <div className={style['app-body']}>
      {children}
    </div>
    <NavBar>
      <Breadcrumb pathname={pathname}/>
    </NavBar>
  </div>
);

export default Main