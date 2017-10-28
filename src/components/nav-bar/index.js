import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './nav-bar.scss';

const navbarStyle = cx('navbar navbar-inverse navbar-toggleable-md ' +
  'navbar-light bg-faded', style.navbar);

const NavBar = ({ title, children }) => (
  <div>
    <nav className={navbarStyle}>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-TOGGLE_LOADING="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="TOGGLE_LOADING navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {title || ''}
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-md-0">
          {children}
        </ul>
      </div>
    </nav>
  </div>
);

NavBar.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  title: PropTypes.string,
};

NavBar.defaultProps = {
  title: '',
};

export default NavBar;
