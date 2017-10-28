import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './header-panel-group-chat.scss';

const HeaderPanelGroupChat = ({ group, className, headerStyle }) => (
  <div
    className={cx(style['header-panel'], className)}
    style={headerStyle}
  >
    <h6 className={style['group-name']}>{group.name}</h6>
    <img src={group.photo_50} alt={'загрузка...'} className={style.img} />
  </div>
);

HeaderPanelGroupChat.propTypes = {
  group: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  headerStyle: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

HeaderPanelGroupChat.defaultProps = {
  group: {},
  className: '',
  headerStyle: {},
};

export default HeaderPanelGroupChat;
