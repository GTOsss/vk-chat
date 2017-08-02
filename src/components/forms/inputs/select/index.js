import React from 'react'
const ReactSelect = require('react-select');

import './react-select.css';

class Select extends React.Component {
  componentDidMount() {
    if(this.props.isFocus)
      this.refs.select.focus();
  }

  render() {
    const {input: {onChange}, value, options, className, placeholder, isLoading, noResultsText, loadOptions,
      onFocus, searchPromptText, loadingPlaceholder} = this.props;
    return (
      loadOptions
        ? <ReactSelect.Async className={className}
                             searchPromptText={searchPromptText}
                             loadingPlaceholder={loadingPlaceholder}
                             value={value}
                             autoload={false}
                             loadOptions={loadOptions}
                             noResultsText={noResultsText}
                             onChange={(e) => onChange(e || null)}
                             placeholder={<span>{placeholder}</span>}/>
        : <ReactSelect className={className}
                       autoLoad={true}
                       openOnFocus={true}
                       ref='select'
                       value={value}
                       isLoading={isLoading}
                       noResultsText={noResultsText}
                       options={options}
                       onChange={(e) => onChange((e && e.value) ? e.value : null)}
                       onFocus={() => onFocus && onFocus()}
                       placeholder={<span>{placeholder}</span>}/>

    )
  }
}

export default Select
