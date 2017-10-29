import React from 'react';
import CircleIcon from 'react-icons/lib/fa/circle-o';
import CirclePaintedIcon from 'react-icons/lib/fa/circle';
import PropTypes from 'prop-types';

import style from './connect-info.scss';

const ConnectInfo = ({
  circleColor, circlePaintedColor, online, onClick, inverse,
  leftIndent, showOtherIcon,
}) =>
  (
    <div
      className={style.table} onClick={onClick}
      style={{ left: leftIndent ? `${leftIndent}px` : 0, marginTop: inverse ? '1px' : '-8px' }}
    >
      <div className={style.middle}>
        <div className={style.inner}>
          {showOtherIcon ?
            <div>
              <CirclePaintedIcon
                size={10}
                color={inverse ? '#fff' : circlePaintedColor}
                className={style['circle-painted-icon']}
              />
              <div style={{ color: '#fff' }} className={style.label}>
              фильтр
              </div>
            </div>
            :
            <div>
              <CircleIcon
                size={22}
                color={inverse ? '#fff' : circleColor}
                className={style['circle-icon']}
              />
              {online ?
                <CirclePaintedIcon
                  size={10}
                  color={inverse ? '#fff' : circlePaintedColor}
                  className={style['circle-painted-icon']}
                /> : ''
              }
              <div
                style={online ?
                  { color: inverse ? '#fff' : '#3eb114' } :
                  { color: inverse ? '#fff' : '#656565' }}
                className={style.label}
              >
                {online ? 'online' : 'offline'}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );

ConnectInfo.propTypes = {
  onClick: PropTypes.func,
  circleColor: PropTypes.string,
  circlePaintedColor: PropTypes.string,
  inverse: PropTypes.bool,
  showOtherIcon: PropTypes.bool,
  leftIndent: PropTypes.number,
  online: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

ConnectInfo.defaultProps = {
  onClick: null,
  circleColor: '#314963',
  circlePaintedColor: '#3eb114',
  inverse: false,
  showOtherIcon: false,
  online: false,
  leftIndent: 0,
};

export default ConnectInfo;
