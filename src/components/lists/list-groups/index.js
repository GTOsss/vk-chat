import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import GroupItem from './group-item';
import HeaderListPanel from '../../other/header-list-panel/index';
import GroupsFilter from '../../forms/groups-filter/index';
import ListGroupsHeader from './list-groups-header';

import style from './list-groups.scss';

const formattingStringForNumber = number =>
  `${number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}`;

const ListGroups = ({
  groups, onClickItemListHandler, onClickItemHeaderListHandler, noHeaderListGroups,
  headerText, noMargin, minimize, headerPanel, ulStyle, headerStyle,
  typeList, filter, className, noHeader, isAnimate,
}) => (
  <div
    className={cx(
      minimize ? style['ul-screen-minimize'] : style['ul-screen'],
      className,
      isAnimate ? style['is-animate'] : '',
    )}
    style={{
      margin: noMargin ? '0 0' : '',
      transition: 'padding 150ms 300ms',
    }}
  >
    {headerPanel || ''}

    <ul
      className={cx(
        style['ul-groups'],
        minimize ? style['ul-groups-animate-to-minimize'] : style['ul-groups-animate-from-minimize'],
      )}
      style={{
        ...ulStyle,
        ...minimize ? { marginTop: '36px' } : {},
        transition: minimize ? 'margin-top 150ms 750ms' : 'margin-top 0s 0s',
      }}
    >
      {noHeader ?
        '' :
        <HeaderListPanel
          headerText={headerText}
          css={{ ...headerStyle, ...noHeaderListGroups ? { marginBottom: '10px' } : {} }}
        />
      }

      {noHeaderListGroups ?
        '' :
        <ListGroupsHeader
          onClick={onClickItemHeaderListHandler}
          groups={groups}
        />}

      {minimize ? '' : <GroupsFilter />}

      {minimize && typeList === 'connects' ?
        <div style={{ marginTop: '48px', borderBottom: '1px #a5a5a5 solid' }} /> : ''}

      {groups.map((el) => {
        const connect = (typeList === 'chat') && el.isConnect;
        const other = ['default', 'default-select', 'connects'].indexOf(typeList) !== -1;
        const filterOK = ((filter === 'disconnect') && !el.isConnect)
          || ((filter === 'connect') && el.isConnect)
          || (filter === 'all');
        if ((connect || other) && filterOK) {
          return (<GroupItem
            key={el.id}
            title={el.name}
            text={`${formattingStringForNumber(el.members_count)} участников`}
            srcImg50={el.photo_50}
            onClick={onClickItemListHandler}
            id={el.id}
            isMarked={el.isMarked && typeList === 'default'}
            minimize={minimize}
            showConnect={typeList === 'connects'}
            showMarked={typeList === 'default'}
            online={el.isConnect && typeList === 'connects'}
            isSelect={
              el.isSelect && ['default', 'default-select', 'chat'].indexOf(typeList) !== -1
            }
            isOnline={el.isOnline}
            isChat={typeList === 'chat'}
          />);
        }
        return null;
      })}
    </ul>
  </div>
);

ListGroups.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  ulStyle: PropTypes.objectOf(PropTypes.any),
  onClickItemListHandler: PropTypes.func,
  onClickItemHeaderListHandler: PropTypes.func,
  headerText: PropTypes.string,
  headerStyle: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  noMargin: PropTypes.bool,
  minimize: PropTypes.bool,
  headerPanel: PropTypes.element,
  noHeaderListGroups: PropTypes.bool,
  noHeader: PropTypes.bool,
  typeList: PropTypes.oneOf(['', 'default', 'default-select', 'connects', 'chat']),
  filter: PropTypes.oneOf(['', 'all', 'connect', 'disconnect']),
  isAnimate: PropTypes.bool,
};

ListGroups.defaultProps = {
  headerText: 'Выбранные группы',
  typeList: 'default',
  filter: 'all',
  ulStyle: {},
  headerStyle: {},
  onClickItemListHandler: null,
  onClickItemHeaderListHandler: null,
  className: '',
  noMargin: false,
  minimize: false,
  headerPanel: null,
  noHeaderListGroups: false,
  noHeader: false,
  isAnimate: false,
};


export default ListGroups;
