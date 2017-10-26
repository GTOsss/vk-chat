import React from 'react';
import ResizeIcon from 'react-icons/lib/md/aspect-ratio';
import ConnectInfoIcon from '../../../components/icons/connect-info';

import style from './chat.scss';

const ResizePanel = ({
  onClickResize, onClickFilter, inverseIcon, isConnect, showOtherIcon, css, isMinimized,
}) => (
  <div
    className={style['minimize-group-list-header']}
    // style={{ marginLeft: isMinimized ? '-8px' : '-16px' }}
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

const TitlePanel = ({ title }) => (
  <div className={style['minimize-group-list-header-chat']} style={{ color: 'white' }}>
    {title}
  </div>
);

export { ResizePanel, TitlePanel };