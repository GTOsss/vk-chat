import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './header-list-panel.scss';

const HeaderListPanel = ({ headerText, className, headerClickHandler, css }) => (
  <div className={style['group-items']} style={css}>
    <div className={style['ul-header-left-right']} />
    <div
      className={cx(style['ul-header'], className)}
      onClick={headerClickHandler || ''}
    >
      {headerText}
    </div>
    <div className={style['ul-header-left-right']} />
  </div>
);

HeaderListPanel.propTypes = {
  headerText: PropTypes.any, // eslint-disable-line
  className: PropTypes.string,
  headerClickHandler: PropTypes.func,
  css: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

HeaderListPanel.defaultProps = {
  headerText: '',
  className: '',
  headerClickHandler: null,
  css: {},
};

export default HeaderListPanel;
