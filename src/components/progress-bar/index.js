import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './progress-bar.scss'

const styleLine = {
  height: '20px',
  transition: '500ms',
};

const ProgressBar = ({className, progress, lineColor, children}) => (
  <div>
    {children ? <div className={style['text-label']}>{children}</div> : ''}
    <div className={cx(className, style['progress-bar-box'])}>
      <div style={{backgroundColor: lineColor, width: `${progress}%`, ...styleLine}} />
    </div>
  </div>
);

ProgressBar.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number,
  lineColor: PropTypes.string
};

export default ProgressBar