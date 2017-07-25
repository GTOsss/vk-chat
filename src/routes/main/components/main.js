import React from 'react'
import cx from 'classnames'
import style from './navbar.scss'

const navbarStyle = cx("navbar navbar-inverse navbar-toggleable-md " +
                        "navbar-light bg-faded", style.navbar);
const navItem = cx("nav-item", style["nav-item"])
const navItemActiveStyle = cx("nav-item active", style["nav-item-active"]);

const Main = ({children}) => (
  <div>
    <nav className={navbarStyle}>
      <button className="navbar-toggler navbar-toggler-right"
              type="button" data-toggle="collapse"
              data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <span className="navbar-brand">vkChat</span>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-md-0">
          <li className={navItemActiveStyle}>
            <a className="nav-link" href="#">Меню <span className="sr-only">(current)</span></a>
          </li>
          <li className={navItem}>
            <a className="nav-link" href="#">Группы</a>
          </li>
          <li className={navItem}>
            <a className="nav-link" href="#">Друзья</a>
          </li>
        </ul>
      </div>
    </nav>

    {children}
  </div>
);

export default Main