import React from 'react'
import NavBar from '../../../components/nav-bar'
import NavLink from '../../../components/nav-link'

const TitleNavBar = () => <span className='navbar-brand'>vkChat</span>;

const Main = ({children, onChangeActiveLink, activeLinkIndex}) => (
  <div>
    <NavBar title={<TitleNavBar />}>
      <NavLink to='/home'>Меню</NavLink>
      <NavLink to='/groups'>Группы</NavLink>
      <NavLink to='/friends'>Друзья</NavLink>
    </NavBar>
    {children}
  </div>
);

export default Main