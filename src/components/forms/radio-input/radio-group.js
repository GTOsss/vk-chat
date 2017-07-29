import React from 'react'

class InputRadio extends React.Component {
  onChangeHandler(value, onChangeFormRedux){
    onChangeFormRedux(value);
  }

  render() {
    const {props: {input: {onChange}, children, name, currentValue, className},
      onChangeHandler} = this;
    return (
      <div className={className}>
        {children.map((el, i) => {
            return React.cloneElement(el, {
              ...el.props,
              key: i,
              name: name,
              id: Math.random().toString(36).substr(2, 8),
              onClick: (e) => onChangeHandler(e, onChange),
              active: currentValue === el.props.value
            })}
          )}
      </div>
    )
  }
}

export default InputRadio