import React from 'react'
const ReactSelect = require('react-select');

import './react-select.css';

class Select extends React.Component {
  onChangeHandler(e, onChangeFormRedux){
    let value = (e && e.value) ? e.value : null;
    onChangeFormRedux(value);
  }

  render() {
    const {props: {input: {onChange}, options, className, placeholder, value}, onChangeHandler} = this;
    return (
      <ReactSelect className={className}
                   options={options}
                   value={value}
                   onChange={(e) => onChangeHandler(e, onChange)}
                   placeholder={<span>{placeholder}</span>}/>
    )
  }
}

export default Select
