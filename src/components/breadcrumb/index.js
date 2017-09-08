import React from 'react'
import {Link} from 'react-router';

import style from './breadcrumb.scss'

const routeNames = {
  'menu': 'меню',
  'search': 'поиск',
  'search-results': 'результаты-поиска'
};

const Breadcrumb = ({pathname}) => (
  <ul className={style['breadcrumb']}>
    {pathname.split('/').map((el, i) => (
      el && el !== '/' ?
        <li key={i}>
          <Link className={style['breadcrumb-item']}
                to={pathname.split('/').slice(0, i + 1).join('/')}>
            {routeNames[el]}
          </Link>
        </li> : ''
    ))}
  </ul>
);

export default Breadcrumb