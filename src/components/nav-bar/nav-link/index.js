import React from 'react'
import {Link} from 'react-router'
import cx from 'classnames'

import style from './nav-link.scss'

const navItemStyles = cx('nav-item', 'nav-link',style['nav-item']);
const navItemActiveStyle = cx('nav-item active', style['nav-item-active']);

const NavLink = ({to, children, onClick, noActive}) => (
  <li>
    <Link className={navItemStyles}
          activeClassName={noActive ? '' : navItemActiveStyle}
          to={to}>
      {children}
    </Link>
  </li>
);

export default NavLink