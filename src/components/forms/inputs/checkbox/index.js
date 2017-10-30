import React from 'react';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-icons/lib/md/check-box';

import style from './checkbox.scss';

const checkboxStyle = (size, color) => ({
  borderRadius: '2px',
  height: `${size}px`,
  width: `${size}px`,
  margin: '2px',
  boxSizing: 'border-box',
  border: `1px ${color} solid`,
});

const Checkbox = ({ input: { onChange }, color, size, active, children, labelFor }) => (
  <div className={style.checkbox} onClick={() => onChange(!active)}>
    { active
      ? <CheckboxIcon color={color} size={parseInt(size, 10)} />
      : <div style={checkboxStyle(parseInt(size, 10) - 4, color)} /> }
    <label className={style.label} htmlFor={labelFor}>{children}</label>
  </div>
);

Checkbox.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  input: PropTypes.objectOf(PropTypes.any),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  labelFor: PropTypes.string,
  active: PropTypes.bool,
};

Checkbox.defaultProps = {
  input: {},
  color: 'black',
  labelFor: '',
  size: '',
  active: false,
};

export default Checkbox;
