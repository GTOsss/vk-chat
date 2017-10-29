import React from 'react';
import cx from 'classnames';
import RadioIcon from 'react-icons/lib/fa/circle-thin';
import RadioActiveIcon from 'react-icons/lib/md/adjust';
import PropTypes from 'prop-types';
import style from './radio-input.scss';

const InputRadio = ({ name, children, className, id, onClick, active, labelFor }) => (
  <div className={cx(style['wrap-radio'], className)} onClick={() => onClick()}>
    {active ? <RadioActiveIcon size="16" color="#6786AB" /> : <RadioIcon size="16" color="#6786AB" />}
    <label htmlFor={labelFor} className={style.label}>{children}</label>
  </div>
);

InputRadio.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  name: PropTypes.string,
  className: PropTypes.string,
  labelFor: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

InputRadio.defaultProps = {
  name: '',
  className: '',
  id: '',
  onClick: null,
  active: false,
  labelFor: '',
};

export default InputRadio;
