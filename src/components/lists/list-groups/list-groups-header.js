import React from 'react';
import PropTypes from 'prop-types';
import HeaderListGroups from '../../other/header-list-groups/index';

import style from './list-groups.scss';

const isMarked = (groups) => {
  for (let i = 0; i < groups.length; i += 1) {
    if (groups[i].isMarked) return true;
  }
  return false;
};

const ListGroupsHeader = ({ onClick, groups }) => (
  <div>
    {isMarked(groups) ?
      <HeaderListGroups
        groups={groups}
        className={style['header-list-groups']}
        onClick={onClick}
      /> :
      <div className={style['header-list-groups-text']}>Выберите группы из списка</div>}
  </div>
);

ListGroupsHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListGroupsHeader;
