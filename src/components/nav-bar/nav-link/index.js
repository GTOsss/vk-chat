import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './nav-link.scss';

const navItemStyles = cx('nav-item', 'nav-link', style['nav-item']);
const navItemActiveStyle = cx('nav-item active', style['nav-item-active']);

const NavLink = ({ to, children, onClick, noActive }) => (
  <li>
    <Link
      className={navItemStyles}
      activeClassName={noActive ? '' : navItemActiveStyle}
      to={to}
    >
      {children}
    </Link>
  </li>
);

NavLink.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  noActive: PropTypes.bool,
};

NavLink.defaultProps = {
  onClick: null,
  noActive: false,
};

export default NavLink;
