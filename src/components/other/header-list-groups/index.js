import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './header-list-groups.scss';

const HeaderListGroups = ({ groups, onClick, className }) => (
  <div className={cx(style['header-list'], className)}>
    {groups.map((el) => {
      if (el.isMarked) {
        return (
          <div key={el.id} className={style['group-item']}>
            <img
              src={el.photo_50}
              alt={'загрузка...'}
              onClick={onClick ? () => onClick(el.id) : ''}
              className={style['group-photo']}
            />
          </div>
        );
      }
      return null;
    })}
  </div>
);

HeaderListGroups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

HeaderListGroups.defaultProps = {
  groups: [],
  onClick: null,
  className: '',
};

export default HeaderListGroups;
