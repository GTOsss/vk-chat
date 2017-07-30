import React from 'react'

const InputRadio = ({input: {onChange}, children, name, currentValue, className}) => (
  <div className={className}>
    {children.map((el, i) => {
        return React.cloneElement(el, {
          ...el.props,
          key: i,
          name: name,
          id: Math.random().toString(36).substr(2, 8),
          onClick: () => onChange(el.props.value),
          active: currentValue === el.props.value
        })}
      )}
  </div>
);

export default InputRadio