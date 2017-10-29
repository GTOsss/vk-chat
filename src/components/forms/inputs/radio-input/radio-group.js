import React from 'react';
import PropTypes from 'prop-types';

const InputRadio = ({ input: { onChange }, children, name, currentValue, className }) => (
  <div className={className}>
    {children.map((el, i) => React.cloneElement(el, {
      ...el.props,
      key: i, // eslint-disable-line
      name,
      id: Math.random().toString(36).substr(2, 8),
      onClick: () => onChange(el.props.value),
      active: currentValue === el.props.value,
    }),
    )}
  </div>
);

InputRadio.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  input: PropTypes.objectOf(PropTypes.any),
  name: PropTypes.string,
  currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

InputRadio.defaultProps = {
  input: {},
  name: '',
  currentValue: '',
  className: '',
};

export default InputRadio;
