import React from 'react';
import PropTypes from 'prop-types';
import MarkCircle from 'react-icons/lib/fa/circle-o';
import MarkCircleActive from 'react-icons/lib/fa/check-circle-o';
import DeleteIcon from 'react-icons/lib/fa/times-circle-o';
import HeaderListPanel from '../../other/header-list-panel/index';
import HeaderListGroups from '../../other/header-list-groups/index';
import SearchParams from '../../other/search-params/index';

import style from './list-search-objects.scss';

const ItemSearchObject = ({ searchParams, groups, countResults, active, onClick, deleteOnClick,
  headerClickHandler }) =>
  (
    <div className={style['ul-groups-item']}>
      <HeaderListPanel
        headerText={`Результатов поиска: ${countResults}`}
        className={style['header-title']}
        headerClickHandler={headerClickHandler}
      />
      <HeaderListGroups groups={groups} />
      <SearchParams searchParams={searchParams} />
      { active
        ? <MarkCircleActive size="24" color="#314963" className={style['mark-circle']} onClick={() => onClick()} />
        : <MarkCircle size="24" color="#314963" className={style['mark-circle']} onClick={() => onClick()} /> }
      <DeleteIcon size="24" className={style['delete-icon']} onClick={() => deleteOnClick()} />
    </div>
  );

ItemSearchObject.propTypes = {
  searchParams: PropTypes.objectOf(PropTypes.any),
  groups: PropTypes.arrayOf(PropTypes.object),
  countResults: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  active: PropTypes.bool,
  onClick: PropTypes.func,
  deleteOnClick: PropTypes.func,
  headerClickHandler: PropTypes.func,
};

ItemSearchObject.defaultProps = {
  searchParams: {},
  groups: [],
  countResults: '...',
  active: false,
  onClick: null,
  deleteOnClick: null,
  headerClickHandler: null,
};

export default ItemSearchObject;
