import React from 'react';
import ResizeIcon from 'react-icons/lib/md/aspect-ratio';
import PropTypes from 'prop-types';
import ConnectInfoIcon from '../../../components/icons/connect-info';

import style from './chat.scss';

const ResizePanel = ({ onClickResize, onClickFilter, inverseIcon, isConnect, showOtherIcon,
  css, isMinimized,
}) => (
  <div
    className={style['minimize-group-list-header']}
  >
    <div className={style['inner-wrap']} style={css}>
      <div>
        <ConnectInfoIcon
          size={22} onClick={onClickFilter}
          inverse={inverseIcon} online={isConnect} showOtherIcon={showOtherIcon}
        />
      </div>
      <ResizeIcon size={24} color={'#FFF'} style={{ cursor: 'pointer' }} onClick={onClickResize} />
    </div>
  </div>
);

ResizePanel.propTypes = {
  onClickResize: PropTypes.func,
  onClickFilter: PropTypes.func,
  inverseIcon: PropTypes.bool,
  isConnect: PropTypes.bool,
  showOtherIcon: PropTypes.bool,
  isMinimized: PropTypes.bool,
  css: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

ResizePanel.defaultProps = {
  onClickResize: null,
  onClickFilter: null,
  inverseIcon: false,
  isConnect: false,
  showOtherIcon: false,
  isMinimized: false,
  css: {},
};

const TitlePanel = ({ title }) => (
  <div className={style['minimize-group-list-header-chat']} style={{ color: 'white' }}>
    {title}
  </div>
);

TitlePanel.propTypes = {
  title: PropTypes.any, // eslint-disable-line
};

export { ResizePanel, TitlePanel };
