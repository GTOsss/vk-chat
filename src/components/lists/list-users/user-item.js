import React from 'react';
import PropTypes from 'prop-types';

import style from './list-users.scss';

const GroupItem = ({ name, followersCount, srcImg100 }) => (
  <li className={style['user-item-wrap']}>
    <div>
      <img src={srcImg100} alt="загрузка..." className={style['user-photo']} />
    </div>
    <div>
      <div className={style['user-title']}>{name}</div>
      <div className={style['user-text']}>{followersCount}</div>
    </div>
  </li>
);

GroupItem.propTypes = {
  name: PropTypes.string,
  followersCount: PropTypes.string,
  srcImg100: PropTypes.string.isRequired,
};

GroupItem.defaultProps = {
  name: '',
  followersCount: '0',
};

export default GroupItem;
