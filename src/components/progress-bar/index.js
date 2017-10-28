import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './progress-bar.scss';

const styleLine = {
  height: '20px',
  transition: '500ms',
};

const ProgressBar = ({ className, progress, lineColor, children }) => (
  <div>
    {children ?
      <div className={style['text-label']}>
        {children}
      </div> : ''}
    <div className={cx(className, style['progress-bar-box'])}>
      <div style={{ backgroundColor: lineColor, width: `${progress}%`, ...styleLine }} />
    </div>
  </div>
);

ProgressBar.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  className: PropTypes.string,
  progress: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineColor: PropTypes.string,
};

ProgressBar.defaultProps = {
  className: '',
  progress: 0,
  lineColor: '#5e81a8',
};

export default ProgressBar;
