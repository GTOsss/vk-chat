import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './button.scss';

const Button = ({ children, type, onClick, className, disabled }) => (
  <button
    className={cx(className, disabled ? style['button-dis'] : style.button)}
    type={!disabled ? type : 'button'}
    onClick={e => !disabled && onClick && onClick(e)}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: '',
  className: '',
  onClick: null,
  disabled: false,
};

export default Button;
