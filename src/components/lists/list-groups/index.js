import React from 'react'
import GroupItem from './group-item'
import HeaderListGroups from '../../other/header-list-groups/index'
import HeaderListPanel from '../../other/header-list-panel/index'
import GroupsFilter from '../../forms/groups-filter/index'
import PropTypes from 'prop-types'

import style from './list-groups.scss'

const isMarked = (groups) => {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].isMarked) return true;
  }
};

const formattingStringForNumber = (number) => (
  `${number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}`
);

const ListGroups = ({
                      groups, onClickItemListHandler, onClickItemHeaderListHandler, noHeaderListGroups,
                      headerText = 'Выбранные группы', noMargin, minimize, headerPanel,
                      typeList = 'default', onClickItemConnectIconHandler
                    }) => (
  <div className={minimize ? style['ul-screen-minimize'] : style['ul-screen']}
       style={noMargin ? {margin: '0 0'} : {}}>

    {headerPanel && minimize ? headerPanel : ''}

    <ul className={style['ul-groups']} style={minimize ? {marginTop: '28px'} : {}}>
      {minimize ? '' :
        <HeaderListPanel headerText={headerText} css={noHeaderListGroups ? {marginBottom: '10px'} : ''}/>
      }

      {noHeaderListGroups ? '' :
        isMarked(groups)
          ? <HeaderListGroups groups={groups} className={[style['header-list-groups']]}
                              onClick={onClickItemHeaderListHandler}/>
          : <div className={style['header-list-groups-text']}>Выберите группы из списка</div>
      }

      {minimize ? '' : <GroupsFilter/>}

      {groups.map((el, i) => {
        let connect = (typeList === 'chat') && el.isConnect;
        let other = ['default', 'default-select', 'connects'].indexOf(typeList) !== -1;
        if (connect || other)
          return <GroupItem key={i}
                            title={el.name}
                            text={formattingStringForNumber(el.members_count) + ' участников'}
                            srcImg50={el.photo_50}
                            onClick={onClickItemListHandler ? () => onClickItemListHandler(el.id) : ''}
                            isMarked={el.isMarked && typeList === 'default'}
                            minimize={minimize}
                            showConnect={typeList === 'connects'}
                            onClickItemConnectIconHandler={() => onClickItemConnectIconHandler(el.id)}
                            online={el.isConnect && typeList === 'connects'}
                            isSelect={el.isSelect && ['default-select', 'connects', 'chat'].indexOf(typeList) !== 0}
                            isOnline={el.isOnline}/>
      })}
    </ul>
  </div>
);

export default ListGroups

ListGroups.propTypes = {
  groups: PropTypes.array,
  onClickItemListHandler: PropTypes.func,
  onClickItemHeaderListHandler: PropTypes.func,
  onClickItemConnectIconHandler: PropTypes.func,
  headerText: PropTypes.string,
  noMargin: PropTypes.bool,
  minimize: PropTypes.bool,
  headerPanel: PropTypes.element,
  noHeaderListGroups: PropTypes.bool,
  typeList: PropTypes.oneOf(['', 'default', 'default-select', 'connects', 'chat'])
};